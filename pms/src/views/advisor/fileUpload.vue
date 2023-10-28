<template>
  <div class="container w-full h-full bg-gray-200">
      <div class="">
        <div class="w-full px-4  bg-gray-200 rounded-lg shadow">
          <div class="py-5 bg-gray-300 px-2 ">
            <form @submit.prevent="onSubmit" enctype="multipart/form-data">
              <div class="max-w-md mx-auto bg-white rounded-lg overflow-hidden md:max-w-lg">
                <div class="md:flex">
                  <div class="w-full">
                    <div class="p-4 border-b-2">
                      <span class="text-lg font-bold text-gray-600">Attach A File </span>
                    </div>
                    <div class="p-3">
                      <div class="mb-2">
                        <div
                          class="relative h-40 rounded-lg border-dashed border-2 border-gray-200 bg-white flex justify-center items-center hover:cursor-pointer">
                          <div class="mb-4">
                            <div class="flex items-center">
                              <label for="file"
                                class="bg-white hover:bg-gray-200 text-white ml-6 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer">
                                <div class="text-blue-600" v-if="file">Replace File</div>
                                <div v-else class="h-20 w-20">
                                  <img src="@/assets/upload2.png" >
                                </div>
                              </label>
                              <span class="item-center" v-if="file">{{ file.name }}</span>
                            </div>
                            <input type="file" id="file" @change="handleFile1Change"  class="hidden" required>
                          </div>
                        </div>
  
                      </div>
                      <div class="mt-3 text-center pb-3">
                        <button
                          class="inline-block px-7 py-3 rounded-xl bg-cyan-800 w-full text-white font-medium text-sm leading-snug uppercase shadow-md hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                          @click="onSubmit">Send</button>
  
                      </div>
  
                    </div>
  
                  </div>
                </div>
              </div>
            </form>
  
          </div>
        </div>
      </div>
      <div v-if="this.ok" class="bg-green-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
    <p class="font-bold">Thank you, you have finished</p>
    </div>
      <div v-if="!this.type" class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
    <p class="font-bold">only PDF format is allowed to upload!</p>
    </div>

    <div v-if="this.progress">
      
    </div>
    <div v-if="this.fail" class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
    <p class="font-bold">Plagiarized!</p>
    <p>You cannot upload, because it similar with Previous Projects</p>
    <div class="text-red-500" v-for="item in similarFiles" :key="item.id">
    <p>{{ item.url }}:{{ item.similarity }}%</p>
    </div>
    </div>
    <div v-if="this.success" class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
    <p v-if="this.similarFiles.length==0">File is uploaded Successfuly</p>
   <div v-if="this.similarFiles.length>0"> 
   <p class="text-yellow-500">Plagiarism detected!</p>
   <div class="flex justify-center">
    <table  class="bg-white rounded-lg justify-between " >
    <thead class="font-bold font-lg font-serif text-gray-800">
    <tr class="border border-spacing-2">
    <th  class="border border-gray-300">File Name</th>
    <th  class="border border-gray-300">Similarity</th>
    </tr>
    </thead>
    <tbody class="font-bold font-sm  ">
    <tr class="border border-spacing-2" v-for="item in similarFiles" :key="item.id">
    <td  class="border border-gray-300">{{ item.url }}</td>
    <td  class="border border-gray-300">{{ item.similarity }}%</td>
    </tr>
    </tbody>
    </table>
  </div>
   <div  class="text-blue-600 "> 
   
   do you want to Cancel? <button  @click="cancel" class="bg-red-500 rounded-sm text-white mr-4">Cancel</button> 
    <button  @click="done" class="bg-green-500 rounded-sm text-white ">Done</button> 
   </div>
  
  </div>
  </div>
  
  
     
    </div>
  
  </template>
  <script>
  
  import axios from 'axios'
  export default {
    name: 'FileUpload',
    components:{
      
  },
    data() {
      return {
        name:"",
        file:"",
        message:"",
        filename:"",
        titles:[],
        similarFiles:[],
        fail:false,
        success:false,
        type:true,
        ok:false,
        progress:false
      }
    },
    mounted() {
      let token=localStorage.getItem('token')
        if(!token){
         this.$router.push({name:'Login'})
        }
    },
    methods: {
      handleFile1Change(event) {
        this.file = event.target.files[0];
      },
       onSubmit(event){
        event.preventDefault();
        console.log(this.file)
        const allowedTypes = ['application/pdf'];
      if (!allowedTypes.includes(this.file.type)) {
      this.type=!this.file;
      this.success=false
        return;
      }
        const formData = new FormData();
        formData.append('file', this.file);
        try{
          this.progress=true
          if(this.$route.params.status=='Created'){
             axios.post(`http://localhost:5000/uploadProposal/${this.$route.params.id}/proposal`,formData);
        
          }
          else{
     axios.post(`http://localhost:5000/upload/${this.$route.params.id}/final`,formData)
      .then(response => {
        if(!response.data.msg){
          this.similarFiles= response.data.similarFiles
          this.success=true,
          this.type=true,
          this.ok=false;
          this.progress=false
        } 
        else{
          this.success=true;
          this.fail=false;
        
  
        }
      })
      .catch(error => {
        console.error(error);
      });
          }
          
        }
        catch(err){
          console.log(err);
          this.message = err.response.data.error
        }
      
      },
      cancel(){
         axios.get(`http://localhost:5000/remove/${this.$route.params.id}/proposal/${this.file.name}`)
         .then(response=>{
          if(response.data.rem){
          this.ok=false
         this.success=false;
         this.type=true
         }
         })
         .catch(err=>{
          console.log(err)
         })
      
       
      },
      done(){
         this.ok=true
         this.success=false;
         this.type=true
      }
      
    },
    
  }
  </script>