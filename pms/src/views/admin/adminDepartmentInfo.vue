
<template>
    
    <div :class="divStyle" class="m-4" >
          <div class="border-b-2  border-blue-900 bg-blue-500 text-white">Department Info</div>
          <ul class="text-left pl-5 pt-2">
            <li v-for="item in this.academic " :key="item.department_id"  class="pl-3"> 
              <li>Faculty of:  {{ item.faculty_name }}</li>
              <li>Department of:  {{ item.department_name }}</li>
              <li>Department Head: {{ item.first_name }} {{ item.second_name }} {{ item.last_name }}</li>
            </li> 
            <li   class="pl-3"> 
                Chairs:<span v-for="chair in this.chairs " :key="chair.id"> "{{ chair.name }}" </span>
              
            </li> 
            <li class="ml-3">Staff Member:{{ this.numberOfStaffMember }}</li>
            <li class="ml-3">Students:{{ this.numberOfStudents }}</li>
            <li class="ml-3">Projects:{{ this.numberOfProjects }}</li>
            

                                   
              
                                  
          </ul>
      </div>
     
  </template>
  
  <script >
      import axios from "axios";
      
      
       export default{
           name:'adminDepartmentInfo',
           components:{
           },
      
           data() {
               return {
                academic:[],
                chairs:[],
                numberOfStaffMember:'',
                numberOfStudents:'',
                numberOfProjects:'',
                divStyle:' font-serif  border-solid border-2 border-blue-700 rounded-md w-1/3 h-full ',
               }
           },
        
          mounted() {
            let token=localStorage.getItem('token')    
      if(!token){
       this.$router.push({name:'Login'})       
    }
    let faculty=localStorage.getItem('faculty_id')
    axios.get(`http://localhost:5000/adminDepartmentListInfo/${this.$route.params.id}`)
        .then(response => {
          
           this.academic = response.data;
       
       console.log(this.stream)
     })
        
       axios.get(`http://localhost:5000/listLength/chairs/department_id/${this.$route.params.id}/faculty_id/${faculty}`)
          .then(response => {
            this.chairs = response.data[0];
             
         
         console.log(this.stream)
       })
       axios.get(`http://localhost:5000/listLength/staff_member/department_id/${this.$route.params.id}/faculty_id/${faculty}`)
          .then(response => {
            this.staffMember = response.data[0];
             this.numberOfStaffMember = response.data[0].length;
         
         console.log(this.stream)
       })
       axios.get(`http://localhost:5000/listLength/students/department_id/${this.$route.params.id}/faculty_id/${faculty}`)
          .then(response => {
            
             this.numberOfStudents = response.data[0].length;
         
         console.log(this.stream)
       })
        axios.get(`http://localhost:5000/listLength/project/department_id/${this.$route.params.id}/faculty_id/${faculty}`)
          .then(response => {
            
             this.numberOfProjects = response.data[0].length;
         
         console.log(this.stream)
       })
          
          },
          methods:{
              
       
        }
      
      
      }
       
        
       
       
       
      
       
       </script>