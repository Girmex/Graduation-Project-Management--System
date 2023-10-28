<template>
    <div class="font-serif flex flex-col justify-center items-center  ">
        <div class="lg:w-1/2 border border-gray-700 rounded-md bg-white text-black">
      <div class="bg-gray-700 text-xl text-white">Add New Chair</div>
      <label v-if="this.isName" class="text-red-500">Please fill the input field correctly</label>

      <div class="field text-left mx-4  ">
        <label class="label py-5">Chair Name</label>
        <div class="control">
          <input
            class="input border w-full py-1  rounded-md "
            type="text"
            placeholder="Chair Name"
            v-model="chairName"
          />
        </div>
      </div>
    
      <div class="field text-left mx-4 ">
        <label class="label py-4">Select Department</label>
        <div class="control">
            <select v-model="department" name="dropdown" class="w-full border rounded py-1">
            <option v-for="item in academic" :key="item.department_id" :value="item.department_id">{{item.department_name}}</option>
            
          </select>
        </div>
        </div>
      <div class="control">
        <button class="button is-success w-1/2 h-8 my-3 border rounded-md bg-blue-800 text-white" @click="saveChair()">SAVE</button>
      </div>
    </div>
    </div>
  </template>
    
  <script>
  // import axios
  import axios from "axios";
    
  export default {
    name: "addChair",
    data() {
      return {
        chairName: "",
        department: "",
        academic:[],
        isName:false,
      };
    },
    mounted() {
      let token=localStorage.getItem('token')    
      if(!token){
       this.$router.push({name:'Login'})
    }
        axios
      .get(`http://localhost:5000/departmentList/${this.$route.params.facultyId}`)
      .then((response) => {
        this.academic = response.data
        

        console.log(this.stream)
      })
    },
    methods: {
      // Create New Chair
      async saveChair() {
      if(this.department =='' || this.chairName==''){
        this.isName=true
      }
      else{
        try {
          await axios.post(`http://localhost:5000/addChair`, {
            name: this.chairName,
            department_id: this.department,
            faculty_id:this.$route.params.facultyId
          });
          this.chairName = "";
          this.department = "";
      
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