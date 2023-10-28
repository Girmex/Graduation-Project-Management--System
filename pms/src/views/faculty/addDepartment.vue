<template>
    <div class="font-serif flex flex-col justify-center items-center  ">
        <div class="lg:w-1/2  border border-gray-700 rounded-md bg-white text-black">
      <div class="bg-gray-700 text-xl text-white">Add New Department</div>
      <label v-if="this.isName" class="text-red-500">Please fill the input field correctly</label>
      <div class="field text-left mx-4  ">
        <label class="label py-5">Department Name</label>
        <div class="control">
          <input
            class="input border w-full py-1 rounded-md "
            type="text"
            placeholder="Department Name"
            v-model="departmentName"
          />
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
    name: "addDepartment",
    data() {
      return {
        departmentName: "",
        isName:false
       
      };
    },
    mounted() {
      let token=localStorage.getItem('token')    
      if(!token){
       this.$router.push({name:'Login'})
    }
    },
    methods: {
      // Create New product
      async saveDepartment() {
        if(this.departmentName == ''){
          this.isName=true
        }
        else{
          try {
          await axios.post(`http://localhost:5000/addDepartment/`, {
            department_name: this.departmentName,
            faculty_id:this.$route.params.facultyId
          });
          this.departmentName = "";
          this.departmentHead = "";
         
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