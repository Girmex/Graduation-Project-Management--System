<template>
  <Header />
  
    <div >
        <nav >
          <ul  v-for="department in departments" :key="department.department_id"
            class="">
            <li class=" bg-slate-300 py-2 border border-blue-600 border-spacing-10"><router-link class="text-gray-900   hover:text-indigo-400" :to="{ name: 'userDepartmentProject', params: { id: department.department_id } }">{{ department.department_name }}</router-link></li>
          </ul>
        </nav>
      </div>
  </template>
  <script>
  
  import Header from '@/components/Header.vue';
  import axios from 'axios';
  export default{
      name:'userDepartmentList',
      components:{
       Header
      },
      
      data() {
          return {
        departments:[],
      }},
      methods:{
        title(){
          this.showYear=false;
          this.showTitle=true
        },
        year(){
          this.showYear=true;
          this.showTitle=false      }
      },
      
    async mounted() {
      //  
  
      await axios.get(`http://localhost:5000/departments/${this.$route.params.id}`)
        .then(response => {
          this.departments = response.data;
        })
  
    }
  }
  </script>
  <style>
  
  </style>