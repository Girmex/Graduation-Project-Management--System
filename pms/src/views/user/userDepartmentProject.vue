
<template>
  <Header />
<div class="font-xxl font-bold font-serif text-blue-600"  v-for="item in deparment" :key="item.id"><p>{{item.department_name }}</p></div>
  <div class="flex mr-0 justify-between max-w-2xl mx-auto my-0 px-3 sm:px-0">
    <div class="flex-1 bg-white pt-3 space-y-4">
      <div class="flex flex-col space-y-3" >
        <div  class="flex ">
          <input @keyup.enter="searchProjects" placeholder="Search title, author or date here ..." id="title" v-model="query" type="text"
            class="w-5/6 py-3 pl-3 border border-cyan-800  rounded-lg">
            <button @click="searchProjects"
          class=" text-white  bg-blue-600 flex items-center ">
          <svg aria-hidden="true" class="w-10  h-10  text-white dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </button>
        </div>
    </div>
  </div>
</div>
  <div v-if="this.projects.length>0" class="container mx-auto py-6">
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
  <div v-else> No data Found</div>       
</template>
<script>
import Header from '@/components/Header.vue';
import axios from 'axios';

export default {
  name: 'userDepartmentProject',
  components: {
    Header
  },

  data() {
    return {
      projects: [],
      deparment:[],
      currentPage: 1,
      pageSize: 10,
      query:'',
      totalProjects: 0


    }
  },
  methods: {
  formatDate(date){
const options={year:'numeric',month:'long',day:'numeric'};
return new Date(date).toLocaleString('en-US',options)
  },
   async searchProjects(){
    let results =  await axios.get(`http://localhost:5000/search_title/${this.$route.params.id}/${this.query}`)
      if(results){
        this.projects = results.data;
          this.updateTotalProjects();
          this.currentPage = 1;
          this.updateDisplayedProjects();
      }
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
    }
    
  },
  async mounted() {
    await axios.get(`http://localhost:5000/aaa/${this.$route.params.id}`)
      .then(response => {
          this.deparment = response.data;
      
      })

    await axios.get(`http://localhost:5000/project_titles/${this.$route.params.id}`)
      .then(response => {
          this.projects = response.data;
          this.updateTotalProjects();
          this.updateDisplayedProjects();
      })

  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalProjects / this.pageSize);
    }
  }

}
</script>
<style></style>