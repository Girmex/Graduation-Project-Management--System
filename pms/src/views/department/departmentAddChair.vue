<template>
    <div class="font-serif flex flex-col justify-center items-center  ">
        <div class="w-1/2 border border-gray-700 rounded-md bg-white text-black">
      <div class="bg-gray-700 text-xl text-white">Add New Chair</div>
      <div class="field text-left mx-4  ">
        <label class="label py-5">Chair Name</label>
        <div class="control">
          <input
            class="input border w-full py-1 rounded-md "
            type="text"
            placeholder="Chair Name"
            v-model="chairName"
          />
        </div>
        <label v-if="this.isName" class="text-red-500">Please fill the input field correctly</label>
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
    name: "departmentAddChair",
    data() {
      return {
        chairName: "",
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
      // Create New Chair
      async saveChair() {
        let faculty_id=localStorage.getItem('faculty_id')
        console.log(faculty_id);
        if(this.chairName==''){
            this.isName=true
        }
        else{
          try {
          await axios.post(`http://localhost:5000/addChair`, {
            name: this.chairName,
            department_id: this.$route.params.departmentId,
            faculty_id:faculty_id
          });
          this.name = "";
          this.department = "";
          this.$router.push({name:'departmentHome',params:{departmentId:this.$route.params.departmentId}});
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