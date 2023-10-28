<template>
 
    <div v-for="detail in details" :key="detail.id" class="p-8 w-full bg-gray-100">
        <h3 class="text-4xl font-bold mb-4">{{detail.title}}
        </h3>
        <div class="flex items-center mb-4">
          <span class="text-gray-500 mr-2 font-semibold">Project Title:</span>
          <div class="flex flex-wrap">
            <span class="mr-2 bg-blue-100 text-blue-500 px-2 py-1 rounded-lg">{{ detail.title }}</span>
    
          </div>
        </div>
        <div class="flex items-center mb-4">
          <span class="text-gray-500 mr-2 font-semibold">Issue Date:</span>
          <div class="flex flex-wrap">
            <span class="mr-2 bg-blue-100 text-blue-500 px-2 py-1 rounded-lg">{{ formatDate(detail.date) }}</span>
    
          </div>
        </div>
        <div class="flex items-center mb-4">
          <span class="text-gray-500 mr-2 font-semibold">Project Advisor:</span>
          <div class="flex flex-wrap">
            <span class="mr-2 bg-blue-100 text-blue-500 px-2 py-1 rounded-lg">{{detail.first_name}} {{ detail.second_name }} {{ detail.last_name }}</span>
    
          </div>
        </div>
        <div class="flex items-center mb-4">
          <span class="text-gray-500 mr-2 font-semibold">Students:</span>
          <div class="flex flex-wrap">
            <span class="mr-2 bg-blue-100 text-blue-500 px-2 py-1 rounded-lg">
              <span v-for="student in project" :key="student.id">"{{student.first_name}} {{ student.second_name }} {{ student.last_name }}", </span>
            </span>
    
          </div>
        </div>
        <div class="flex items-center mb-4">
          <span class="text-gray-500 mr-2 font-semibold">Project Status:</span>
          <div class="flex flex-wrap">
            <span class="mr-2 bg-blue-100 text-blue-500 px-2 py-1 rounded-lg">{{ detail.status }}</span>
    
          </div>
        </div>
     
        <div class="flex items-center mb-4">
          <span class="text-gray-500 mr-2 font-semibold">Abstract:</span>
          
        </div>
        <div class="mb-3 font-light text-left text-gray-500 dark:text-gray-400">
            <span class="mr-2 px-2 py-1 rounded-lg">{{detail.description}}</span>
    
          </div>
        
          <div class="flex items-center mb-4">
          <span class="text-gray-500 mr-2 font-semibold">Proposal URL:</span>
          <div class="flex flex-wrap">
            <a :href="detail.proposal_url" class="mr-2 bg-blue-100 text-blue-500 px-2 py-1 rounded-lg">{{detail.title}}</a>
    
          </div>
        </div>
        <div class="flex items-center mb-4">
          <span class="text-gray-500 mr-2 font-semibold">URL:</span>
          <div class="flex flex-wrap">
            <a :href="detail.url" class="mr-2 bg-blue-100 text-blue-500 px-2 py-1 rounded-lg">{{detail.title}}</a>
    
          </div>
        </div>
        
      <div class="mb-4">
       
    
      </div>
    </div>
    </template>
    <script>
    
    import axios from 'axios';
    
    export default {
      name: 'advisorProjectDetail',
      components: {
       
      },
    
      data() {
        return {
          activeTab: 'ElectricalEng',
          details: [],
          project:[]
    
    
        }
      },
     mounted() {
      let token=localStorage.getItem('token')
      if(!token){
       this.$router.push({name:'Login'})
      }
     },
      methods: {
        formatDate(date){
    const options={year:'numeric',month:'long',day:'numeric'};
    return new Date(date).toLocaleString('en-US',options)
      },
      },
      async mounted() {        
        await axios.get(`http://localhost:5000/project_detail/${this.$route.params.group}`)
          .then(response => {
            this.details = response.data;
          })
          await axios.get(`http://localhost:5000/listLength/students/group_id/${this.$route.params.group}/''/''`)
          .then(response => {
            this.project = response.data[0];
          })
      }
    }
    </script>