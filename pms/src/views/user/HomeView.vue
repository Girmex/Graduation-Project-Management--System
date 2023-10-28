<template>
  <div class="bg-gray-50">
    <Header></Header>

    <view></view>

    <div v-if="this.search" class="container mx-auto py-6">
      <div class="-mx-4">
        <div class="overflow-x-auto mb-4">
          <div class="py-2 align-middle inline-block min-w-full">
            <div class="shadow-md border border-gray-200 rounded-lg overflow-hidden">
              <table class="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      class="text-center px-5 py-3 bg-gray-100 border-b-2 border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Title
                    </th>
                    <th
                      class="px-5 py-3 bg-gray-100 border-b-2 border-gray-200 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Advisor
                    </th>
                    <th
                      class="px-5 py-3 bg-gray-100 border-b-2 border-gray-200 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Published Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="project in displayedProjects" :key="project.id"
                    class="bg-white text-blue-600 hover:bg-gray-50">
                    <td class=" px-5 py-5 border-b border-gray-200 text-sm">
                      <div class="flex items-center ">
                        <div class="ml-3">
                          <div class="font-semibold text-blue-600"><router-link
                              :to="{ name: 'Detail', params: { id: project.id } }">{{ project.title }}</router-link></div>
                        </div>
                      </div>
                    </td>
                    <td class="px-5 py-5 border-b border-gray-200 text-sm">
                      <router-link :to="{ name: 'Detail', params: { id: project.id } }">{{ project.first_name }} {{
                        project.second_name }} {{ project.last_name }}</router-link>

                    </td>
                    <td class="px-5 py-5 border-b border-gray-200 text-sm">
                      <div class="">{{ formatDate(project.date) }}</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-center mt-4">
        <button @click="previousPage" :disabled="currentPage === 1"
          class="px-4 py-2 mr-2 bg-blue-600 text-gray-700 rounded">Previous</button>
        <span class="ml-2"> {{ currentPage }} / {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages"
          class="px-4 py-2 bg-blue-600 text-gray-700 rounded">Next</button>
      </div>
    </div>

    <div  class="flex flex-col lg:flex-row ">
      <div class=" lg:w-1/2 p-4 h-screen ">
        <h2 class="text-xl text-blue-600 font-bold mb-4">Faculties</h2>

        <div class="grid grid-cols-1 lg:grid-cols-1 gap-4">
          <div class="bg-white p-6 shadow rounded-md">
            <div>
              <ul>
                <li v-for="faculty in faculties" :key="faculty.faculty_id">
                  <h3 class="text-black font-sans font-bold text-lg">{{ faculty.faculty_name }}</h3>
                  <ul>
                    <li v-for="department in faculty.departments" :key="department.department_id">
                      <router-link class="text-blue-600 font-serif  text-sm hover:bg-gray-300"
                        :to="`/userDepartmentproject/${department.department_id}`">
                        {{ department.department_name }}
                      </router-link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class=" lg:w-1/2 p-4 h-screen">
        <h2 class="text-xl text-blue-600 font-bold mb-4">Best Projects</h2>
        <div class="grid grid-cols-1 lg:grid-cols-1 gap-4" v-for="item in bests " :key="item.id">
      
          <!-- Example best project card -->
          <div class="bg-white p-6 shadow rounded-md">
            <h3 class="text-lg font-bold mb-2">{{item.title}}</h3>
            <p class="text-gray-600">{{item.description}}</p>
          </div>
       
        </div>
      </div>

    </div>
    <div class="flex items-center justify-center ml-30">

      <div class="mx-30 w-full  p-4  bg-white">
        <h2 class="text-xl text-blue-600 font-bold mb-4">Recent Projects</h2>
        <div class="grid grid-cols-1 lg:grid-cols-1 gap-4">
          <!-- Example faculty card -->
          <div class=" hover:text-blue-600 shadow rounded-md" v-for="item in items" :key="item.id">
            <router-link class="text-gray-900 flex justify-between mx-20 hover:text-blue-700"
              :to="{ name: 'Detail', params: { id: item.id } }">
              <h1>{{ item.title }}</h1>
              <h1>{{ formatDate(item.date) }}</h1>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '../../components/Header.vue'
import axios from 'axios';
export default {
  name: 'HomeView',
  components: {
    Header,
  },
  data() {
    return {
      faculties: [],
      bests:[],
      projects: [],
      query: '',
      search: false,
      currentPage: 1,
      pageSize: 4,
      totalProjects: 0,
      years: [],
      selectedYear: '',
      selectedDeprtment: null,
      departments: []


    }
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleString('en-US', options)
    },
    async searchProjects() {
      if (this.query != '') {
        this.search = true;
      }
      await axios.get(`http://localhost:5000/allProjects/${this.query}`)
        .then(response => {
          this.projects = response.data;
          console.log(this.projects)
          this.updateTotalProjects();
          this.currentPage = 1;
          this.updateDisplayedProjects();
        })
        .catch(error => {
          console.error(error);
        });
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.updateDisplayedProjects();
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.updateDisplayedProjects();
      }
    },
    updateTotalProjects() {
      this.totalProjects = this.projects.length;
    },
    updateDisplayedProjects() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      this.displayedProjects = this.projects.slice(start, end);
    },

    //////////////////
    fetchFaculties() {
      axios.get('http://localhost:5000/acadamic')
        .then(response => {
          this.faculties = response.data;
        })
        .catch(error => {
          console.error(error);
          this.loading = false;
        });
    },

    async getApiData() {

      await axios.post(`http://localhost:5000/allProjects`, {
        title: this.query,
        department: this.selectedDeprtment,
        year: this.selectedYear
      })
        .then(response => {
          this.projects = response.data;
          this.updateTotalProjects();
          this.currentPage = 1;
          this.updateDisplayedProjects();
          this.search = true
        })
        .catch(error => {
          console.error(error);
          this.loading = false;
        });

    },
  },
  async mounted() {
    this.fetchFaculties();

    await axios
      .get('http://localhost:5000/bestProjects')
      .then(response => {
        this.bests = response.data;
      })
      .catch(error => {
        console.error(error);
      });

    await axios
      .get('http://localhost:5000/departments')
      .then(response => {
        this.departments = response.data;
      })
      .catch(error => {
        console.error(error);
      });

  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalProjects / this.pageSize);
    },
    years() {
      const currentYear = new Date().getFullYear();
      const startYear = 2010;
      const range = [];

      for (let year = startYear; year <= currentYear; year++) {
        range.push(year);
      }

      return range;
    },



  }

}
</script>

