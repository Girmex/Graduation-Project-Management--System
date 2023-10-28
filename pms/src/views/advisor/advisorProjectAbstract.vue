<template>
      <div class="font-serif flex flex-col my-6 items-center mx-3 ">
        <div class="w-2/3 h-full border border-gray-700 rounded-md bg-white text-black">
      <div class="bg-gray-700 text-xl text-white">Add Project Abstract</div>
      
    
      <div class="h-2/3 field text-left ml-4 ">
        <label class="label p-y-4">Abstract:</label>
        <div class="control h-full mr-4">
            <textarea v-model="description" class="w-full h-full flex justify-center items-center border rounded-md" placeholder="Enter Project Abstract"></textarea>
        </div>
        </div>
    
      <div class="mt-10">
         <button class="button is-success w-1/2 h-8 my-3 border rounded-md bg-blue-800 text-white" @click="saveDescription()">Save</button>
      </div>
    </div>
    </div>
   
        <!-- <div class="w-1/2 border border-gray-700 rounded-md bg-white text-black h-full ">
      <div class="bg-gray-700 text-xl text-white">Final Year Project Abstract</div>
      <div class="h-full field text-left ml-4 ">
        <label class="label py-4">Abstract</label>
        <div class="control mr-4">
            <textarea v-model="description" class="w-full h-full flex justify-center items-center border rounded-md" placeholder="Enter Abstract of the project"></textarea>
        </div>
        <div class="control">
       <router-link :to="{name:'fileUpload',params:{id:this.$route.params.description,status:this.$route.params.status}}"><button class="button is-success w-1/2 h-8 my-3 border rounded-md bg-blue-800 text-white" @click="saveDescription()">Next</button></router-link> 
      </div>
        </div>
    
       
      
    </div> -->
   
  </template>
    
  <script>
  // import axios
  import axios from "axios";
    
  export default {
    name: "advisorProjectAbstract",
    data() {
      return {
        description: "",
        
        
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
     
        async saveDescription() {
       
       try {
         console.log(this.description)
         console.log(this.$route.params.description)
         await axios.put(`http://localhost:5000/updateDescription/${this.$route.params.description}`, {
           description: this.description,
           
           
         });
         
         this.$router.push({name:'advisorCurrentProjectList' ,params:{id:this.$route.params.id}})
      

      //  this.$router.push({name:'fileUpload',params:{id:this.$route.params.description,status:this.$route.params.status}})   
    
     
       } 
       catch (err) {
         console.log(err);
       }
     },
    },
  };
  </script>
    
  <style>
  </style>