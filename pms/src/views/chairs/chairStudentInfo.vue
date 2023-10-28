
<template>
    
    <div class="font-serif bg-orange-900 lg:flex p-3 my-20 mx-10 rounded-md text-white items-center justify-center w-full ">
      <div class="bg-white rounded-md mx-6 "><img src="../../components/icons/profile.png" class=" h-60 " /></div>
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
        <li>E-mail: {{ profile.e_mail }}</li>
        <li>Phone Number: {{ profile.phone_number }}</li>
        <li>Roll: {{ profile.role_name }}</li>
          </ul>
       </div>
    </div>
     
  </template>
  
  <script >
      import axios from "axios";
      
      
       export default{
           name:'chairStudentInfo',
           components:{
           },
      
           data() {
               return {
                profile:[],
                isEnable:true,
                numberOfStaffMember:'',
                numberOfStudents:'',
                numberOfProjects:'',
                divStyle:'m-5 font-serif  border-solid border-2 border-blue-700 rounded-md w-1/3 h-full ',
               }
           },
        
          mounted() {
            let token=localStorage.getItem('token')
      if(!token){
       this.$router.push({name:'Login'})
    }
            axios.get(`http://localhost:5000/studentInfo/id/${this.$route.params.id}`).then((response) => {
             this.profile = response.data
              console.log(this.profile)
              })
      
          
          },
          methods:{
            
       
       
            
         
        }
      
      
      }
       
        
       
       
       
      
       
       </script>