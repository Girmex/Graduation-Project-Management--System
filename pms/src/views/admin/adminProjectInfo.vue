<template>
 
  <div v-for="detail in details" :key="detail.id" class="w-full p-8 bg-gray-100">
      <h3 class="text-4xl font-bold mb-4">{{detail.title}}
      </h3>
      <table class="w-full text-left m-4">
        <thead>
          <tr>
            <th>Project Title:</th>
            <th>Issue Date</th>
            <th>Project Advisor</th>
            <th>Students</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ detail.title }}</td>
            <td>{{ formatDate(detail.date) }}</td>
            <td>{{detail.first_name}} {{ detail.second_name }} {{ detail.last_name }}</td>
            <td><span class="mr-5" v-for="student in project" :key="student.id">"{{student.first_name}} {{ student.second_name }} {{ student.last_name }}" </span></td>
          </tr>
        </tbody>
      </table>
   
      <div class="flex items-center mb-4" v-if="detail.description">
        <span class="text-gray-500  mr-2 font-semibold">Abstract:</span>
        
      </div>
      <div v-if="detail.description" class="mb-3 bg-blue-100 rounded-md font-light text-left text-gray-500 dark:text-gray-400">
          <span class="mr-2 px-2 py-1 rounded-lg">{{detail.description}}</span>
  
        </div>
        <table class="w-full text-left m-4">
          <thead>
            <tr>
              <th>Project Status</th>
              <th v-if="detail.proposal_url !== ''">Proposal Url</th>
              <th v-if="detail.url">Project Url</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ detail.status }}</td>
              <td v-if="detail.proposal_url !== ''"><a :href="detail.proposal_url" >{{detail.title}}</a></td>
              <td v-if="detail.url"><a :href="detail.url">{{detail.title}}</a></td>
            </tr>
          </tbody>
        </table>
        
  
      
    <div class="mb-4">
     
  
    </div>
  </div>
  </template>
  <script>
  
  import axios from 'axios';
  
  export default {
    name: 'adminProjectInfo',
    components: {
     
    },
  
    data() {
      return {
        activeTab: 'ElectricalEng',
        details: [],
        project:[]
  
  
      }
    },
    methods: {
      formatDate(date){
  const options={year:'numeric',month:'long',day:'numeric'};
  return new Date(date).toLocaleString('en-US',options)
    },
    },
    async mounted() {     
      let token=localStorage.getItem('token')    
      if(!token){
       this.$router.push({name:'Login'})
    }   
      await axios.get(`http://localhost:5000/project_detail/${this.$route.params.id}`)
        .then(response => {
          this.details = response.data;
         
        })
        await axios.get(`http://localhost:5000/listLength/students/group_id/${this.$route.params.id}/''/''`)
        .then(response => {
          this.project = response.data[0];
        })
    }
  }
  </script>