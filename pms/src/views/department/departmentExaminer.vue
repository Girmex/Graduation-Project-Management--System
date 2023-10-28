<template>
    <div class="font-serif mx-3 flex my-2 flex-col justify-center lg:w-2/3 w-full items-center  ">
        <div class="lg:w-3/4 w-full  border border-gray-700 rounded-md bg-white text-black">
      <div class="bg-gray-700 text-xl text-white">Final Year Project Examiner Form</div>
      <label v-if="this.empty" class="text-red-500">Please select the group and advisor</label>
      <div class="field text-left lg:flex ml-4  my-2 ">
        <label class="label w-1/2 ">Number Of Examiner</label>
        <span class="flex mr-3 w-1/2 justify-between">
            <button class="px-1 focus:bg-black rounded bg-blue-900 text-white" @click="examiner(5)">5</button>
            <button class="px-1 focus:bg-black rounded bg-blue-900 text-white" @click="examiner(6)">6</button>
            <button class="px-1 focus:bg-black rounded bg-blue-900 text-white" @click="examiner(7)">7</button>
            <button class="px-1 focus:bg-black rounded bg-blue-900 text-white" @click="examiner(8)">8</button>
        </span>
      </div><div class="lg:flex w-full">
      <div class="w-full lg:w-1/2">
      <div class="field text-left mx-4  ">
        <label class="label py-5">Group</label>
        <div class="control">
          <input type="number" placeholder="Enter Group number" class="p-1 border rounded-md w-full" v-model="group">
          
        </div>
        <label v-if="this.isId" class="text-red-500">there is a staff Member with id {{ this.group }}</label>

      </div>
      <div class="field text-left mx-4  ">
        <label class="label py-5">Advisor 1</label>
        <div class="control">
          <select v-model="advisor1" class="w-full border py-1 rounded-md">
           
           <option v-for="advisor in advisor" :key="advisor.id" :value="advisor.id" >
             {{ advisor.first_name }} {{ advisor.second_name }}
           </option>
         </select>
        </div>
      </div>
      <div class="field text-left mx-4  ">
        <label class="label py-5">Advisor 2</label>
        <div class="control">
          <select v-model="advisor2" class="w-full border py-1 rounded-md">
           
           <option v-for="advisor in advisor" :key="advisor.id" :value="advisor.id" >
            {{ advisor.first_name }} {{ advisor.second_name }}
           </option>
         </select>
        </div>
      </div>
      <div class="field text-left mx-4  ">
        <label class="label py-5">Advisor 3</label>
        <div class="control">
          <select v-model="advisor3" class="w-full border py-1 rounded-md">
           
           <option v-for="advisor in advisor" :key="advisor.id" :value="advisor.id" >
            {{ advisor.first_name }} {{ advisor.second_name }}
           </option>
         </select>
        </div>
      </div>
      <div class="field text-left mx-4  ">
        <label class="label py-5">Advisor 4</label>
        <div class="control">
          <select v-model="advisor4" class="w-full border py-1 rounded-md">
           
           <option v-for="advisor in advisor" :key="advisor.id" :value="advisor.id" >
            {{ advisor.first_name }} {{ advisor.second_name }}
           </option>
         </select>
        </div>
      </div>
    </div>
      <div class="w-full lg:w-1/2 mr-3">
      <div v-if="this.numberOfExaminer >= 5"  class="field text-left mx-4  ">
        <label class="label py-5">Advisor 5</label>
        <div class="control">
          <select v-model="advisor5" class="w-full border py-1 rounded-md">
           
           <option v-for="advisor in advisor" :key="advisor.id" :value="advisor.id" >
            {{ advisor.first_name }} {{ advisor.second_name }}
           </option>
         </select>
        </div>
      </div>
      <div v-if="this.numberOfExaminer >= 6"  class="field text-left mx-4  ">
        <label class="label py-5">Advisor 6</label>
        <div class="control">
          <select v-model="advisor6" class="w-full border py-1 rounded-md">
           
           <option v-for="advisor in advisor" :key="advisor.id" :value="advisor.id" >
            {{ advisor.first_name }} {{ advisor.second_name }}
           </option>
         </select>
        </div>
      </div>
      <div v-if="this.numberOfExaminer >= 7"  class="field text-left mx-4  ">
        <label class="label py-5">Advisor 7</label>
        <div class="control">
          <select v-model="advisor7" class="w-full border py-1 rounded-md">
           
           <option v-for="advisor in advisor" :key="advisor.id" :value="advisor.id" >
            {{ advisor.first_name }} {{ advisor.second_name }}
           </option>
         </select>
        </div>
      </div>
      <div v-if="this.numberOfExaminer == 8" class="field text-left mx-4  ">
        <label class="label py-5">Advisor 8</label>
        <div class="control">
          <select v-model="advisor8" class="w-full border py-1 rounded-md" >
           
           <option v-for="advisor in advisor" :key="advisor.id" :value="advisor.id" >
            {{ advisor.first_name }} {{ advisor.second_name }}
           </option>
         </select>
        </div>
      </div>
    </div>
  </div>
    
      <div class="control">
        <button class="button is-success w-1/2 h-8 my-3 border rounded-md bg-blue-800 text-white" @click="saveExaminer">SAVE</button>
      </div>
    </div>
    </div>
  </template>
    
  <script>
  // import axios
  import axios from "axios";
    
  export default {
    name: "departmentExaminer",
    data() {
      return {
        
        empty:false,
        group:'',
        numberOfExaminer:'',
        advisor:[],
        advisor1:'',
        advisor2:'',
        advisor3:'',
        advisor4:'',
        advisor5:'',
        advisor6:'',
        advisor7:'',
        advisor8:'',
        isId:false
      };
    },
    mounted() {

      let token=localStorage.getItem('token')
      if(!token){
       this.$router.push({name:'Login'})
    }
  
       axios.get(`http://localhost:5000/examiner/department_id/${this.$route.params.departmentId}`)
          .then(response => {
            
             this.advisor = response.data;
         
         console.log(this.advisor)
       })
    },
    methods: {
      // Create New product
      async saveExaminer() {
        if(this.group=='' || this.advisor1=='' || this.advisor2=='' || this.advisor3==''){
          this.empty=true
        }
        else{
          try {
          console.log(this.advisor1)
        let result = await axios.put(`http://localhost:5000/examinerForm/department_id/${this.$route.params.departmentId}`, {
            group: this.group,
            advisor1: this.advisor1,
            advisor2:this.advisor2,
            advisor3:this.advisor3,
            advisor4:this.advisor4,
            advisor5:this.advisor5,
            advisor6:this.advisor6,
            advisor7:this.advisor7,
            advisor8:this.advisor8,

            
          });
          console.log(result.data.msg)
          if( result.data.msg== true){
     
     alert("signup done")
     console.log(result.data.msg)
     group= '',
            advisor1= '',
            advisor2='',
            advisor3='',
            advisor4='',
            advisor5='',
            advisor6='',
            advisor7='',
            advisor8=''
     
     }
   else if(result.data.msg==false){
     this.isId=true
   }
          
         
        } catch (err) {
          console.log(err);
        }
        }
        
      },
      examiner(id){
        this.numberOfExaminer=id;
        console.log(this.numberOfExaminer)
      }
    },
  };
  </script>
    
  <style>
  </style>