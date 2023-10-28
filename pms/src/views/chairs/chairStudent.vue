<template>
    <div class="flex font-serif">
        <RouterView class="w-full" :key="$route.path"></RouterView>
    <div class="absolute right-2">
        
        <div :class="divStyle">
            <div class="border-b-2  border-blue-900 bg-blue-500 text-white ">Staff Members</div>
            <ul class="text-left ">
              <li class="pl-8 py-1 bg-gray-200 hover:bg-gray-500 hover:text-white"><RouterLink :to="{name:'chairAllStudents' ,params:{chairId:this.$route.params.chairId}}"><span :class="mainlistStyle">All Students</span></RouterLink></li>                
              <li class="pl-8 py-1 bg-gray-300 hover:bg-gray-500 hover:text-white"><RouterLink :to="{name:'chairStudentList', params:{chairId:this.$route.params.chairId,type:'year(date)!',value:2023}}">Graduated Students</RouterLink></li>
              <li class="pl-8 py-1 bg-gray-200 hover:bg-gray-500 hover:text-white"><RouterLink :to="{name:'chairStudentList', params:{chairId:this.$route.params.chairId,type:'year(date)',value:2023}}">Under Graduate Students</RouterLink></li>
              <li class="pl-8 py-1 bg-gray-300 hover:bg-gray-500 hover:text-white"><RouterLink :to="{name:'addStudent', params:{chairId:this.$route.params.chairId}}">Add Student</RouterLink></li>

            </ul>
        </div>
       
    </div>
    </div>
    </template>
    <script>
    import axios from "axios";
    export default{
         name:'chairStudent',
         data(){
            return{
                divStyle:'m-5 bg-gray-200  border-solid border-2 border-blue-700 rounded-md  ',
                style:"border-2 rounded-l-lg border-blue-500 ml-12 mr-6 px-4 py-1 hover:border-black font-serif",
                
                        
                       
                
            }
         },
         mounted() {
                 
            let token=localStorage.getItem('token')
      if(!token){
       this.$router.push({name:'Login'})
    }
              
              },
        methods:{
        
                   }
        }
      
      
    </script>