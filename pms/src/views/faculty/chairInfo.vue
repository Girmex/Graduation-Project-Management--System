
<template>
    
    <div :class="divStyle" class="m-4" >
          <div class="border-b-2  border-blue-900 bg-blue-500 text-white">Chair Info</div>
          <ul class="text-left pl-5 pt-2">
            <li v-for="item in this.academic " :key="item.id"  class="pl-3"> 
              <li>Chair Name: {{ item.name }}</li>
              <li>Chair Person:{{ item.chair_person }}</li>
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
           name:'chairInfo',
           components:{
           },
      
           data() {
               return {
                academic:[],
                staffMember:[],
                numberOfStaffMember:'',
                numberOfStudents:'',
                numberOfProjects:'',
                divStyle:' font-serif px-0 pt-0 border-solid border-2 border-blue-700 rounded-md w-1/3 h-full ',
               }
           },
        
          mounted() {
            let token=localStorage.getItem('token')    
      if(!token){
       this.$router.push({name:'Login'})
    }
         axios.get(`http://localhost:5000/listLength/chairs/faculty_id/${this.$route.params.facultyId}/id/${this.$route.params.Id}`)
          .then(response => {
            this.academic = response.data[1];
             
         
         console.log(this.stream)
       })
       axios.get(`http://localhost:5000/listLength/staff_member/faculty_id/${this.$route.params.facultyId}/chair_id/${this.$route.params.Id}`)
          .then(response => {
            this.staffMember = response.data[1];
             this.numberOfStaffMember = response.data[1].length;
         
         console.log(this.stream)
       })
       axios.get(`http://localhost:5000/listLength/students/faculty_id/${this.$route.params.facultyId}/chair_id/${this.$route.params.Id}`)
          .then(response => {
            
             this.numberOfStudents = response.data[1].length;
         
         console.log(this.stream)
       })
        axios.get(`http://localhost:5000/listLength/project/faculty_id/${this.$route.params.facultyId}/chair_id/${this.$route.params.Id}`)
          .then(response => {
            
             this.numberOfProjects = response.data[1].length;
         
         console.log(this.stream)
       })
          
          },
          methods:{
              
       
        }
      
      
      }
       
        
       
       
       
      
       
       </script>