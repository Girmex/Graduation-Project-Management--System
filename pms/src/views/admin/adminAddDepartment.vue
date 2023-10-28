<template>
    <div class="font-serif my-3 flex flex-col justify-center items-center  ">
        <div class="w-1/2 border border-gray-700 rounded-md bg-white text-black">
      <div class="bg-gray-700 text-xl text-white">Add New Department</div>
      <label class="text-red-500" v-if="isEnable">Please fill the form correctly</label>
      <div class="field text-left  mx-4  ">
        <label class="label py-5">Department Name</label>
        <div class="control">
          <input
            class="input border h-9 w-full rounded-md "
            type="text"
            placeholder="Department Name"
            v-model="departmentName"
          />
        </div>
      </div>
    
      <div class="field text-left  mx-4 ">
        <label class="label py-4">Select Faculty</label>
        <div class="control">
          <select class="w-full border rounded py-1" v-model="faculty">
            <option v-for="faculty in academic" :key="faculty.faculty_id" :value="faculty.faculty_id">{{faculty.faculty_name}}</option>
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
    name: "adminAddDepartment",
    data() {
      return {
        departmentName: "",
        faculty:'',
        academic:[],
        isEnable:false
      };
    },
    mounted() {
      let token=localStorage.getItem('token')    
      if(!token){
       this.$router.push({name:'Login'})
    }
    axios
        .get(`http://localhost:5000/adminFacultyList`)
        .then((response) => {
          this.academic = response.data
          console.log(this.stream)
        })
    },
    methods: {
      // Create New product
      async saveDepartment() {
        if(this.departmentName=='' || this.faculty_id==''){
          this.isEnable=true
        }
        else{
          try {
          await axios.post(`http://localhost:5000/addDepartment/`, {
            department_name: this.departmentName,
            faculty_id:this.faculty
          });
          this.departmentName = "";
          this.faculty = "";
          this.$router.push("/adminAllDepartment");
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