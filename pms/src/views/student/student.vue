<template >
    <img src="../../assets/bit.png" alt="" class="h-40px">
    <div class="w-full ">

<div :class="headerStyle" class="flex justify-between ">
   <div><h1 class="text-white  lg:ml-3 mt-2 text-sm" v-for="profile in this.profile" :key="profile.id"><router-link class=" hover:text-orange-200" :to="{ name: 'studentProfile', params: { id: profile.id, group: this.group } }"> 
        <span class="px-2 py-1  mr-1 rounded-full bg-orange-500 hover:bg-white hover:text-black text-black text-sm">{{ this.cat }}</span>     {{profile.first_name }} {{ profile.second_name }}</router-link> </h1></div> 
  <div class="hidden lg:flex"> Welcome to Student Page
  </div> 
  <div class=" pt-2 flex  justify-between">
    <div><button @click="viewNotice(),this.isNotice= false" class="flex  mr-5 text-green-500   hover:text-white ">
        <svg class=" w-8 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
</svg><sub class="text-red-500  text-sm mx-1 " v-if="this.display > 0 && this.isNotice">{{
                    this.display }}</sub></button></div>
    <div><button class="flex  mr-5 text-green-500   hover:text-white " @click="viewChat(),isChat=false">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-6  " fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
</svg> 
        <sub class="text-red-600 text-sm mx-1 "
                                    v-if="this.chatDisplay > 0 && this.isChat">{{
                                        this.chatDisplay }}</sub></button></div>
             

</div>
</div>
</div>
    <div class="flex">
        <div class=" font-serif hidden lg:flex flex-col h-screen p-3 bg-gray-900 shadow w-60 text-gray-50">
            <div class="space-y-3">
                <div class="flex items-center">
                    <h2 class="text-xl font-bold">Student Dashboard</h2>
                </div>
                <div class="relative">
                    <span class="absolute inset-y-0 left-0 flex items-center py-4">

                    </span>
                    <input type="search" name="Search" placeholder="Search..."
                        class="w-full py-2 pl-10 text-sm rounded-md text-gray-900 focus:outline-none" />
                </div>
                <div class="flex-1">
                    <ul class="pt-2 pb-4 space-y-1 text-sm">
                        <li class="rounded-sm">

                            <RouterLink :to="{ name: 'studentHome', params: { id: this.$route.params.id, group: this.group } }"><span
                                    :class="mainlistStyle">Home</span>
                            </RouterLink>

                        </li>

                        <li class="rounded-sm">

                            <RouterLink
                                :to="{ name: 'studentGroupMembers', params: { id: this.$route.params.id, group: this.group } }">
                                <span :class="mainlistStyle">Group Members</span>
                            </RouterLink>

                        </li>
                        <li class="rounded-sm">

                            <RouterLink :to="{ name: 'studentAdvisor',  params: { id: this.$route.params.id, group: this.group }  }"><span
                                    :class="mainlistStyle">Advisor</span></RouterLink>

                        </li>
                        <li class="rounded-sm">


                            <RouterLink
                                :to="{ name: 'studentProject', params: { id: this.$route.params.id, group: this.group } }">
                                <span :class="mainlistStyle">My Project</span>
                            </RouterLink>

                        </li>
                        <li class="rounded-sm">


                        <RouterLink
                            :to="{ name: 'studentDepartmentProject', params: { id: this.$route.params.id, group: this.group } }">
                            <span :class="mainlistStyle">Department Project</span>
                        </RouterLink>
                        
                        </li>
                       
                        <li class="rounded-sm">


                             <span :class="mainlistStyle"><button @click="Logout()">Log out</button></span>

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
export default {
    name: 'student',
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
            profile: [],
            lastId: '',
            display: '',
            notice: '',
            notices: [],
            numberOfMessages: '',
            Messages: [],
            pic:'',
            cat:'',
            id:'1',
            group:'1',
            isNotice:true,
            isChat:true,
            lastChatId: '',
            chatDisplay: '',
            isSeen: true,
            student: this.$route.params.id

        }
    },
    mounted() {
        let token = localStorage.getItem('token')
        if (!token) {
            this.$router.push({ name: 'Login' })
        }
        else{
        this.id=localStorage.getItem('id');
        let id = localStorage.getItem('id')
        this.group=localStorage.getItem('group_id');
        let groupId = localStorage.getItem('group_id')
        let faculty = localStorage.getItem('faculty_id')
        
        axios.get(`http://localhost:5000/AppChat/${id}/${groupId}`, {

        })
            .then(response => {
                this.numberOfMessages = response.data.length
                this.Messages = response.data
                console.log(this.numberOfMessages)
                if (this.numberOfMessages > 1) {
                    this.lastChatId = this.Messages[this.numberOfMessages - 1].id
                    this.chatDisplay = this.numberOfMessages - 1
                }
                else if (this.numberOfMessages == 1) {
                    this.lastChatId = this.Messages[this.numberOfMessages - 1].id
                    this.chatDisplay = this.numberOfMessages - 1
                }
                else {
                    this.lastChatId = null
                    this.chatDisplay = 0
                }
                
                console.log(this.lastChatId)
                console.log(this.numberOfMessages)
            })
            .catch(error => console.log(error))
        axios.get(`http://localhost:5000/AppNotice/department/${id}/${faculty}`, {
            status: 'department'
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
        axios.get(`http://localhost:5000/listLength/students/id/${id}/position/6`)
            .then(response => {
                this.profile = response.data[1];
                this.pic=this.profile[0].first_name.toUpperCase()
                this.cat=this.pic.slice(0,1)
            })
            .catch(error => console.log(error))
        }
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

            this.$router.push({ name: 'studentNotice', params: { id: this.$route.params.id, group: this.group } })

        },
        viewChat() {
            let id = localStorage.getItem('id')
            console.log(this.lastChatId)
            axios.post(`http://localhost:5000/AppLastChat/${id}`, {
                lastMessageId: this.lastChatId
            })

            this.$router.push({ name: 'ChatDetail', params: { id: this.$route.params.id, group: this.group } })

        },
       
    }

}

</script>