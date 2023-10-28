<template >
    <img src="../../assets/bit.png" alt="" class="h-40px">
    <div class="w-full ">

<div :class="headerStyle" class="flex justify-between ">
   <div><h1 class="text-white  lg:ml-3 mt-2 text-sm" v-for="profile in this.profile" :key="profile.id"><router-link class=" hover:text-orange-200" :to="{ name: 'advisorProfile', params: { id: profile.id } }"> 
        <span class="px-2 py-1  mr-1 rounded-full bg-orange-500 hover:bg-white hover:text-black text-black text-sm">{{ this.cat }}</span>     {{profile.first_name }} {{ profile.second_name }}</router-link> </h1></div> 
  <div class="hidden lg:flex"> Welcome to Advisor Page
  </div> 
  <div class=" pt-2 flex  justify-between">
    <div><button @click="viewNotice(),this.isNotice= false" class="flex  mr-5 text-green-500   hover:text-white ">
        <svg class=" w-8 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
</svg><sub class="text-red-500  text-sm mx-1 " v-if="this.display > 0 && this.isNotice">{{
                    this.display }}</sub></button></div>
    <div><RouterLink class="flex  mr-5 text-green-500   hover:text-white " :to="{name:'advisorChatGroup' ,params:{id:this.advisor}}">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-6  " fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
</svg> </RouterLink></div>
                    <!-- <span>
<svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-6  " fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
</svg></span> -->

</div>
</div>
</div>
    <div class="flex">
    <div class=" font-serif lg:flex flex-col hidden  h-screen p-3 bg-gray-900 shadow w-60 text-gray-50">
                <div class="space-y-3">
                    <div class="flex items-center">
                        <h2 class="text-xl font-bold">Advisor Dashboard</h2>
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
                                
                                <RouterLink :to="{name:'advisorHome',params:{id:this.advisor}}"><span :class="mainlistStyle">Home<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-6 ml-1" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
</svg>
</span></RouterLink>
                             
                            </li>
                        
                            <li class="rounded-sm">
                                
                                <RouterLink :to="{name:'advisorStudent' ,params:{id:this.advisor}}"><span :class="mainlistStyle">Current Students</span></RouterLink>
                               
                            </li>
                            <li class="rounded-sm">
                                
              
                                <RouterLink :to="{name:'advisorCurrentProjectList' ,params:{id:this.advisor}}"><span :class="mainlistStyle">Current Project</span></RouterLink>
                                
                            </li>
                            <li class="rounded-sm">
                                
              
                                <RouterLink :to="{name:'advisorProject' ,params:{id:this.advisor}}"><span :class="mainlistStyle">Department Project</span></RouterLink>
                                
                            </li>
                            
                            <li class="rounded-sm">
                                               
                                <RouterLink :to="{name:'advisorChatGroup' ,params:{id:this.advisor}}"><span :class="mainlistStyle">Chat
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} class="w-5 h-6 ml-1 " stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
</svg></span></RouterLink>
                                
                            </li>
                            <li class="rounded-sm">
                                               
                                <li><button :class="mainlistStyle" @click="viewNotice">Notice <svg xmlns="http://www.w3.org/2000/svg" fill="none" class="w-5 ml-1 h-6" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
</svg><sub class="text-red-600 text-sm  " v-if="this.display > 0">{{this.display }}</sub>


</button></li>   </li>    <li class="rounded-sm"><span :class="mainlistStyle"><button @click="Logout()">Log
            out</button></span>

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
        name:'advisor',
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
            notice:'',
            isNotice:true,
            notices:[],
            display:'',
            lastId:'',
            stream:[],
            id:[],
            profile:[],
            isSeen:true,
            advisor:this.$route.params.id
                
            }
        },
    mounted(){
        let token=localStorage.getItem('token')    
      if(!token){
       this.$router.push({name:'Login'})
    }
        let faculty=localStorage.getItem('faculty_id')
        let id = localStorage.getItem('id')
        
        axios.get(`http://localhost:5000/AppNotice/advisor/${id}/${faculty}`,{
              status:'advisor'
           })
           .then(response => {
            this.notice = response.data.length
                this.notices = response.data
                console.log(this.notice)
                if (this.notice > 1) {
                    this.lastId = this.notices[this.notice - 1].id;
                    this.display = this.notice - 1;
                }
                else if (this.notice == 1) {
                    this.lastId = this.notices[this.notice - 1].id;
                    this.display = this.notice - 1;
                }
                else {
                    this.lastId = null;
                    this.display = 0
                }
               
                console.log(this.lastId)
                console.log(this.notice)
           })
            .catch(error => console.log(error))
     axios.get(`http://localhost:5000/listLength/staff_member/id/${this.advisor}/position/5`)
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
        
        })},
        viewNotice() {
            let id = localStorage.getItem('id')
            console.log(this.lastId)
            axios.post(`http://localhost:5000/AppLastNotice/${id}`, {
                lastNoticeId: this.lastId
            })

            this.$router.push({ name: 'advisorNotice', params: { id: id } })

        }
            }

    }
    
    </script>