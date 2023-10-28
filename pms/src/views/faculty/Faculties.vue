<template >
    <img src="../../assets/bit.png" alt="" class="h-40px">
    <div class="w-full ">

<div :class="headerStyle" class="flex  ">
   <div class="mr-3 lg:mr-36"><div class="text-white  ml-3 mt-2 text-sm" v-for="profile in this.profile" :key="profile.id"><router-link class="text-sm lg:text-sm hover:text-orange-200" :to="{ name: 'profile', params: { id: profile.id, facultyId: this.faculty } }"> 
        <span class="lg:px-2 px-1 py-1  mr-1 rounded-full bg-orange-500 hover:bg-white hover:text-black text-black text-sm">{{ this.cat }}</span>     {{profile.first_name }} {{ profile.second_name }}</router-link> </div></div> 
  <div class="text-sm lg:text-xl"> Welcome to                                  
<span v-for="item in this.academic " :key="item.id " class="ml-2 "> {{ item.faculty_name }} Faculty</span>
  </div> 
 
</div>
</div>
    <div class="flex ">
    <div class=" font-serif hidden lg:flex lg:flex-cols-1 h-full p-3 pt-7 bg-gray-900 shadow w-1/5 text-gray-50">
                <div class="space-y-3">
                    <div class="flex items-center">
                        <h2 class="text-xl font-bold">Faculty Dashboard</h2>
                    </div>
                    
                    <div class="flex-1">
                        <ul class="pt-2 pb-4 space-y-1 text-sm">
                            <li class="rounded-sm bg-gray-700" >
                                
                               <button class="rounded-sm w-full text-left focus:bg-slate-300 focus:text-black text-white flex justify-between bg-gray-800 hover:bg-white hover:text-black" :class="mainlistStyle"> <RouterLink class="w-full" :to="{name:'facultyHome',params:{facultyid:this.faculty}}"><span >Home</span></RouterLink></button>
                             
                            </li>
                            <li class="rounded-sm bg-gray-700">
                                
                                 <button class="rounded-sm w-full bg-gray-800  flex justify-between hover:bg-white hover:text-black" @click="this.isDepartment = !this.isDepartment" :class="mainlistStyle" >Department 
                                    <svg v-if="!isDepartment" xmlns="http://www.w3.org/2000/svg" class="w-5 h-6 " fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
</svg>
<svg v-if="isDepartment" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="w-5 h-6  ml-14 " className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
</svg>

</button> 
                                 <li class="rounded-sm w-full text-left flex justify-between hover:bg-white hover:text-black" v-if="this.isDepartment"><router-link class="w-full px-8 py-1 hover:bg-white focus:bg-slate-300 focus:text-black hover:text-black text-white" :to="{name:'allDepartment',params:{facultyId:this.faculty}}">Department List</router-link> </li>
                                 <li v-if="this.isDepartment" v-for="item in this.department" :key="item.department_id" class="rounded-sm w-full text-left flex justify-between hover:bg-white hover:text-black">
                                  <RouterLink class="w-full px-8 py-1 hover:bg-white focus:bg-slate-300 focus:text-black hover:text-black text-white" :to="{name: 'departmentInfo',params: { id: item.department_id, facultyId: this.faculty }}">{{ item.department_name }}</RouterLink>
                                  </li>  
                                  <li v-if="this.isDepartment" class="rounded-sm w-full text-left flex justify-between hover:bg-white hover:text-black" > <router-link class="w-full px-8 py-1 hover:bg-white focus:bg-slate-300 focus:text-black hover:text-black text-white" :to="{ name: 'addDepartment', params: { facultyId: this.faculty } }">
                                  <label class="text-sm">Add New</label> </router-link></li>             
                         
                            </li>
                           
                            <li class="rounded-sm bg-gray-700">
                                
                                <button class="rounded-sm w-full bg-gray-800 flex justify-between hover:bg-white hover:text-black" @click="this.isChair = !this.isChair" :class="mainlistStyle" >Chair <svg v-if="!isChair" xmlns="http://www.w3.org/2000/svg" class="w-5 h-6  ml-14 " fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
</svg>
<svg v-if="isChair" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="w-5 h-6  ml-14 " className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
</svg>
</button> 
                                <li class="px-8 py-1 text-left" v-if="this.isChair"><router-link class="hover:bg-gray-300 focus:bg-white focus:text-purple-900 hover:text-black text-white" :to="{name:'chairList',params:{facultyId:this.faculty}}">Chair List</router-link> </li>  
                                <li v-if="this.isChair" v-for="item in this.chairs" :key="item.id" class="px-8 py-1 text-left">
                                    <RouterLink class="hover:bg-gray-300 focus:bg-white focus:text-purple-900 hover:text-black text-white" :to="{name:'chairInfo',params:{Id:item.id,facultyId:this.faculty}}">{{ item.name }}</RouterLink>
                               </li>   
                              <li class="px-8 py-1 text-left" v-if="this.isChair">   <router-link class="hover:bg-gray-300 focus:bg-white focus:text-purple-900 hover:text-black text-white" :to="{ name: 'addChair', params: { facultyId: this.$route.params.facultyId } }">
                                <label class="text-sm">Add New</label> </router-link></li>              
                     
                            </li>          
            
                                    
                            <li class="rounded-sm bg-gray-700">                               
                               <button class="rounded-sm w-full bg-gray-800 flex justify-between hover:bg-white hover:text-black" @click="this.isStaff = !this.isStaff" :class="mainlistStyle">Staff Members
                                <svg v-if="!isStaff" xmlns="http://www.w3.org/2000/svg" class="w-5 h-6   " fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
</svg>
<svg v-if="isStaff" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="w-5 h-6   " className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
</svg></button>
                            <ul v-if="this.isStaff" class="px-8 py-1 text-left">
                               <li><RouterLink class="hover:bg-gray-300 focus:bg-white focus:text-purple-900 hover:text-black text-white" :to="{name:'staffMember' ,params:{facultyId:this.faculty}}">All Staff Members</RouterLink></li> 
                               <li><button @click="this.isStaffDepartment =  !this.isStaffDepartment">In Department</button>
                                <li v-if="this.isStaffDepartment" v-for="item in this.department" :key="item.department_id" class="px-8 py-1 text-left">
                                    <RouterLink class="hover:bg-gray-300 focus:bg-white focus:text-purple-900 hover:text-black text-white" :to="{name:'staffList', params:{facultyId:this.faculty,type:'department_id',value:item.department_id}}">{{ item.department_name }}</RouterLink>                                  </li>  
                               </li>  
                               <li><button @click="this.isStaffChair = !this.isStaffChair">In Chair</button>
                                <li v-if="this.isStaffChair" v-for="item in this.chairs" :key="item.id" class="px-8 py-1 text-left">
                                    <RouterLink class="hover:bg-gray-300 focus:bg-white focus:text-purple-900 hover:text-black text-white" :to="{name:'staffList', params:{facultyId:this.faculty,type:'chair_id',value:item.id}}">{{ item.name }}</RouterLink>
                               </li> 
                               </li>             
                               <li><RouterLink class="hover:bg-gray-300 focus:bg-white focus:text-purple-900 hover:text-black text-white" :to="{name:'staffList', params:{facultyId:this.faculty,type:'position',value:3}}">Department Head</RouterLink></li>
                               <li><RouterLink class="hover:bg-gray-300 focus:bg-white focus:text-purple-900 hover:text-black text-white" :to="{name:'staffList', params:{facultyId:this.faculty,type:'position',value:4}}">Chair Person</RouterLink></li>
                               <li><RouterLink class="hover:bg-gray-300 focus:bg-white focus:text-purple-900 hover:text-black text-white" :to="{name:'staffList', params:{facultyId:this.faculty,type:'position',value:5}}">Project Advisor</RouterLink></li>               
                               <li><RouterLink class="hover:bg-gray-300 focus:bg-white focus:text-purple-900 hover:text-black text-white" :to="{name:'staffList', params:{facultyId:this.faculty,type:'position',value:7}}">other</RouterLink></li> 
                               <li><RouterLink class="hover:bg-gray-300 focus:bg-white focus:text-purple-900 hover:text-black text-white" :to="{name:'addFacultyStaffMember', params:{facultyId:this.faculty}}">Add StaffMember</RouterLink></li> 

                            </ul>      
                                
                            </li>
                            <li class="rounded-sm bg-gray-700">
                                
                                <button class="rounded-sm w-full bg-gray-800 flex justify-between hover:bg-white hover:text-black" @click="this.isStudent = !this.isStudent" :class="mainlistStyle">Students
                                    <svg v-if="!isStudent" xmlns="http://www.w3.org/2000/svg" class="w-5 h-6  ml-14 " fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
</svg>
<svg v-if="isStudent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="w-5 h-6  ml-14 " className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
</svg></button>
                                <ul v-if="this.isStudent" class="px-8 py-1 text-left">
                                    <li ><RouterLink class="hover:bg-gray-300 focus:bg-white focus:text-purple-900 hover:text-black text-white" :to="{name:'allStudents' ,params:{facultyId:this.faculty}}">All Students</RouterLink></li>                
                                    <li><button @click="this.isStudentDepartment =  !this.isStudentDepartment">In Department</button>
                                     <li v-if="this.isStudentDepartment" v-for="item in this.department" :key="item.department_id" class="px-8 py-1 text-left">
                                        <RouterLink class="hover:bg-gray-300 focus:bg-white focus:text-purple-900 hover:text-black text-white" :to="{name:'studentsList', params:{facultyId:this.faculty,type:'students.department_id',value:item.department_id}}">{{ item.department_name }}</RouterLink>
                                    </li></li> 
                                    <li><button @click="this.isStudentChair = !this.isStudentChair">In Chair</button>
                                     <li v-if="this.isStudentChair" v-for="item in this.chairs" :key="item.id" class="px-8 py-1 text-left">
                                        <RouterLink class="hover:bg-gray-300 focus:bg-white focus:text-purple-900 hover:text-black text-white" :to="{name:'studentsList', params:{facultyId:this.faculty,type:'students.chair_id',value:item.id}}">{{ item.name }}</RouterLink>
                                    </li> 
                                    </li> 
                                    <li ><RouterLink class="hover:bg-gray-300 focus:bg-white focus:text-purple-900 hover:text-black text-white" :to="{name:'studentsList', params:{facultyId:this.faculty,type:'year(students.date) !',value:this.year}}">Graduated Students</RouterLink></li>
                                    <li ><RouterLink class="hover:bg-gray-300 focus:bg-white focus:text-purple-900 hover:text-black text-white" :to="{name:'studentsList', params:{facultyId:this.faculty,type:'year(students.date) ',value:this.year}}">Under Graduate Students</RouterLink></li>

                                </ul>
                               
                            </li>
                            <li class="rounded-sm bg-gray-700">
                                
                               <button class="rounded-sm w-full bg-gray-800 flex justify-between hover:bg-white hover:text-black" @click="this.isProject = !this.isProject" :class="mainlistStyle">Projects
                                <svg v-if="!isProject" xmlns="http://www.w3.org/2000/svg" class="w-5 h-6  ml-14 " fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
</svg>
<svg v-if="isProject" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="w-5 h-6  ml-14 " className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
</svg></button>
                                <ul v-if="this.isProject" class="px-8 py-1 text-left">
                                    <li><RouterLink class="hover:bg-gray-300 focus:bg-white focus:text-purple-900 hover:text-black text-white" :to="{name:'allProject' ,params:{facultyId:this.faculty}}">All projects</RouterLink></li>               
                                    <li><button @click="this.isProjectDepartment =  !this.isProjectDepartment">In Department</button>
                                     <li v-if="this.isProjectDepartment" v-for="item in this.department" :key="item.department_id" class="px-8 py-1 text-left">
                                        <RouterLink class="hover:bg-gray-300 focus:bg-white focus:text-purple-900 hover:text-black text-white" :to="{name:'completedProject', params:{facultyId:this.faculty,type:'department_id',value:item.department_id}}">{{ item.department_name }}</RouterLink>
                                    </li></li> 
                                    <li><button @click="this.isProjectChair = !this.isProjectChair">In Chair</button>
                                     <li v-if="this.isProjectChair" v-for="item in this.chairs" :key="item.id" class="px-8 py-1 text-left">
                                        <RouterLink class="hover:bg-gray-300 focus:bg-white focus:text-purple-900 hover:text-black text-white" :to="{name:'completedProject', params:{facultyId:this.faculty,type:'chair_id',value:item.id}}">{{ item.name }}</RouterLink>
                                    </li> 
                                    </li> 
                                    <li><RouterLink class="hover:bg-gray-300 focus:bg-white focus:text-purple-900 hover:text-black text-white" :to="{name:'completedProject', params:{facultyId:this.faculty,type:'status',value:'Uploaded'}}">Uploaded Projects</RouterLink></li>
                                    <li><RouterLink class="hover:bg-gray-300 focus:bg-white focus:text-purple-900 hover:text-black text-white" :to="{name:'completedProject', params:{facultyId:this.faculty,type:'status',value:'completed'}}">Completed Projects</RouterLink></li>
                                    <li><RouterLink class="hover:bg-gray-300 focus:bg-white focus:text-purple-900 hover:text-black text-white" :to="{name:'completedProject', params:{facultyId:this.faculty,type:'status !',value:'Uploaded'}}">Projects in Progress</RouterLink></li>               
            
                                </ul>
                            </li>
                            <li class="rounded-sm bg-gray-700">
                                               
                                <button class="rounded-sm w-full bg-gray-800 flex justify-between hover:bg-white hover:text-black" @click="this.isNotice = !this.isNotice" :class="mainlistStyle">Notice
                                    <svg v-if="!isNotice" xmlns="http://www.w3.org/2000/svg" class="w-5 h-6  ml-14 " fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
</svg>
<svg v-if="isNotice" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="w-5 h-6  ml-14 " className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
</svg></button> 
                                <ul class="px-8 py-1 text-left" v-if="this.isNotice">
                                    <li ><RouterLink class="hover:bg-gray-300 focus:bg-white focus:text-purple-900 hover:text-black text-white" :to="{name:'listAllNotice' ,params:{facultyId:this.$route.params.facultyId}}">Notice List</RouterLink></li>          
                                    <li ><RouterLink class="hover:bg-gray-300 focus:bg-white focus:text-purple-900 hover:text-black text-white" :to="{name:'noticeList', params:{facultyId:this.$route.params.facultyId,type:'status',value:'all'}}">For All</RouterLink></li>
                                    <li ><RouterLink class="hover:bg-gray-300 focus:bg-white focus:text-purple-900 hover:text-black text-white" :to="{name:'noticeList', params:{facultyId:this.$route.params.facultyId,type:'status',value:'department'}}">For Department</RouterLink></li>
                                    <li ><RouterLink class="hover:bg-gray-300 focus:bg-white focus:text-purple-900 hover:text-black text-white" :to="{name:'noticeList', params:{facultyId:this.$route.params.facultyId,type:'status',value:'chair'}}">For Chair</RouterLink></li>
                                    <li ><RouterLink class="hover:bg-gray-300 focus:bg-white focus:text-purple-900 hover:text-black text-white" :to="{name:'noticeList', params:{facultyId:this.$route.params.facultyId,type:'status',value:'advisor'}}">For Advisors</RouterLink></li>               
                                    <li ><RouterLink class="hover:bg-gray-300 focus:bg-white focus:text-purple-900 hover:text-black text-white" :to="{name:'noticeList', params:{facultyId:this.$route.params.facultyId,type:'status',value:'student'}}">For Students</RouterLink></li>   
                                    <li ><RouterLink class="hover:bg-gray-300 focus:bg-white focus:text-purple-900 hover:text-black text-white" :to="{name:'addNotice', params:{facultyId:this.$route.params.facultyId}}">Add Notice</RouterLink></li>               
            
                                </ul>        
                                
                            </li>
                                              
    
                            
                                
                            <li class="rounded-sm bg-gray-700">
                                
                                <span class="rounded-sm w-full bg-gray-800 flex justify-between hover:bg-white hover:text-black" :class="mainlistStyle"><button @click="Logout()">Log out</button></span>
                               
                            </li>
                        </ul>
                    </div>
                    
                </div>
                
            </div>
            
            <RouterView class="w-full p-4" :key="$route.path"></RouterView>
            
        </div>
       
     
    </template>
    <script>
   
   import axios from "axios";
    export default{
        name:'Faculties',
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
            department:[],
            isDepartment:false,
            isChair:false,
            isStaff:false,
            isStaffChair:false,
            isStaffDepartment:false,
            isStudent:false,
            isStudentDepartment:false,
            isStudentChair:false,
            isProject:false,
            isProjectChair:false,
            isProjectDepartment:false,
            isNotice:false,
            chairs:[],
            cat:'',
            pic:'',
            year:'2',
            id:[],
            profile:[],
            isSeen:true,
            faculty:this.$route.params.facultyId
                
            }
        },
    mounted(){
        let token=localStorage.getItem('token')    
      if(!token){
       this.$router.push({name:'Login'})
    }
    let dat = new Date();
        this.year = dat.getFullYear();
        console.log(this.year)
        console.log(dat)
    axios.get(`http://localhost:5000/chairList/faculty_id/${this.faculty}`)
          .then(response => {
            this.chairs = response.data;
            
         
         console.log(this.stream)
       })
    axios
      .get(`http://localhost:5000/departmentList/${this.faculty}`)
      .then((response) => {
        this.department = response.data
       
        console.log(this.stream)
      })
     axios.get(`http://localhost:5000/facultyList/${this.faculty}`)
     .then(response => {
       this.academic = response.data;
       
       
       console.log(this.stream)
     })
     .catch(error => console.log(error))
     axios.get(`http://localhost:5000/listLength/staff_member/faculty_id/${this.faculty}/position/2`)
           .then(response => {
             this.profile =response.data[1];
             this.pic=this.profile[0].first_name.toUpperCase()
                this.cat=this.pic.slice(0,1)
             
           })
           .catch(error => console.log(error))
        //    this.$router.push({name:'facultyHome',params:{facultyId:this.$route.params.facultyId}})
            },
    
    
       
    methods:{
       
      Logout(){
            localStorage.clear();
            this.$router.push({
          name: "Login"
        
        })},
            
            }

    }
    
    </script>