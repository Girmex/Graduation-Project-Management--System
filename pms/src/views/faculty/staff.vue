<template>
    <div class="flex font-serif">
        <RouterView class="w-full" :key="$route.path"></RouterView>
    <div class="absolute right-2">
        
        <div :class="divStyle">
            <div class="bg-blue-500 border border-blue-900 text-white ">Staff Members</div>
            <ul class="text-left bg-gray-300 ">
              <li class="pl-8 py-1 bg-gray-200 hover:bg-gray-500 hover:text-white"><RouterLink :to="{name:'staffMember' ,params:{facultyId:this.$route.params.facultyId}}"><span :class="mainlistStyle">All Staff Members</span></RouterLink></li>                
              <li class="pl-8 py-1 bg-gray-300 hover:bg-gray-500 hover:text-white"><RouterLink :to="{name:'staffList', params:{facultyId:this.$route.params.facultyId,type:'position',value:3}}">Department Head</RouterLink></li>
              <li class="pl-8 py-1 bg-gray-200 hover:bg-gray-500 hover:text-white"><RouterLink :to="{name:'staffList', params:{facultyId:this.$route.params.facultyId,type:'position',value:4}}">Chair Person</RouterLink></li>
              <li class="pl-8 py-1 bg-gray-300 hover:bg-gray-500 hover:text-white"><RouterLink :to="{name:'staffList', params:{facultyId:this.$route.params.facultyId,type:'position',value:5}}">Project Advisor</RouterLink></li>               
              <li class="pl-8 py-1 bg-gray-200 hover:bg-gray-500 hover:text-white"><RouterLink :to="{name:'staffList', params:{facultyId:this.$route.params.facultyId,type:'position',value:7}}">other</RouterLink></li>  
              <li class="pl-8 py-1 bg-gray-300 hover:bg-gray-500 hover:text-white"><RouterLink :to="{name:'addFacultyStaffMember' ,params:{facultyId:this.$route.params.facultyId}}"><span :class="mainlistStyle">Add Staff Members</span></RouterLink></li>                
            </ul>
        </div>
        <div :class="divStyle" >
            <div class="border-b-2  border-blue-900 bg-blue-500 text-white">Department <span class="text-right bg-gray-500 px-1 rounded-sm"> {{ this.numberOfDepartments }}</span></div>
            <ul class="text-left  pt-2">
                                            
                <li v-for="item in this.department " :key="item.department_id" class="pl-8 py-1 bg-gray-300 hover:bg-gray-500 hover:text-white"> <RouterLink :to="{name:'staffList', params:{facultyId:this.$route.params.facultyId,type:'department_id',value:item.department_id}}">{{ item.department_name }}</RouterLink>
                </li>
                                    
            </ul>
        </div>
        <div :class="divStyle" >
              <div class="border-b-2  border-blue-900 bg-blue-500 text-white">Chair <span class="text-right bg-gray-500 px-1 rounded-sm"> {{ this.numberOfChairs }}</span></div>
              <ul class="text-left  pt-2">
                                              
                  <li v-for="chair in this.chairs " :key="chair.id"  class="pl-8 py-1 bg-gray-300 hover:bg-gray-500 hover:text-white">
                     <RouterLink :to="{name:'staffList', params:{facultyId:this.$route.params.facultyId,type:'chair_id',value:chair.id}}">{{ chair.name }}</RouterLink>
                  </li>
                                      
              </ul>
          </div>
    </div>
    </div>
    </template>
    <script>
    import axios from "axios";
    export default{
         name:'staff',
         data(){
            return{
                divStyle:'m-5 bg-gray-200  border-solid border-2 border-blue-700 rounded-md  ',
                style:"border-2 rounded-l-lg border-blue-500 ml-12 mr-6 px-4 py-1 hover:border-black font-serif",
                department:[],
                chairs:[], 
                names:[],           
                numberOfDepartment:'',
                numberOfChairs:'',            
                
            }
         },
         mounted() {
            let token=localStorage.getItem('token')    
      if(!token){
       this.$router.push({name:'Login'})
    }
            axios.get(`http://localhost:5000/departmentList/${this.$route.params.facultyId}`)
                     .then(response => {
                     this.department = response.data;
                       this.numberOfDepartments = response.data.length;
             
             console.log(this.stream)
           })
               axios.get(`http://localhost:5000/chairList/faculty_id/${this.$route.params.facultyId}`)
                  .then(response => {
                    this.chairs = response.data;
                     this.numberOfChairs = response.data.length;
             
             console.log(this.stream)
           })
              
              },
        methods:{
        
                   }
        }
      
      
    </script>