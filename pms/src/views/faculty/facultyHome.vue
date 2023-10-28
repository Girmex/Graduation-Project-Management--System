
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 h-1/6 font-serif m-7">
    <div class="flex shadow-md shadow-slate-300 ">
      <div class="border-r border-gray-200 p-2 shadow-sm shadow-slate-300 bg-green-300 hover:bg-black hover:text-white">
        <RouterLink class=""
          :to="{ name: 'addFacultyStaffMember', params: { facultyId: this.$route.params.facultyId } }">
          <label class="text-3xl">+</label><br><label class="text-sm">Add New</label>
        </RouterLink>
      </div>
      <div class="p-2"><span class="text-red-500">{{ this.numberOfStaffMember }}<br>Total Staff Member</span></div>
    </div>
    <div class="flex shadow-md shadow-slate-300 ">
      
      <div class="p-2 flex "><svg class="w-14 pr-2 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
</svg>
<span class="text-red-500">{{ this.numberOfStudent }}<br>Total Students</span></div>
    </div>
    <div class="flex shadow-md shadow-slate-300 ">
      
      <div class="p-2 flex"><svg class="text-red-500 pr-2 w-14" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
</svg>
<span class="text-red-500">{{ this.numberOfCurrentProject }}<br>Current Projects</span></div>
    </div>
    <div class="shadow-md shadow-slate-300 ">
      <div class="flex shadow-md shadow-slate-300  ">
        <div class="border-r border-gray-200 p-2 shadow-sm shadow-slate-300 bg-orange-300 hover:bg-black hover:text-white">
          <router-link :to="{ name: 'addDepartment', params: { facultyId: this.$route.params.facultyId } }">
            <label class="text-3xl">+</label><br><label class="text-sm">Add New</label> </router-link>
        </div>
        <div class="p-2"><span class="text-red-500">{{ this.numberOfDepartment }}<br>Departments</span></div>
      </div>
      <div class="mt-4">
        <ul>
          <li v-for="department in department " :key="chair.id" class="text-left px-2 flex justify-between">{{ department.department_name }}<span
              class="">
              <RouterLink class="px-2 text-white rounded bg-blue-500 hover:bg-blue-900"
              :to="{name:'departmentInfo',params:{id:department.department_id,facultyId:this.$route.params.facultyId}}">
                Detail</RouterLink>
            </span>

          </li>
        </ul>

      </div>
    </div>
    
    <div class="shadow-md shadow-slate-300 ">
      <div class="flex shadow-md shadow-slate-300  ">
        <div class="border-r border-gray-200 p-2 shadow-sm shadow-slate-300 bg-red-300 hover:bg-black hover:text-white">
          <router-link :to="{ name: 'addChair', params: { facultyId: this.$route.params.facultyId } }">
            <label class="text-3xl">+</label><br><label class="text-sm">Add New</label> </router-link>
        </div>
        <div class="p-2"><span class="text-red-500">{{ this.numberOfChairs }}<br>Chairs</span></div>
      </div>
      <div class="mt-4">
        <ul>
          <li v-for="chair in chair " :key="chair.id" class="text-left px-2 flex justify-between">{{ chair.name }}<span
              class="">
              <RouterLink class="px-2 text-white rounded bg-blue-500 hover:bg-blue-900"
              :to="{name:'chairInfo',params:{Id:chair.id,facultyId:this.$route.params.facultyId}}">
                Detail</RouterLink>
            </span>

          </li>
        </ul>

      </div>
    </div>
    <div class="shadow-md shadow-slate-300  ">
      <div class="flex shadow-md shadow-slate-300  ">
        
        <div class="p-2 flex"><svg class="w-14 text-red-500 pr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
</svg>
<span class="text-red-500">{{ this.numberOfProject }}<br>Total Projects</span></div>
      </div>
      <div class="mt-4">
        <ul>
          <li class="text-left mb-1 px-2 flex justify-between"><span>All Project</span>
            <RouterLink class="px-2 text-white rounded bg-blue-500 hover:bg-blue-900"
              :to="{ name: 'allProject', params: { facultyId: this.$route.params.facultyId } }">View
            </RouterLink>
          </li>
          <li class="text-left mb-1 px-2 flex justify-between"><span>Best Project</span>
            <RouterLink class="px-2 text-white rounded bg-blue-500 hover:bg-blue-900"
              :to="{ name: 'facultyBestProject', params: { facultyId: this.$route.params.facultyId } }">View
            </RouterLink>
          </li>
          <li class="text-left mb-1 px-2 flex justify-between"><span>Uploaded Project</span>
            <RouterLink class="px-2 text-white rounded bg-blue-500 hover:bg-blue-900"
              :to="{ name: 'completedProject', params: { facultyId: this.$route.params.facultyId, type: 'status', value: 'Uploaded' } }">
              View</RouterLink>
          </li>
          <li class="text-left mb-1 px-2 flex justify-between"><span>Completed Project</span>
            <RouterLink class="px-2 text-white rounded bg-blue-500 hover:bg-blue-900"
              :to="{ name: 'completedProject', params: { facultyId: this.$route.params.facultyId, type: 'status', value: 'completed' } }">
              View</RouterLink>
          </li>
          <li class="text-left mb-1 px-2 flex justify-between"><span>Project Inprogress</span>
            <RouterLink class="px-2 text-white rounded bg-blue-500 hover:bg-blue-900"
              :to="{ name: 'completedProject', params: { facultyId: this.$route.params.facultyId, type: 'status', value: 'Inprogress' } }">
              View</RouterLink>
          </li>


        </ul>

      </div>
    </div>
   
    
  </div>

</template>
<script>
import axios from "axios";
export default{
    name:'facultyHome',
    components:{

    },
    data(){
        
        return {
           chair:[], 
           department:[],
           numberOfDepartment:'',
           numberOfChairs:'' ,         
           numberOfStaffMember:'',
           numberOfStudent:'',
           numberOfProject:'',
           numberOfCurrentStudent:'',
           numberOfCurrentProject:'',
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

     
         await axios.get(`http://localhost:5000/listLength/staff_member/faculty_id/${this.$route.params.facultyId}/faculty_id/''`)
            .then(response => {
              
               this.numberOfStaffMember = response.data[0].length;
           
           console.log(this.stream)
         })
         await axios.get(`http://localhost:5000/listLength/students/faculty_id/${this.$route.params.facultyId}/date/${this.year}`)
            .then(response => {
              
               this.numberOfStudent = response.data[0].length;
               this.numberOfCurrentStudent = response.data[1].length;
           
           console.log(this.stream)
         })
         await axios.get(`http://localhost:5000/listLength/allproject/faculty_id/${this.$route.params.facultyId}/date/${this.year}`)
            .then(response => {
              
               this.numberOfProject = response.data[0].length;
               this.numberOfCurrentProject = response.data[1].length;
           
           console.log(this.stream)
         })
         await axios
        .get(`http://localhost:5000/chairList/faculty_id/${this.$route.params.facultyId}`)
        .then((response) => {
          this.chair = response.data
          this.numberOfChairs=response.data.length
        })
        await axios
        .get(`http://localhost:5000/departmentList/${this.$route.params.facultyId}`)
        .then((response) => {
          this.department = response.data
          this.numberOfDepartment=response.data.length
        })
    }
}
</script>