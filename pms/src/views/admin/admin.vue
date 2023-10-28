<template >
    <img src="../../assets/bit.png" alt="" class="h-40px">
    <div class="w-full ">

<div :class="headerStyle" class="flex  ">
   <div class="mr-3 lg:mr-56"><div class="text-white  ml-3 mt-2 text-sm" v-for="profile in this.profile" :key="profile.id"><router-link class="text-sm lg:text-sm hover:text-orange-200" :to="{ name: 'adminProfile', params: { id: profile.id} }"> 
        <span class="lg:px-2 px-1 py-1  mr-1 rounded-full bg-orange-500 hover:bg-white hover:text-black text-black text-sm">{{ this.cat }}</span>     {{profile.first_name }} {{ profile.second_name }}</router-link> </div></div> 
  <div class="text-sm lg:text-xl"> Welcome to Super Admin Page                                

  </div> 
 
</div>
</div>
    <div class="flex ">
    <div class=" font-serif hidden lg:visible lg:flex flex-col h-screen p-3 bg-gray-900 shadow w-60 text-gray-50">
                <div class="space-y-3">
                    <div class="flex items-center">
                        <h2 class="text-xl font-bold">Admin Dashboard</h2>
                    </div>
                    <div class="relative">
                        <span
                            class="absolute inset-y-0 left-0 flex items-center py-4"
                        >
                          
                        </span>
                        <input
                            type="search"
                            name="Search"
                            placeholder="Search..."
                            class="w-full py-2 pl-10 text-sm rounded-md text-gray-900 focus:outline-none"
                        />
                    </div>
                    <div class="flex-1">
                        <ul class="pt-2 pb-4 space-y-1 text-sm">
                            <li class="rounded-sm" >
                                
                                <RouterLink :to="{name:'adminHome'}"><span :class="mainlistStyle">Home</span></RouterLink>
                             
                            </li>
                            <li class="rounded-sm">
                                
                                <RouterLink :to="{name:'adminFacultyList' }"><span :class="mainlistStyle" >Faculty</span></RouterLink>                 
                      
                         </li>
                            <li class="rounded-sm">
                                
                                   <RouterLink :to="{name:'adminAllDepartment' }"><span :class="mainlistStyle" >Department</span></RouterLink>                 
                         
                            </li>
                           
                            <li class="rounded-sm">
                                
                                <RouterLink :to="{name:'adminChairList' }"><span :class="mainlistStyle" >Chair</span></RouterLink>                           
                     
                            </li>          
            
                                    
                            <li class="rounded-sm">                               
                               <RouterLink :to="{name:'adminStaffMember'}"><span :class="mainlistStyle">Staff Members</span></RouterLink>
                                      
                                
                            </li>
                            <li class="rounded-sm">
                                
                                <RouterLink :to="{name:'adminAllStudents'}"><span :class="mainlistStyle">Students</span></RouterLink>
                               
                            </li>
                            <li class="rounded-sm">
                                
              
                                <RouterLink :to="{name:'adminAllProject'}"><span :class="mainlistStyle">Projects</span></RouterLink>
                                
                            </li>
                           
                                              
    
                            
                                
                            <li class="rounded-sm">
                                
                                <span :class="mainlistStyle"><button @click="Logout()">Log out</button></span>
                               
                            </li>
                        </ul>
                    </div>
                    
                </div>
                
            </div>
            
            <RouterView class="w-full"></RouterView>
            
        </div>
       
     
    </template>
    <script>
   
   import axios from "axios";
    export default{
        name:'admin',
        components:{
          
        },
        data(){
            return{
            mainlistStyle:'flex items-center p-2 space-x-3 rounded-md',
            isDisable:false,
            activeTab:'facultyHome',
            headerStyle:'h-8 text-xl bg-gray-900 text-white font-serif bg-blue-500 ',
            divStyle:'m-5  border-solid border-2 border-blue-700 rounded-md',
            childStyle:'grid grid-cols-1 divide-y',
            academic:[],
            stream:[],
            id:[],
            pic:'',
            cat:'',
            profile:[],
            isSeen:true,
            
                
            }
        },
    mounted(){
        let token=localStorage.getItem('token')    
      if(!token){
       this.$router.push({name:'Login'})
    }
     let id=localStorage.getItem('id')
     console.log(id)
     axios.get(`http://localhost:5000/listLength/staff_member/id/${id}/faculty_id/1`)
           .then(response => {
             this.profile =response.data[0];
             this.pic=this.profile[0].first_name.toUpperCase()
                this.cat=this.pic.slice(0,1)
             
           })
           .catch(error => console.log(error))
         
            },
    
    
       
    methods:{
       
        Logout(){
            localStorage.clear();
            this.$router.push({
          name: "HomeView"
        
        })
            
            }

    }}
    
    </script>