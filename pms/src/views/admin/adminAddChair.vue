<template>
    <div class="font-serif my-3 flex flex-col justify-center items-center  ">
        <div class="w-1/2 border border-gray-700 rounded-md bg-white text-black">
      <div class="bg-gray-700 text-xl text-white">Add New Chair</div>
      <label v-if="isEnable" class="text-red-500">Please fill all inputs correctly</label>
      <div class="field text-left mx-4  ">
        <label class="label py-5">Chair Name</label>
        <div class="control">
          <input
            class="input border h-9 w-full rounded-md "
            type="text"
            placeholder="Chair Name"
            v-model="chairName"
          />
        </div>
      </div>
      <div class="field text-left my-2 mx-4 ">
        <label class="label py-4">Select Faculty</label>
        <div class="control">
            <select class="w-full rounded border py-1 " v-model="faculty" name="dropdown">
            <option v-for="item in Faculties" :key="item.faculty_id" :value="item.faculty_id">{{item.faculty_name}}</option>
            
          </select>
        </div>
        </div>
    
      <div class="field text-left mx-4 ">
        <label class="label py-4">Select Department</label>
        <div class="control">
            <select class="w-full rounded border py-1 " v-model="department" name="dropdown">
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
    name: "adminAddChair",
    data() {
      return {
        chairName: "",
        department: "",
        academic:[],
        Faculties:[],
        faculty:'',
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
        this.Faculties = response.data
        

        console.log(this.stream)
      })
      axios
      .get(`http://localhost:5000/adminDepartmentList`)
      .then((response) => {
        this.academic = response.data
        

        console.log(this.stream)
      })
    },
    methods: {
      // Create New Chair
      async saveChair() {
        if(this.chairName=='' || this.department=='' ||this.faculty==''){
                this.isEnable=true
       }
       else{
        try {
          await axios.post(`http://localhost:5000/addChair`, {
            name: this.chairName,
            department_id: this.department,
            faculty_id:this.faculty
          });
          this.name = "";
          this.department = "";
          this.faculty="";
          this.$router.push({name:'adminChairList'});
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