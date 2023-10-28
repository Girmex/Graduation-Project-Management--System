<template>
    <div class=" font-serif">
    <div class="flex justify-between ">
       
        <div :class="divStyle">
            <div class="border-b-2  border-blue-900 hover:bg-blue-900 rounded-md px-4 py-2 bg-blue-500 text-white "><button @click="isStudent = !isStudent ">Students</button></div>
            <ul class="text-left  pt-2" v-if="isStudent">
              <li class="pl-8 py-1 bg-gray-300 hover:bg-gray-500 hover:text-white"><RouterLink :to="{name:'adminAllStudents' }"><span :class="mainlistStyle">All Students</span></RouterLink></li>                
              <li class="pl-8 py-1 bg-gray-200 hover:bg-gray-500 hover:text-white"><RouterLink :to="{name:'adminStudentsList', params:{type:'year(students.date)!',value:2023}}">Graduated Students</RouterLink></li>
              <li class="pl-8 py-1 bg-gray-300 hover:bg-gray-500 hover:text-white"><RouterLink :to="{name:'adminStudentsList', params:{type:'year(students.date)',value:2023}}">Under Graduate Students</RouterLink></li>

            </ul>
        </div>
        <div :class="divStyle" >
            <div class="border-b-2  border-blue-900 hover:bg-blue-900 rounded-md px-4 py-2 bg-blue-500 text-white"><button @click="isFaculty = !isFaculty">Faculty <span class="text-right bg-gray-500 px-1 rounded-sm"> {{ this.numberOfFaculty }}</span></button></div>
            <ul class="text-left  pt-2" v-if="isFaculty">
                                            
                <li v-for="item in this.faculty " :key="item.faculty_id"  class="pl-8 py-1 bg-gray-300 hover:bg-gray-500 hover:text-white"> <RouterLink :to="{name:'adminStudentsList', params:{type:'students.faculty_id',value:item.faculty_id}}">{{ item.faculty_name }}</RouterLink>
                </li>
                                    
            </ul>
        </div>
        <div :class="divStyle" >
            <div class="border-b-2  border-blue-900 hover:bg-blue-900 rounded-md px-4 py-2 bg-blue-500 text-white"><button @click="isDepartment = !isDepartment">Department <span class="text-right bg-gray-500 px-1 rounded-sm"> {{ this.numberOfDepartments }}</span></button></div>
            <ul class="grid grid-cols-3 text-left  pt-2" v-if="isDepartment">
                                            
                <li v-for="item in this.department " :key="item.department_id"  class="pl-8 py-1 bg-gray-300 hover:bg-gray-500 hover:text-white"> <RouterLink :to="{name:'adminStudentsList', params:{type:'students.department_id',value:item.department_id}}">{{ item.department_name }}</RouterLink>
                </li>
                                    
            </ul>
        </div>
        <div :class="divStyle" >
              <div class="border-b-2  border-blue-900 hover:bg-blue-900 rounded-md px-4 py-2 bg-blue-500 text-white"><button @click="isChair = !isChair">Chair <span class="text-right bg-gray-500 px-1 rounded-sm"> {{ this.numberOfChairs }}</span></button></div>
              <ul class="grid grid-cols-4 text-left  pt-2" v-if="isChair">
                                              
                  <li v-for="chair in this.chairs " :key="chair.id"  class="pl-8 py-1 bg-gray-300 hover:bg-gray-500 hover:text-white"> <RouterLink :to="{name:'adminStudentsList', params:{type:'students.chair_id',value:chair.id}}">{{ chair.name }}</RouterLink>
                  </li>
                                      
              </ul>
          </div>
    </div>
    <RouterView class="w-full" :key="$route.path"></RouterView>

    </div>
    </template>
    <script>
    import axios from "axios";
    export default{
         name:'adminStudents',
         data(){
            return{
                divStyle:'m-5  rounded-md  ',
                style:"border-2 rounded-l-lg border-blue-500 ml-12 mr-6 px-4 py-1 hover:border-black font-serif",
                department:[],
                chairs:[], 
                faculty:[],
                names:[],           
                numberOfDepartment:'',
                numberOfChairs:'',   
                numberOfFaculty:'',
                isStudent:false,
                isFaculty:false,
                isDepartment:false,
                isChair:false,         
                
            }
         },
         mounted() {
            let token=localStorage.getItem('token')    
      if(!token){
       this.$router.push({name:'Login'})
    }
            axios.get(`http://localhost:5000/adminFacultyList`)
                     .then(response => {
                     this.faculty = response.data;
                       this.numberOfFaculty = response.data.length;
             
             console.log(this.stream)
           })
           axios.get(`http://localhost:5000/adminDepartmentList`)
                     .then(response => {
                     this.department = response.data;
                       this.numberOfDepartments = response.data.length;
             
             console.log(this.stream)
           })
               axios.get(`http://localhost:5000/adminChairList`)
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