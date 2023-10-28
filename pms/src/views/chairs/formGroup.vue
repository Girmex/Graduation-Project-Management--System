<template>
    <div class="font-serif flex flex-col m-4  lg:ml-40  lg:mt-20  ">
        <div class="lg:w-1/2 border border-gray-700 rounded-md bg-white text-black">
      <div class="bg-gray-700 text-xl text-white">Final Year Project Group Form</div>
      <label v-if="this.empty" class="text-red-500">Please fill the fields correctly</label>
      <div class="field text-left mx-4  ">
        <label class="label py-5">Project Title</label>
        <div class="control">
          <input
            class="input border w-full py-1 rounded-md "
            type="text"
            placeholder="Enter Project Title"
            v-model="title"
          />
        </div>
      </div>
    
      <div class="field text-left mx-4 ">
        <label class="label py-4">Select Advisor</label>
        <div class="control">
          <select v-model="advisorName" class="w-full border rounded py-1">
            <option v-for="advisor in advisors" :key="advisor.id" :value="advisor.id" >
              {{ advisor.first_name }} {{ advisor.second_name }}
            </option>
          </select>
         
        </div>
        </div>
      
        
    
      <div class="control">
        <button class="button is-success w-1/2 h-8 my-3 border rounded-md bg-blue-800 text-white" @click="saveDepartment">Next</button>
      </div>
    </div>
    </div>
  </template>
    
  <script>
  // import axios
  import axios from "axios";
    
  export default {
    name: "formGroup",
    data() {
      return {
        title: "",
        advisorName: "",
        advisors:[],
        empty:false,
        date:'',
        year:''
      };
    },
    mounted() {
      let token=localStorage.getItem('token')
      if(!token){
       this.$router.push({name:'Login'})
    }
        axios.get(`http://localhost:5000/listLength/staff_member/chair_id/${this.$route.params.chairId}/position/5`)
          .then(response => {
            
             this.advisors = response.data[1];
         
         console.log(this.advisors)
       })
    },
    methods: {
      
      // Create New product
      async saveDepartment() {
        let dat = new Date();
        this.year = dat.getFullYear();
        console.log(this.year)
        console.log(this.year)
        let chairId=localStorage.getItem('chair_id');
        let departmentId=localStorage.getItem('department_id');
        let facultyId=localStorage.getItem('faculty_id');
        if(this.title == '' || this.advisorName ==''){
          this.empty=true
        }
        else{
          try {
          await axios.post(`http://localhost:5000/addGroup`, {
            title: this.title,
            advisor: this.advisorName,
            chair_id:chairId,
            department_id:departmentId,
            faculty_id:facultyId,
            status:'Empty',
            date:this.year,
            group_id:0


            
          });
          this.group_id = "";
          this.advisor = "";
          this.$router.push({name: 'studentGroup', params: { chairId: this.$route.params.chairId }})
      ;
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