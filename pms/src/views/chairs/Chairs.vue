<template >
    <img src="../../assets/bit.png" alt="" class="h-40px">
    <div class="w-full ">

<div :class="headerStyle" class="flex justify-between ">
   <div><h1 class="text-white  lg:ml-3 mt-2 text-sm" v-for="profile in this.profile" :key="profile.id"><router-link class=" hover:text-orange-200" :to="{ name: 'chairProfile', params: { id: profile.id, chairId: this.$route.params.chairId } }"> 
        <span class="px-2 py-1  mr-1 rounded-full bg-orange-500 hover:bg-white hover:text-black text-black text-sm">{{ this.cat }}</span>     {{profile.first_name }} {{ profile.second_name }}</router-link> </h1></div> 
  <div class="text-sm lg:text-2xl"> Welcome to                                  
<span v-for="item in this.academic " :key="item.id " class="ml-2 "> {{ item.name }} Chair</span>
  </div> 
  <div class=" pt-2 flex  justify-between">
    <div><button @click="viewNotice(),this.isNotice= false" class="flex  mr-5 text-green-500   hover:text-white ">
        <svg class=" w-8 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
</svg><sub class="text-red-500  text-sm mx-1 " v-if="this.display > 0 && this.isNotice">{{
                    this.display }}</sub></button></div>
                    <!-- <span>
<svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-6  " fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
</svg></span> -->

</div>
</div>
</div>
    <div class="flex h-screen">
        <div class=" font-serif flex flex-col pt-10 h-full p-3 bg-gray-900 shadow w-1/5 text-gray-50">
            <div class="space-y-3">
                
            
                <div class="flex items-center">
                    <h2 class="text-xl font-bold">Chair Dashboard</h2>
                </div>
                <div class="relative">
                   
                </div>
                <div class="flex-1">
                    <ul class="pt-2 pb-4 space-y-1 text-sm">
                        <li class="rounded-sm">

                            <RouterLink :to="{ name: 'chairHome', params: { chairId: this.$route.params.chairId } }"><span
                                    :class="mainlistStyle">Home</span></RouterLink>

                        </li>

                        <li class="rounded-sm">
                        <li><button @click="this.isStudent = !this.isStudent" :class="mainlistStyle">Students</button>
                            <ul class="text-left" v-if="this.isStudent">
                                <li class="pl-8 py-1">
                                    <RouterLink
                                        class=" hover:bg-gray-300 focus:bg-white focus:text-purple-900 hover:text-black text-white"
                                        :to="{ name: 'chairAllStudents', params: { chairId: this.$route.params.chairId } }">
                                        <span>All Students</span>
                                    </RouterLink>
                                </li>
                                <li class="pl-8 py-1">
                                    <RouterLink
                                        class=" hover:bg-gray-300 focus:bg-white focus:text-purple-900 hover:text-black text-white"
                                        :to="{ name: 'chairStudentList', params: { chairId: this.$route.params.chairId, type: 'year(date)', value: 2022 } }">
                                        Graduated Students</RouterLink>
                                </li>
                                <li class="pl-8 py-1">
                                    <RouterLink
                                        class=" hover:bg-gray-300 focus:bg-white focus:text-purple-900 hover:text-black text-white"
                                        :to="{ name: 'chairStudentList', params: { chairId: this.$route.params.chairId, type: 'year(date)', value: 2023 } }">
                                        Under Graduate Students</RouterLink>
                                </li>
                                <li class="pl-8 py-1">
                                    <RouterLink
                                        class=" hover:bg-gray-300 focus:bg-white focus:text-purple-900 hover:text-black text-white"
                                        :to="{ name: 'addStudent', params: { chairId: this.$route.params.chairId } }">Add
                                        Student
                                    </RouterLink>
                                </li>
                            </ul>
                        </li>


                        </li>
                        <li class="rounded-sm">

                        <li><button @click="this.isStaff = !this.isStaff" :class="mainlistStyle">Staff Members</button>
                            <ul class="text-left " v-if="this.isStaff">
                                <li class="pl-8 py-1">
                                    <RouterLink
                                        class=" hover:bg-gray-300 focus:bg-white focus:text-purple-900 hover:text-black text-white"
                                        :to="{ name: 'chairAllStaffMember', params: { chairId: this.$route.params.chairId } }">
                                        All
                                        Staff Members</RouterLink>
                                </li>
                                <li class="pl-8 py-1">
                                    <RouterLink
                                        class=" hover:bg-gray-300 focus:bg-white focus:text-purple-900 hover:text-black text-white"
                                        :to="{ name: 'chairStaffList', params: { chairId: this.$route.params.chairId, type: 'position', value: 5 } }">
                                        Project Advisor</RouterLink>
                                </li>
                                <li class="pl-8 py-1">
                                    <RouterLink
                                        class=" hover:bg-gray-300 focus:bg-white focus:text-purple-900 hover:text-black text-white"
                                        :to="{ name: 'chairStaffList', params: { chairId: this.$route.params.chairId, type: 'position', value: 7 } }">
                                        other</RouterLink>
                                </li>
                                <li class="pl-8 py-1">
                                    <RouterLink
                                        class=" hover:bg-gray-300 focus:bg-white focus:text-purple-900 hover:text-black text-white"
                                        :to="{ name: 'addStaffMember', params: { chairId: this.$route.params.chairId } }">
                                        Add Staff
                                        Member</RouterLink>
                                </li>
                            </ul>
                        </li>

                        </li>
                        <li class="rounded-sm">


                        <li><button @click="this.isProject = !this.isProject" :class="mainlistStyle">Projects</button>
                            <ul class="text-left " v-if="this.isProject">
                                <li class="pl-8 py-1 ">
                                    <RouterLink
                                        class=" hover:bg-gray-300 focus:bg-white focus:text-purple-900 hover:text-black text-white"
                                        :to="{ name: 'chairAllProject', params: { chairId: this.$route.params.chairId } }">
                                        All
                                        projects</RouterLink>
                                </li>
                                <li class="pl-8 py-1 ">
                                    <RouterLink
                                        class=" hover:bg-gray-300 focus:bg-white focus:text-purple-900 hover:text-black text-white"
                                        :to="{ name: 'chairBestProject', params: { chairId: this.$route.params.chairId } }">
                                        Best Projects</RouterLink>
                                </li>
                                <li class="pl-8 py-1 ">
                                    <RouterLink
                                        class=" hover:bg-gray-300 focus:bg-white focus:text-purple-900 hover:text-black text-white"
                                        :to="{ name: 'chairCompletedProject', params: { chairId: this.$route.params.chairId, type: 'status', value: 'Uploaded' } }">
                                        Uploaded Projects</RouterLink>
                                </li>
                                <li class="pl-8 py-1 ">
                                    <RouterLink
                                        class=" hover:bg-gray-300 focus:bg-white focus:text-purple-900 hover:text-black text-white"
                                        :to="{ name: 'chairCompletedProject', params: { chairId: this.$route.params.chairId, type: 'status', value: 'Completed' } }">
                                        Completed Projects</RouterLink>
                                </li>
                                <li class="pl-8 py-1 ">
                                    <RouterLink
                                        class=" hover:bg-gray-300 focus:bg-white focus:text-purple-900 hover:text-black text-white"
                                        :to="{ name: 'chairCompletedProject', params: { chairId: this.$route.params.chairId, type: 'status', value: 'Repository' } }">
                                        Repository Projects</RouterLink>
                                </li>
                                <li class="pl-8 py-1 ">
                                    <RouterLink
                                        class=" hover:bg-gray-300 focus:bg-white focus:text-purple-900 hover:text-black text-white"
                                        :to="{ name: 'chairCompletedProject', params: { chairId: this.$route.params.chairId, type: 'status !', value: 'Uploaded' } }">
                                        Projects in Progress</RouterLink>
                                </li>
                                <li class="pl-8 py-1 ">
                                    <RouterLink
                                        class=" hover:bg-gray-300 focus:bg-white focus:text-purple-900 hover:text-black text-white"
                                        :to="{ name: 'formGroup', params: { chairId: this.$route.params.chairId } }">Create
                                        New
                                        Project</RouterLink>
                                </li>
                                <li class="pl-8 py-1 ">
                                    <RouterLink
                                        class=" hover:bg-gray-300 focus:bg-white focus:text-purple-900 hover:text-black text-white"
                                        :to="{ name: 'studentGroup', params: { chairId: this.$route.params.chairId } }">Add
                                        Project
                                        Member</RouterLink>
                                </li>

                            </ul>
                        </li>

                        </li>
                        <li class="rounded-sm">


                        <li>
                            <RouterLink :to="{ name: 'chairRepository', params: { chairId: this.$route.params.chairId } }">
                                <span :class="mainlistStyle">Repository</span>
                            </RouterLink>
                        </li>

                        </li>
      
                        <li class="rounded-sm">


                            <span :class="mainlistStyle"><button @click="Logout()">Log
                                        out</button></span>

                        </li>

                        

                    </ul>
                </div>

            </div>

        </div>

        <RouterView class="lg:w-full  font-serif" :key="$route.path"></RouterView>

    </div>
</template>
<script>

import axios from "axios";
export default {
    name: 'Chairs',
    components: {

    },
    data() {
        return {
            mainlistStyle: 'flex items-center p-2 space-x-3 rounded-md',
            isDisable: false,
            activeTab: 'facultyHome',
            headerStyle: 'h-8 text-xl bg-gray-900 text-white font-serif bg-blue-500 ',
            divStyle: 'm-5  border-solid border-2 border-blue-700 rounded-md',
            childStyle: 'grid grid-cols-1 divide-y',
            academic: [],
            stream: [],
            id: [],
            display:'',
            pic:'',
            notices: [],
            notice: '',
            lastId: '',
            cat:'',
            year:'',
            profile: [],
            isNotice:true,
            isSeen: true,
            isStudent: false,
            isStaff: false,
            isProject: false,



        }
    },
    mounted() {
        let token = localStorage.getItem('token')
        let faculty=localStorage.getItem('faculty_id')
        let id = localStorage.getItem('id')
        
       
        if (!token) {
            this.$router.push({ name: 'Login' })
        }
        axios.get(`http://localhost:5000/AppNotice/chair/${id}/${faculty}`,{
              status:'chair'
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
        axios.get(`http://localhost:5000/chairList/id/${this.$route.params.chairId}`)
            .then(response => {
                this.academic = response.data;


                console.log(this.stream)
            })
            .catch(error => console.log(error))
        axios.get(`http://localhost:5000/listLength/staff_member/id/${id}/position/4`)
            .then(response => {
                this.profile = response.data[0];
                this.pic=this.profile[0].first_name.toUpperCase()
                this.cat=this.pic.slice(0,1)
                console.log(this.cat)
            })
            .catch(error => console.log(error))

        //    this.$router.push({name:'chairHome',params:{chairId:this.$route.params.chairId}})
    },



    methods: {
        Logout(){
            localStorage.clear();
            this.$router.push({
          name: "Login"
        
        })},
        viewNotice() {
            let id = localStorage.getItem('id')
            console.log(this.lastId)
            axios.post(`http://localhost:5000/AppLastNotice/${id}`, {
                lastNoticeId: this.lastId
            })

            this.$router.push({ name: 'chairNotice', params: { chairId: this.$route.params.chairId } })

        }
    }

}

</script>