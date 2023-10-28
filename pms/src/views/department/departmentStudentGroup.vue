<template>
    <div class="font-serif mx-3 my-4 flex  flex-col justify-center lg:ml-40   ">
        <div class="lg:w-1/2 border border-gray-700 rounded-md bg-white text-black">
      <div class="bg-gray-700 text-xl text-white">Final Year Project Group Form</div>
      <label v-if="this.empty" class="text-red-500">Please select the title and student</label>
      <div class="field text-left mx-4  ">
        <label class="label py-5">Project Title</label>
        <div class="control">
          <select v-model="title" class="w-full border rounded py-1">
           
            <option v-for="title in titles" :key="title.id" :value="title.id" >
              {{ title.title }}
            </option>
          </select>
          
        </div>
      </div>
      <div class="field text-left mx-4  ">
        <label class="label py-5">Student 1</label>
        <div class="control">
          <select v-model="student1"  class="w-full border rounded py-1">
           
           <option v-for="advisor in student" :key="advisor.id" :value="advisor.fullName" >
             {{ advisor.fullName }}
           </option>
         </select>
        </div>
      </div>
      <div class="field text-left mx-4  ">
        <label class="label py-5">Student 2</label>
        <div class="control">
          <select v-model="student2"  class="w-full border rounded py-1">
           
           <option v-for="advisor in student" :key="advisor.id" :value="advisor.fullName" >
            {{ advisor.fullName }}
           </option>
         </select>
        </div>
      </div>
      <div class="field text-left mx-4  ">
        <label class="label py-5">Student 3</label>
        <div class="control">
          <select v-model="student3"  class="w-full border rounded py-1">
           
           <option v-for="advisor in student" :key="advisor.id" :value="advisor.fullName" >
            {{ advisor.fullName }} 
           </option>
         </select>
        </div>
      </div>
      <div class="field text-left mx-4  ">
        <label class="label py-5">Student 4</label>
        <div class="control">
          <select v-model="student4"  class="w-full border rounded py-1">
           
           <option v-for="advisor in student" :key="advisor.id" :value="advisor.fullName" >
            {{ advisor.fullName }} 
           </option>
         </select>
        </div>
      </div>
        
    
      <div class="control">
        <button class="button is-success w-1/2 h-8 my-3 border rounded-md bg-blue-800 text-white" @click="saveDepartment">SAVE</button>
      </div>
    </div>
    </div>
  </template>
    
  <script>
  // import axios
  import axios from "axios";
    
  export default {
    name: "departmentStudentGroup",
    data() {
      return {
        title: "",
        empty:false,
        titles:[],
        student:[],
        student1:'',
        student2:'',
        student3:'',
        student4:'',
      };
    },
    mounted() {
      let token=localStorage.getItem('token')
      if(!token){
       this.$router.push({name:'Login'})
    }
      axios.get(`http://localhost:5000/listLength/project/department_id/${this.$route.params.departmentId}/status/Empty`)
          .then(response => {
            
             this.titles = response.data[1];
         
         console.log(this.advisors)
       })
       axios.get(`http://localhost:5000/ListLength/department_id/${this.$route.params.departmentId}`)
          .then(response => {
            
             this.student = response.data;
         
         console.log(this.student)
       })
    },
    methods: {
      // Create New product
      async saveDepartment() {
        if(this.title=='' || this.student1=='' || this.student2=='' || this.student3==''){
          this.empty=true
        }
        else{
          try {
          console.log(this.student1)
          await axios.put(`http://localhost:5000/updateStudentGroup`, {
            title: this.title,
            id1: this.student1,
            id2:this.student2,
            id3:this.student3,
            id4:this.student4,
            
          });
          
          
          this.$router.push({name:'departmentHome',params:{departmentId:this.$route.params.departmentId}})
        } catch (err) {
          console.log(err);
        }
        }
        
      },
    },
  };
  </script>
    
  <style>
  </style>