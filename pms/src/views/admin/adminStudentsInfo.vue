
<template>
    
    <div class="flex flex-col mt-20 items-center">
       <img src="../../components/icons/profile.png" class="rounded-full w-20 h-20">
       <div class="text-left">
          <ul>
            <li v-for="item in staffMember" :key="item.id"><span>Full Name: </span><span>{{ item.first_name }} {{ item.second_name }} {{ item.last_name }}</span><br>
                                                           <span>Id: <span>{{ item.id }}</span></span></li>
            <li v-for="department in department" :key="department.department_id"><span>Department:</span> <span>{{ department.department_name }}</span></li>
            <li v-for="chair in chairs" :key="chair.id"><span>Stream:</span> <span>{{ chair.name }}</span></li>
            <li v-for="role in roll" :key="roll.id"><span>Position:</span> <span class="mr-7" v-if="isEnable">{{ role.role_name }}</span><button class="text-blue-500 hover:text-blue-800" v-if="role.id=='3'" @click="isEnable=!isEnable">edit</button></li>
          </ul>
       </div>
    </div>
     
  </template>
  
  <script >
      import axios from "axios";
      
      
       export default{
           name:'studentsInfo',
           components:{
           },
      
           data() {
               return {
                staffMember:[],
                chairs:[],
                department:[],
                roll:[],
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
         axios.get(`http://localhost:5000/listLength/students/id/${this.$route.params.id}/''/''`)
          .then(response => {
            this.staffMember = response.data[0];
         console.log(this.stream)
       })
       axios.get(`http://localhost:5000/listLength/departments/department_id/${this.$route.params.department_id}/''/''`)
          .then(response => {
            this.department = response.data[0];
         console.log(this.stream)
       })
              axios.get(`http://localhost:5000/listLength/chairs/id/${this.$route.params.chair_id}/''/''`)
          .then(response => {
            this.chairs = response.data[0];
         console.log(this.stream)
       })
       axios.get(`http://localhost:5000/listLength/role/id/${this.$route.params.roll}/''/''`)
          .then(response => {
            this.roll = response.data[0];
         console.log(this.stream)
       })
       axios.get(`http://localhost:5000/listLength/role/id/${this.$route.params.roll}/''/''`)
          .then(response => {
            this.roll = response.data[0];
         console.log(this.stream)
       })
      
      
          
          },
          methods:{
            
       
       
            
         
        }
      
      
      }
       
        
       
       
       
      
       
       </script>