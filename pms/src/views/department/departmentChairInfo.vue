
<template>
   
    <div :class="divStyle" >
          <div class="border-b-2  border-blue-900 bg-blue-500 text-white">Chair Info
            <button @click="printContent" class="text-black">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
        </svg>
  
      </button></div>
          <ul ref="printContent" class="text-left pl-5 pt-2">
            <li v-for="item in this.chairs " :key="item.id"  class="pl-3"> 
            <li>Faculty Of {{ item.faculty_name }}</li>
            <li>Department Of {{ item.department_name }}</li>
            <li>Chair/Stream Of {{ item.name }}</li>
            <li>Chair Holder: {{ item.first_name }} {{ item.second_name }} {{ item.last_name }}</li>
           </li> 
            
            <li class="ml-3">Staff Member:{{ this.numberOfStaffMember }}</li>
            <li class="ml-3">Students:{{ this.numberOfStudents }}</li>
            <li class="ml-3">Projects:{{ this.numberOfProjects }}</li>
                      
          </ul>
      </div>
      
     
  </template>
  
  <script >
      import axios from "axios";
      import html2pdf from 'html2pdf.js';
     
       export default{
           name:'departmentChairInfo',
           components:{
           },
      
           data() {
               return {
                chairs:[],
                staffMember:[],
                numberOfStaffMember:'',
                numberOfStudents:'',
                numberOfProjects:'',
                divStyle:'mx-4 my-4 font-serif border-solid border-2 border-blue-700 rounded-md w-1/3 h-full ',
               }
           },
        
          mounted() {
            let token=localStorage.getItem('token')    
      if(!token){
       this.$router.push({name:'Login'})
    }
    axios.get(`http://localhost:5000/adminChairListInfo/${this.$route.params.chairId}`)
        .then(response => {
          
           this.chairs = response.data;
       
       console.log(this.stream)
     })
       axios.get(`http://localhost:5000/listLength/staff_member/department_id/${this.$route.params.departmentId}/chair_id/${this.$route.params.chairId}`)
          .then(response => {
            this.staffMember = response.data[1];
             this.numberOfStaffMember = response.data[1].length;
         
         console.log(this.stream)
       })
       axios.get(`http://localhost:5000/listLength/students/department_id/${this.$route.params.departmentId}/chair_id/${this.$route.params.chairId}`)
          .then(response => {
            
             this.numberOfStudents = response.data[1].length;
         
         console.log(this.stream)
       })
        axios.get(`http://localhost:5000/listLength/project/department_id/${this.$route.params.departmentId}/chair_id/${this.$route.params.chairId}`)
          .then(response => {
            
             this.numberOfProjects = response.data[1].length;
         
         console.log(this.stream)
       })
          
          },
          methods:{
              
            printContent() {
        const content = this.$refs.printContent;
        const options = {
          margin: 10,
          filename: 'content.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        };
  
        html2pdf().set(options).from(content).save();
      },
        }
      
      
      }
       
        
       
       
       
      
       
       </script>