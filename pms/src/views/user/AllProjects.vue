<template>  
  <div class="bg-gray-50">
  <Header></Header>
  <div class="mr-0 p-4 w-full flex justify-end items-end shadow rounded-md">

  <div class="flex">
    <label for="year-select" class="block font-medium text-gray-700">Select Department:</label>
    <select id="year-select" v-model="selectedDeprtment" @change="go" >
      <option value="">Choose</option>
      <option v-for="item in departments" :value="item.department_id">{{ item.department_name }}</option>
    </select>
    <!-- <label for="year-select" class="block font-medium text-gray-700">Select Year:</label>
    <select id="year-select" v-model="selectedYear" @change="goYears" >
      <option value="">Choose</option>
      <option v-for="item in years" :value="item.year">{{ item.year }}</option>
    </select> -->
    <h2 class="text-lg font-bold "></h2>
   
    <input @keyup.enter="getApiData" v-model="query" type="text" class="w-5/6 px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Search by  title, author, year.....">
    <button @click="getApiData" class="px-6 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
</svg>
</button>
  </div>



  
</div>


<div  v-if="this.projects.length>0" class="container mx-auto py-6">
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
              <tbody >
                <tr v-for="project in displayedProjects" :key="project.id" class="bg-white text-blue-600 hover:bg-gray-50">
                  <td class=" px-5 py-5 border-b border-gray-200 text-sm">
                    <div class="flex items-center ">
                      <div class="ml-3">
                        <div class="font-semibold text-blue-600"><router-link :to="{ name: 'Detail', params: { id: project.id } }" >{{ project.title }}</router-link></div>
                      </div>
                    </div>
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 text-sm">
                    <router-link :to="{ name: 'Detail', params: { id: project.id } }" >{{ project.advisor }}</router-link>
                   
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 text-sm">
                    <div class="">{{ project.date }}</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-center mt-4">
      <button @click="previousPage" :disabled="currentPage === 1" class="px-4 py-2 mr-2 bg-blue-600 text-gray-700 rounded">Previous</button>
      <span class="ml-2"> {{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="px-4 py-2 bg-blue-600 text-gray-700 rounded">Next</button>
 </div>
  </div>
  <div class="text-blue-600" v-else>No Data Found</div>
</div>
</template>

<script>
import Header from '../../components/Header.vue'
import axios from 'axios';
export default {
  name: 'AllProjects',
  components: {
 Header
  },
  data() {
      return {
        faculties: [],
        items:[],
        projects:[],
        query:'',
        search:false,
        currentPage: 1,
        pageSize: 10,
        totalProjects: 0,
        years: [],
        selectedYear: '',
        selectedDeprtment:'',
        departments:[]

        
      }
    },
    methods: {
      go(){
        this.$router.push(`/userDepartmentproject/${this.selectedDeprtment}`)
      },
      goYears(){
        this.$router.push(`/ProjectsByYear/${this.selectedYear}`)
      },
      formatDate(date){
const options={year:'numeric',month:'long',day:'numeric'};
return new Date(date).toLocaleString('en-US',options)
  },
     async searchProjects() {
       if(this.query!=''){
        this.search=true;
       }
    await   axios.get(`http://localhost:5000/allProjects/${this.query}`)
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
   async getApiData(){
    await  axios.post(`http://localhost:5000/allProjects`,{
      query:this.query,
    
    })
        .then(response => {
          this.projects = response.data;
          this.updateTotalProjects();
          this.currentPage = 1;
          this.updateDisplayedProjects();  
          this.search=true
              })
        .catch(error => {
          console.error(error);
          this.loading = false;
        });

    },
    },
    async mounted() {
     this.getApiData()
     await  axios
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

