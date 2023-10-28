
<template>
    <div class=" font-serif h-full">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 h-1/3 lg:h-1/6 font-serif">
     
      <div class="flex shadow-md shadow-slate-300 m-7">
        <svg class="bg-black text-white w-14" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
</svg>

        <div class="p-2"><span class="text-black "><span class="font-bold ">Advisor Name</span><br>{{ this.advisor }}</span></div>
      </div>
      <div class="flex shadow-md shadow-slate-300 m-7">
        <svg class="bg-blue-900 text-white w-14" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 3.75v4.5m0-4.5h-4.5m4.5 0l-6 6m3 12c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z" />
</svg>

        <div class="p-2"><span class="text-black "><span class="font-bold ">Phone Number</span><br>{{ this.phone }}</span></div>
      </div>
      <div class="flex shadow-md shadow-slate-300 m-7">
        <svg class="bg-red-900 text-white w-14" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
  <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
</svg>

        <div class="p-2"><span class="text-black "><span class="font-bold ">Email</span><br>{{ this.email }}</span></div>
      </div>
      
    </div>
    <div class="shadow-md shadow-slate-300  m-7">
        <div class="flex justify-center shadow-md shadow-slate-300  ">
          <svg class="w-14 text-black pr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
  </svg>
          <div class="p-2"><span class="text-black font-bold">{{ this.numberOfAdvisorProject }}<br>Advisors Projects</span></div>
        </div>
        <div class="mt-4">
          <ul class="grid grid-cols-1 lg:grid-cols-2">
            <li class="text-left mb-1 mx-2 px-3 rounded border border-gray-200 flex justify-between" v-for="group in advisorProject" :key="group.id"><span>{{ group.title }}</span>
              <RouterLink class="px-2 my-1 text-white rounded bg-blue-500 hover:bg-blue-900"
              :to="{ name: 'studentProjectDetail', params: { id: this.$route.params.id, group: group.id } }">View
              </RouterLink>
            </li>
            
  
          </ul>
  
        </div>
      </div>
   </div>
   
  </template>
  <script>
  import axios from "axios";
  export default{
      name:'studentAdvisor',
      components:{
  
      },
      data(){
          
          return {
             studentGroup:[], 
             examinerList:[], 
             advisorProject:[], 
             departmentName:'',
             departmentProject:'',
             numberOfGroupMember:'',
             numberOfExaminer:'',
             numberOfAdvisorProject:'',
             title:'' ,         
             advisor:'',
             phone:'',
             email:'',
             advisorId:'',
             examiner:'',
             type:'',
             value:'',
             projectChair:'',
             year:'1',
             divStyle:'m-8 bg-gray-200 border-solid border-2 border-blue-700 rounded-md ',
                 }
            
      },
   async  mounted(){
      let dat = new Date();
          this.year = dat.getFullYear();
          console.log(this.year)
          console.log(this.year)
      let token=localStorage.getItem('token')    
        if(!token){
         this.$router.push({name:'Login'})
      }
      let chairId=localStorage.getItem('chair_id');
      let departmentId= localStorage.getItem('department_id')
  
       
          
           await axios.get(`http://localhost:5000/listLength/students/group_id/${this.$route.params.group}/date/1`)
              .then(response => {
                
                 this.studentGroup = response.data[0];
                 this.numberOfGroupMember=response.data[0].length;
                 
             
             console.log(this.studentGroup)
           })
           await axios.get(`http://localhost:5000/listLength/allproject/id/${this.$route.params.group}/date/1`)
              .then(response => {
                let result=response.data[0]
                 this.title=result[0].title;
                 this.advisor=result[0].advisor;
                 this.projectChair=result[0].chair_id;
                 this.departmentName=result[0].department_name;
             console.log(result)
             
             console.log(233,this.title)
           })
           await axios.get(`http://localhost:5000/listLength/project/id/${this.$route.params.group}/date/1`)
              .then(response => {
                 let result=response.data[0]
                 this.examiner=result[0].group_id;
                 this.advisorId=result[0].advisor;
  
             console.log(11111111111111,this.advisorId)
           })
           await axios.get(`http://localhost:5000/listLength/allproject/advisor/${this.advisor}/status/Uploaded`)
              .then(response => {
                
                 this.advisorProject=response.data[1];
                 this.numberOfAdvisorProject=response.data[1].length;
                
             
             console.log(this.advisorProject)
           })
           await axios.get(`http://localhost:5000/listLength/allproject/department_id/${departmentId}/date/1`)
              .then(response => {
                
                 this.departmentProject=response.data[0].length;
                
             
             console.log(this.advisorProject)
           })
           await axios.get(`http://localhost:5000/listLength/staff_member/id/${this.advisorId}/chair_id/1`)
              .then(response => {
               
                 let result=response.data[0];
                 this.phone=result[0].phone_number;
                 this.email=result[0].e_mail;
                
             
             console.log(333333333333,result)
           })
           if(this.projectChair==null){
               this.type='department_id';
               this.value=departmentId
           }
           else{
               this.type='chair_id';
               this.value=chairId
           }
           console.log(this.type,this.value)
           await axios.get(`http://localhost:5000/examinerList/${this.examiner}/${this.type}/${this.value}`)
              .then(response => {
                console.log(this.examiner)
                 this.examinerList = response.data;
                 this.numberOfExaminer= response.data.length;
             
             console.log(this.examinerList)
           })
           
      }
  }
  </script>