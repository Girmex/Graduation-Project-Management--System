<template>
    <div class=" font-serif">
       
    <div class="">
        
        <div :class="divStyle">
        
            <ul class="flex justify-between text-left px-8 pt-2">
                <li class="hover:bg-blue-700 active:bg-slate-300 px-4 py-2 border rounded-md text-white"><RouterLink :to="{name:'listAllNotice' ,params:{facultyId:this.$route.params.facultyId}}"><span :class="mainlistStyle">Notice</span></RouterLink></li>          
                <li class="hover:bg-blue-700 active:bg-slate-300 px-8 py-2 border rounded-md text-white"><RouterLink :to="{name:'noticeList', params:{facultyId:this.$route.params.facultyId,type:'status',value:'all'}}">All</RouterLink></li>
                <li class="hover:bg-blue-700 active:bg-slate-300 px-4 py-2 border rounded-md text-white"><RouterLink :to="{name:'noticeList', params:{facultyId:this.$route.params.facultyId,type:'status',value:'advisor'}}">Advisors</RouterLink></li>               
                <li class="hover:bg-blue-700 active:bg-slate-300 px-4 py-2 border rounded-md text-white"><RouterLink :to="{name:'noticeList', params:{facultyId:this.$route.params.facultyId,type:'status',value:'student'}}">Students</RouterLink></li>               
                <li class="hover:bg-blue-700 active:bg-slate-300 px-4 py-2 border rounded-md text-white"><RouterLink :to="{name:'noticeList', params:{facultyId:this.$route.params.facultyId,type:'status',value:'chair'}}">Chairs</RouterLink></li>
                <li class="hover:bg-blue-700 active:bg-slate-300 px-4 py-2 border rounded-md text-white"><RouterLink :to="{name:'addNotice' ,params:{facultyId:this.$route.params.facultyId}}"><span :class="mainlistStyle">Upload Notice</span></RouterLink></li>


            </ul>
        </div>
       
       
    </div>
    <div class="mt-4 w-full max-h-full"><RouterView class="w-full" :key="$route.path"></RouterView></div> 
    </div>
    </template>
    <script>
    import axios from "axios";
    export default{
         name:'project',
         data(){
            return{
                divStyle:'  bg-gray-900  ',
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
         },
        
       
        }
      
      
    </script>