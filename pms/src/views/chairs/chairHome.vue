<script></script>
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 h-1/6 font-serif">
   
    <div class="flex shadow-md shadow-slate-300 m-7">
      <div class="border-r border-gray-200 p-2 shadow-sm shadow-slate-300 hover:bg-black hover:text-white bg-blue-300">
        <RouterLink :to="{ name: 'addStudent', params: { chairId: this.$route.params.chairId } }">
          <label class="text-3xl">+</label><br><label class="text-sm">Add New</label>
        </RouterLink>
      </div>
      <div class="p-2"><span class="text-red-500">{{ this.numberOfCurrentStudent }}<br>Current Students</span></div>
    </div>
    <div class="flex shadow-md shadow-slate-300 m-7">
      <div class="border-r border-gray-200 p-2 shadow-sm shadow-slate-300 bg-orange-300 hover:bg-black hover:text-white">
        <RouterLink :to="{ name: 'formGroup', params: { chairId: this.$route.params.chairId } }">
          <label class="text-3xl">+</label><br><label class="text-sm">Add New</label>
        </RouterLink>
      </div>
      <div class="p-2"><span class="text-red-500">{{ this.numberOfCurrentProject }}<br>Current Projects</span></div>
    </div>
    <div class="flex shadow-md shadow-slate-300 m-7">
      <div class="border-r border-gray-200 p-2 shadow-sm shadow-slate-300 bg-green-300 hover:bg-black hover:text-white">
        <RouterLink class=""
          :to="{ name: 'addStaffMember', params: { chairId: this.$route.params.chairId } }">
          <label class="text-3xl">+</label><br><label class="text-sm">Add New</label>
        </RouterLink>
      </div>
      <div class="p-2"><span class="text-red-500">{{ this.numberOfStaffMember }}<br>Total Staff Member</span></div>
    </div>
    
    <div class="shadow-md shadow-slate-300 m-7">
      <div class="flex shadow-md shadow-slate-300  ">
        <div class="border-r border-gray-200 p-2 shadow-sm shadow-slate-300 hover:bg-black hover:text-white bg-cyan-300">
          <RouterLink :to="{ name: 'addStudent', params: { chairId: this.$route.params.chairId } }">
            <label class="text-3xl">+</label><br><label class="text-sm">Add New</label>
          </RouterLink>
        </div>
        <div class="p-2">
        <span class="text-red-500">
       
{{ this.numberOfStudent }}<br>Total Students</span></div>
      </div>
      <div class="mt-4">
        <ul>
          <li class="text-left px-2 flex justify-between">All Students<span class="">
              <RouterLink class="px-2 text-white rounded bg-blue-500 hover:bg-blue-900"
                :to="{ name: 'chairAllStudents', params: { chairId: this.$route.params.chairId } }">View
              </RouterLink>
            </span></li>
          <li class="text-left px-2 flex justify-between">Current Students<span class="">
              <RouterLink class="px-2 text-white rounded bg-blue-500 hover:bg-blue-900"
                :to="{ name: 'chairStudentList', params: { chairId: this.$route.params.chairId, type: 'year(date)', value: this.year } }">
                View</RouterLink>
            </span></li>
          <li class="text-left px-2 flex justify-between">Graduated Students<span class="">
              <RouterLink class="px-2 text-white rounded bg-blue-500 hover:bg-blue-900"
                :to="{ name: 'chairStudentList', params: { chairId: this.$route.params.chairId, type: 'year(date)!', value: this.year } }">
                View</RouterLink>
            </span></li>

        </ul>

      </div>
    </div>
    <div class="shadow-md shadow-slate-300  m-7">
      <div class="flex shadow-md shadow-slate-300  ">
        <div
          class="border-r border-gray-200 p-2 shadow-sm shadow-slate-300 bg-purple-300 hover:bg-black hover:text-white">
          <RouterLink :to="{ name: 'formGroup', params: { chairId: this.$route.params.chairId } }">
            <label class="text-3xl">+</label><br><label class="text-sm">Add New</label>
          </RouterLink>
        </div>
        <div class="p-2"><span class="text-red-500">{{ this.numberOfProject }}<br>Total Projects</span></div>
      </div>
      <div class="mt-4">
        <ul>
          <li class="text-left mb-1 px-2 flex justify-between"><span>All Project</span>
            <RouterLink class="px-2 text-white rounded bg-blue-500 hover:bg-blue-900"
              :to="{ name: 'chairAllProject', params: { chairId: this.$route.params.chairId } }">View
            </RouterLink>
          </li>
          <li class="text-left mb-1 px-2 flex justify-between"><span>Best Project</span>
            <RouterLink class="px-2 text-white rounded bg-blue-500 hover:bg-blue-900"
              :to="{ name: 'chairBestProject', params: { chairId: this.$route.params.chairId } }">View
            </RouterLink>
          </li>
          <li class="text-left mb-1 px-2 flex justify-between"><span>Uploaded Project</span>
            <RouterLink class="px-2 text-white rounded bg-blue-500 hover:bg-blue-900"
              :to="{ name: 'chairCompletedProject', params: { chairId: this.$route.params.chairId, type: 'status', value: 'Uploaded' } }">
              View</RouterLink>
          </li>
          <li class="text-left mb-1 px-2 flex justify-between"><span>Completed Project</span>
            <RouterLink class="px-2 text-white rounded bg-blue-500 hover:bg-blue-900"
              :to="{ name: 'chairCompletedProject', params: { chairId: this.$route.params.chairId, type: 'status', value: 'completed' } }">
              View</RouterLink>
          </li>
          <li class="text-left mb-1 px-2 flex justify-between"><span>Project Inprogress</span>
            <RouterLink class="px-2 text-white rounded bg-blue-500 hover:bg-blue-900"
              :to="{ name: 'chairCompletedProject', params: { chairId: this.$route.params.chairId, type: 'status', value: 'Inprogress' } }">
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
    name:'chairHome',
    components:{

    },
    data(){
        
        return {
           chair:[], 
           numberOfRepository:'' ,         
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

     
         await axios.get(`http://localhost:5000/listLength/staff_member/chair_id/${this.$route.params.chairId}/chair_id/''`)
            .then(response => {
              
               this.numberOfStaffMember = response.data[0].length;
           
           console.log(this.stream)
         })
         await axios.get(`http://localhost:5000/listLength/students/chair_id/${this.$route.params.chairId}/date/${this.year}`)
            .then(response => {
              
               this.numberOfStudent = response.data[0].length;
               this.numberOfCurrentStudent = response.data[1].length;
           
           console.log(this.stream)
         })
         await axios.get(`http://localhost:5000/listLength/allproject/chair_id/${this.$route.params.chairId}/date/${this.year}`)
            .then(response => {
              
               this.numberOfProject = response.data[0].length;
               this.numberOfCurrentProject = response.data[1].length;
           
           console.log(this.stream)
         })
         await axios.get(`http://localhost:5000/listLength/repository/chair_id/${this.$route.params.chairId}/date/${this.year}`)
            .then(response => {
              
               this.numberOfRepository = response.data[0].length;
            
           
           console.log(this.stream)
         })
         
    }
}
</script>