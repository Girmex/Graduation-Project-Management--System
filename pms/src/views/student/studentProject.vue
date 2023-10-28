<template>
  <div class=" font-serif h-full w-full text-black" v-for="item in details" :key="item.id">
    <div class="shadow-md shadow-slate-300  m-7">
        <div class="flex justify-center shadow-md shadow-slate-300  ">
         
          <div class="p-2"><span class="font-bold">Project Title: </span>{{ item.title }}</div>
        </div>
       
      </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:mx-7 gap-2 h-1/3 lg:h-1/6 font-serif">
     
      <div class="flex shadow-md shadow-slate-300 ">
        
        <div class="p-2"><span class="text-black  "><span class="font-bold ">Advisor Name</span><br>{{ item.first_name }} {{ item.second_name }} {{ item.last_name }}</span></div>
      </div>
      <div class="flex shadow-md shadow-slate-300 ">
        <div class="p-2"><span class="text-black "><span class="font-bold ">Academic Year</span><br>{{ item.date }}</span></div>
      </div>
      <div class="flex shadow-md shadow-slate-300 ">
        <div class="p-2"><span class="text-black "><span class="font-bold ">Project Status</span><br>{{ item.status }}</span></div>
      </div>
      
    </div>
    <div class="shadow-md shadow-slate-300  m-7">
        <div class="flex justify-center shadow-md shadow-slate-300  ">
          <div class="p-2 flex justify-between "><span class="text-black w-1/2 font-bold">Abstract</span><span class="w-1/2 flex justify-end" v-if="(item.description == null || item.description == '') && item.proposal_url != null "><router-link class="px-2 my-1  text-white rounded bg-blue-500 hover:bg-blue-900"  :to="{name:'studentProjectAbstract',params:{id:this.$route.params.id,description:item.id}}">Attach Description</router-link></span> </div>
        </div>
        <div class="mt-4">
         {{ item.description }}
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 lg:mx-7 gap-2 h-1/3 lg:h-1/6 font-serif">
     
        <div class="shadow-md shadow-slate-300  ">
        <div class="flex justify-center shadow-md shadow-slate-300  ">
          <div class="p-2"><span class="text-black font-bold">Students: {{ this.student }}</span></div>
        </div>
        <div class="mt-4">
          <ul class="grid grid-cols-1">
            <li class="text-left mb-1 mx-2 px-3 rounded border border-gray-200 flex justify-between" v-for="group in project" :key="group.id">
              <span>{{ group.first_name }} {{ group.second_name }} {{ group.last_name }}</span>
              
            </li>
          </ul>
        </div>
      </div>
      <div class="shadow-md shadow-slate-300  ">
        <div class="flex justify-center shadow-md shadow-slate-300  ">
          <div class="p-2"><span class="text-black font-bold">Project Files</span></div>
        </div>
        <div class="mt-4">
          <ul class="grid grid-cols-1">
            <li class="text-left mb-1 mx-2 px-3 rounded border border-gray-200 flex justify-between">
              <span>Proposal Document:</span> <span>
                <RouterLink v-if="(item.proposal_url == null || item.proposal_url == '') && (item.description == null || item.description == '') && (item.url== null || item.url =='')"  class="px-2 mr-2 my-1 text-white rounded bg-blue-500 hover:bg-blue-900" :to="{name:'studentFileUpload',params:{id:item.id}}">Attach</RouterLink>
                <RouterLink v-if="(item.proposal_url != null && item.proposal_url != '') && (item.description == null || item.description == '') && (item.url== null || item.url =='')" class="px-2  mr-2 my-1 text-white rounded bg-blue-500 hover:bg-blue-900" :to="{name:'studentFileUpload',params:{id:item.id}}">Reset</RouterLink>
                <a v-if="item.proposal_url != null && item.proposal_url != ''" class="px-2 my-1 text-white rounded bg-blue-500 hover:bg-blue-900" :href="item.proposal_url">Open</a></span>            
            </li>
            <li class="text-left mb-1 mx-2 px-3 rounded border border-gray-200 flex justify-between">
              <span>Final Project Document:</span> <span>
                <a v-if="(item.url != null  && item.url !='')" class="px-2 my-1  text-white rounded bg-blue-500 hover:bg-blue-900" :href="item.url">Open</a></span>            
            </li>
          </ul>
        </div>
      </div>
     
   </div>
   </div>
    </template>
    <script>
    
    import axios from 'axios';
    
    export default {
      name: 'studentProject',
      components: {
       
      },
    
      data() {
        return {
          activeTab: 'ElectricalEng',
          details: [],
          project:[],
          group:'1',
          student:'',

    
    
        }
      },
      methods: {
        formatDate(date){
    const options={year:'numeric',month:'long',day:'numeric'};
    return new Date(date).toLocaleString('en-US',options)
      },
      },
      async mounted() {  
         this.group= localStorage.getItem('group_id')      
        await axios.get(`http://localhost:5000/project_detail/${this.group}`)
          .then(response => {
            
            this.details = response.data;
            
          })
          await axios.get(`http://localhost:5000/listLength/students/group_id/${this.group}/''/''`)
          .then(response => {
            this.project = response.data[0];
            this.student=response.data[0].length

          })
      }
    }
    </script>