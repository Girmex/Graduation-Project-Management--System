<template>
    <div class="flex font-serif">
    <div>
        <input @keyup.enter="fetchData" type="text" v-model="search" placeholder="search here...">
        
                   <button class="text-blue-700" @click="fetchData">GO</button>
                    <div  class="min-w-full ml-4">
                      <div>
                        <img src="../components/icons/file.png">
                      </div>
                      <div>
                        <div>title</div>
                        <div>Published by:</div>
                        <div>Published on:</div>
                      </div>
                    </div>
                    <div class="  bottom-0 left-90 ml-7 ">
                      <button @click="firstPage" :class="style " >First Page</button>
                      <button  @click='backPage(page)' class="border-2 border-blue-500 m-6  px-3 py-1  hover:border-black font-serif "> Previous</button>
                      <button :disabled="true" class="border-2 border-blue-500 m-6  px-3 py-1 rounded-full  font-serif"> {{ this.page }} / {{ this.pages }}</button>
                      <button  @click='getPage(page)'  class="border-2 border-blue-500 m-6  px-3 py-1  hover:border-black font-serif "> Next</button>
                      <button @click="lastPage" class="border-2 rounded-r-lg border-blue-500 m-6 px-3 py-1  hover:border-black font-serif">Last Page</button>
                   
                    </div>
    </div>
    </div>
    </template>
    <script>
    import axios from "axios";
    export default{
         name:'progressProject',
         data(){
            return{
                divStyle:'m-5  border-solid border-2 border-blue-700 rounded-md  ',
                style:"border-2 rounded-l-lg border-blue-500 ml-12 mr-6 px-4 py-1 hover:border-black font-serif",
                names:[],                      
                page:1,
                back:2,
                end:0,
                pages:1,
                search:'',
            }
         },
         mounted() {
          let token=localStorage.getItem('token')    
      if(!token){
       this.$router.push({name:'Login'})
    }
             axios.get(`http://localhost:5000/List/1/staff_member/faculty_id/${this.$route.params.facultyId}/department_id/1/first_name`)
                   .then(response => {
                      this.names = response.data[0]; 
                      
                        })
                   .catch(error => console.log(error))
                  this.page=1
                   
                   
            axios.get(`http://localhost:5000/listLength/staff_member/faculty_id/${this.$route.params.facultyId}/department_id/1`)
             .then(response => {
               this.pages = Math.ceil(response.data[0].length/6);
               console.log(this.pages)
             })
             .catch(error => console.log(error))
           
              
              },
        methods:{
        async  getPage(page){
            
              if(this.page < (this.pages) && this.page>0){
                this.page+=1 
                    }
                    else{
                     return this.page
                    }
             await axios.get(`http://localhost:5000/List/${this.page}/staff_member/faculty_id/${this.$route.params.facultyId}/department_id/1/first_name`)
                   .then(response => {
                      this.names = response.data[0]; 
                      console.log(this.pages)
                        })
                   .catch(error => console.log(error))
                  
                   
                   },
        async  backPage(page){
        
              if(this.page < (this.pages +1) && this.page>1){
                     this.page-=1
                   }
                   else{
                    return this.page=1;
                   }
               await axios.get(`http://localhost:5000/List/${this.page}/staff_member/faculty_id/${this.$route.params.facultyId}/''/''/first_name`)
                .then(response => {
                  this.names = response.data[0];
                 
                      })
                .catch(error => console.log(error))
             
                   },
          async  firstPage(page){
        
          this.page=1
         await axios.get(`http://localhost:5000/List/${this.page}/staff_member/faculty_id/${this.$route.params.facultyId}/''/''/first_name`)
          .then(response => {
            this.names = response.data[0];
           
                })
          .catch(error => console.log(error))
        
             },
        async  lastPage(page){
        
           this.page=this.pages
             await axios.get(`http://localhost:5000/List/${this.page}/staff_member/faculty_id/${this.$route.params.facultyId}/''/''/first_name`)
                .then(response => {
                  this.names = response.data[0];
         
              })
               .catch(error => console.log(error))
        
                 },
        
        async  fetchData(){
            await axios.get(`http://localhost:5000/search/staff_member/faculty_id/${this.$route.params.facultyId}/''/''/first_name/second_name/${this.search}`)
             .then(response => {
             this.names=response.data[0];
               console.log(this.pages)
             })
             .catch(error => console.log(error))
                   }
        }
      }
      
    </script>