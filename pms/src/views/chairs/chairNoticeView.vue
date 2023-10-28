<template>
    <div class="font-serif flex flex-col my-6 items-center mx-3 ">
        <div v-for="notice in notices" :key="notice.id" class="w-2/3 h-full border border-gray-700 rounded-md bg-white text-black">
      <div class="bg-gray-700 text-xl text-white">Notice</div>
      
      <div class="flex justify-end  field text-left mr-4 mt-3 ">
        <div class="mr-2"><label class="label py-5"><b>Date:</b></label></div>
        <div class="control">
          {{ formatDate(notice.date) }}
        </div>
      </div>
      
      <div class="flex field text-left mr-4 my-3">
        <div class="ml-4"><label class="label py-4"><b class="pr-2">For:</b></label></div>
        <div class="control" v-if="notice.status=='all'">
           All
        </div>
        <div class="field mx-1" v-for="faculty in faculties" :key="faculty.faculty_id">              
         <span >{{ faculty.faculty_name }}</span>         
      </div>
      <div class="control" v-if="notice.status!=='all'">
           {{ notice.status }}
        </div>
        </div>
    
        <div class="field text-center mx-4  ">              
         <b >Title:</b> <span class="border-b border-black">{{ notice.title }}  </span>       
      </div>
      <div class="h-1/2 field text-left ml-4 ">
        
        <div class="control h-full mr-4">
          {{ notice.body }}
        </div>
        </div>
    
      
    </div>
    </div>
  </template>
    
  <script>
  // import axios
  import axios from "axios";
    
  export default {
    name: "studentNoticeView",
    data() {
      return {
        
        notices:[],
        faculties:[]
        
      };
    },
   
    async mounted(){
      let token=localStorage.getItem('token')
      if(!token){
       this.$router.push({name:'Login'})
    }
        let faculty= localStorage.getItem('faculty_id');
        console.log(faculty);
       await axios.get(`http://localhost:5000/notice_detail/${this.$route.params.notice}/${faculty}/chair/all`)
          .then(response => {
            
             this.notices = response.data[0];
         
         console.log(this.notices)
       })
       await axios.get(`http://localhost:5000/listLength/faculties/faculty_id/${faculty}/''/''`)
          .then(response => {
            this.faculties = response.data[0];
          })
    },
    methods: {
        formatDate(date){
    const options={year:'numeric',month:'long',day:'numeric'};
    return new Date(date).toLocaleString('en-US',options)
      },
    }
  };
  </script>
    
  <style>
  </style>