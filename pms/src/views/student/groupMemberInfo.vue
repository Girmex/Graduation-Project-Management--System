<template>
    <div class="font-serif flex flex-col mt-20 items-center w-full">
      <img src="../../components/icons/profile.png" class="rounded-full w-20 h-20" />
      <div class="text-left">
        <ul v-for="profile in profile" :key="profile.id">
          <li>
            Full Name:{{ profile.first_name }} {{ profile.second_name }} {{ profile.last_name }}
          </li>
          <li>Id: {{ profile.id }}</li>
          <li>Faculty: {{ profile.faculty_name }}</li>
          <li>Department: {{ profile.department_name }}</li>
          <li>Stream: {{ profile.name }}</li>
          <li>Sex: {{ profile.gender }}</li>
          <li>Project Title: {{ profile.title }}</li>
          <li>Advisor:<span v-for="advisor in name" :key="advisor.id">{{ advisor.first_name }} {{ advisor.second_name }} {{ advisor.last_name }}</span></li>
          
          
          
          
        </ul>
      </div>
    </div>
    
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    name: 'groupMemberInfo',
    components: {},
  
    data() {
      return {
        profile: [],
        name:[],
        divStyle: 'm-5 font-serif  border-solid border-2 border-blue-700 rounded-md w-1/3 h-full '
      }
    },
  
    mounted() {
      axios.get(`http://localhost:5000/studentInfo/id/${this.$route.params.info}`).then((response) => {
        this.profile = response.data
        console.log(this.profile)
      })
      axios.get(`http://localhost:5000/staffInfo/${this.$route.params.advisor}`).then((response) => {
        this.name = response.data
        console.log(this.name)
      })
    }
 
  }
  </script>
  