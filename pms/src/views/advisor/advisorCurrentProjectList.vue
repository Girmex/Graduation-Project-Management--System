
<template>
  <div class="font-serif h-full">
 
    <div class="shadow-md shadow-slate-300  m-7">
      <div class="flex justify-center shadow-md shadow-slate-300  ">
        <svg class="w-14 text-red-500 pr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
</svg>
        <div class="p-2"><span class="text-black font-bold">{{ this.numberOfAllProject }}<br>Current Projects</span></div>
      </div>
      <div class="mt-4">
        <ul class="grid grid-cols-1">
          <li class="text-left mb-1 mx-2 lg:px-32 bg-cyan-700 text-white rounded border border-gray-200 flex flex-col lg:flex-row lg:justify-between"><span>Title</span><span>Action</span></li>
          <li class="text-left mb-1 mx-2 px-3 rounded border border-gray-200 flex flex-col lg:flex-row lg:justify-between" v-for="group in allProject" :key="group.id"><span>{{ group.title }}</span>
            <span class=" my-1">

              <router-link  v-if="(group.url == null || group.url=='') && (group.description == null || group.description =='') && (group.proposal_url != null && group.proposal_url != '') " class="py-1 hover:bg-blue-900 mr-2  rounded-sm text-sm px-2 bg-blue-600 text-white" :to="{name:'advisorProjectAbstract',params:{id:this.advisor,description:group.id}}">Attach Description</router-link>
              <router-link  v-if="(group.url == null || group.url=='') && (group.description != null && group.description !=='') && (group.proposal_url != null && group.proposal_url != '') " class="py-1 hover:bg-blue-900  rounded-sm text-sm px-2 bg-blue-600 text-white" :to="{name:'advisorProjectAbstract',params:{id:this.advisor,description:group.id}}">Reset Description</router-link>
              <router-link  v-if="(group.url == null || group.url=='') && (group.description != null && group.description !=='') && (group.proposal_url != null && group.proposal_url != '') " class="py-1 hover:bg-blue-900 ml-2 rounded-sm text-sm px-2 bg-blue-600 text-white" :to="{name:'fileUpload',params:{id:group.id}}">Attach Project</router-link>
              <router-link class="py-1  rounded-sm text-sm px-2 mx-2 bg-blue-600 text-white hover:bg-blue-900 " :to="{name:'advisorProjectDetail',params:{id:this.advisor,group:group.id}}">See More</router-link> </span>
          </li>
          

        </ul>

      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: 'advisorCurrentProject',
  components: {

  },
  data() {

    return {
      advisor:'1',
      chairId:'',
      departmentId:'',
      advisorCurrentProject:[],
      numberOfCurrentProject:'',
      projectChair:'',
      advisorCurrentProject:'',
      examiner:'',
      allProject:[],
      numberOfAllProject:'',
      departmentProject:'',
      departmentName:'',
      student:'',
      examinerProject:[],
      numberOfExaminerProject:'',
      year: '1',
      divStyle: 'm-8 bg-gray-200 border-solid border-2 border-blue-700 rounded-md ',
    }

  },
  async mounted() {
    let token = localStorage.getItem('token')
    if (!token) {
      this.$router.push({ name: 'Login' })
    }
    let dat = new Date();
    this.year = dat.getFullYear();
    console.log(this.year)
    console.log(this.year)

    this.advisor=localStorage.getItem('id')
    this.chairId = localStorage.getItem('chair_id');
    this.departmentId = localStorage.getItem('department_id')


    await axios.get(`http://localhost:5000/listLength/staff_member/id/${this.advisor}/department_id/1`)
      .then(response => {
        let result = response.data[0]
        this.advisorName = result[0].first_name+' '+result[0].second_name+' '+result[0].last_name;
        this.examiner=result[0].group_id
        console.log(result)

        console.log(233, this.advisorName)
      })
    await axios.get(`http://localhost:5000/listLength/allproject/advisor/${this.advisorName}/status !/Uploaded`)
      .then(response => {
        this.allProject = response.data[1];
        this.numberOfAllProject= response.data[1].length;
        

        console.log(this.allProject)
      })


  }
}
</script>