<template>
  <div class="w-full flex font-serif">
    <div v-if="this.names.length==0" class="ml-80 mt-6 text-xl">There is no any data</div>
  <div class="w-full px-4" v-if="this.names.length!==0">
    <div class="flex justify-end px-3 py-1"><input @keyup.enter="fetchData" type="text" class="bg-gray-800 text-white rounded-l-md py-1" v-model="search" placeholder="search here...">
      <button class="text-white rounded-r-md px-1 bg-blue-700" @click="fetchData">GO</button></div>
      <div class="overflow-x-auto ">
        <table class="table-auto w-full table-responsive ">
                    <thead class="border-b">
                      <tr>
                        <th scope="col" class="text-sm font-medium text-gray-900  py-4 text-center bg-gray-300">
                        Title
                        </th>                       
                        
                        <th scope="col" class="text-sm font-medium text-gray-900  text-center bg-gray-300">
                        advisor
                        </th>
                        
                        <th scope="col" class="text-sm font-medium text-gray-900  text-center bg-gray-300">
                        status
                        </th>
                        <th scope="col" class="text-sm font-medium text-gray-900  text-center bg-gray-300">
                        Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="border-b"  v-for="item in this.names " :key="item.id">
                      
                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {{ item.title }}
                        </td>
                        
                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {{ item.advisor}} 
                        </td>
                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {{ item.status }} 
                        </td>
                      
                        <td class="text-sm font-light whitespace-nowrap text-right ">
                          <span class="mr-12"  v-if="item.status == 'Completed'"><button v-if="item.best_project !=='Yes' && this.numberOfBestProject < 1 && item.date == this.year " class="p-1 rounded-md bg-green-500 text-white hover:bg-green-700" @click="bestProject(item.id,this.table1)">Best</button></span>
                          <span class="mr-12"  v-if="item.status == 'Completed'"><button class="p-1 rounded-md bg-orange-500 text-white hover:bg-orange-700" @click="uploadProject(item.id,this.table1)">Upload</button></span>
                          <span class="mr-12"  v-if="item.status == 'Repository'"><button class="p-1 rounded-md bg-orange-500 text-white hover:bg-orange-700" @click="uploadProject(item.id,this.table2)">Upload</button></span>
                          <RouterLink class="p-2 rounded-md pr-3 bg-blue-700 text-white hover:bg-blue-500" :to="{name:'chairProjectInfo',params:{chairId:this.$route.params.chairId,id:item.id}}">See More</RouterLink>
                        </td>
                       </tr>
                      
                    </tbody>
                </table>
                </div>
                <div class=" my-8 bottom-0 left-90 flex justify-between text-sm text-center ">
                      <button @click="firstPage" class="border-2 border-blue-500   px-3 py-1  hover:border-black font-serif " >First Page</button>
                      <button  @click='backPage(page)' class="border-2 border-blue-500   px-3 py-1  hover:border-black font-serif "> Previous</button>
                      <button :disabled="true" class="border-2 border-blue-500   px-3 py-1 rounded-full  font-serif"> {{ this.page }} / {{ this.pages }}</button>
                      <button  @click='getPage(page)'  class="border-2 border-blue-500   px-3 py-1  hover:border-black font-serif "> Next</button>
                      <button @click="lastPage" class="border-2 rounded-r-lg border-blue-500  px-3 py-1  hover:border-black font-serif">Last Page</button>
                   
                    </div>
  </div>
  
  </div>
  </template>
  <script>
  import axios from "axios";
  export default{
       name:'chairCompletedProject',
       data(){
          return{
              divStyle:'m-5  border-solid border-2 border-blue-700 rounded-md  ',
              style:"border-2 rounded-l-lg border-blue-500 ml-12 mr-6 px-4 py-1 hover:border-black font-serif", 
              names:[],   
              table1:'project',
              table2:'repository' ,
              numberOfBestProject:'',    
              numberOfBestRepository:'',           
              page:1,
              back:2,
              end:0,
              year:'',
              pages:1,
              search:'',
          }
       },
       mounted() {
       
        let token=localStorage.getItem('token')
      if(!token){
       this.$router.push({name:'Login'})
    }
    let dat = new Date();
        this.year = dat.getFullYear();
        console.log(this.year)
        console.log(dat)
    axios.get(`http://localhost:5000/BestProjectNumber/chair_id/${this.$route.params.chairId}/${this.year}`)
           .then(response => {
             this.numberOfBestProject = response.data[0].length;
             console.log(this.numberOfBestProject)
            
           })
           .catch(error => console.log(error))
           axios.get(`http://localhost:5000/ListProject/1/allproject/chair_id/${this.$route.params.chairId}/${this.$route.params.type}/${this.$route.params.value}/id`)
                 .then(response => {
                    this.names = response.data[1]; 
                    
                      })
                 .catch(error => console.log(error))
                this.page=1
                 
                 
          axios.get(`http://localhost:5000/listLength/allproject/chair_id/${this.$route.params.chairId}/${this.$route.params.type}/${this.$route.params.value}`)
           .then(response => {
             this.pages = Math.ceil(response.data[1].length/6);
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
           await axios.get(`http://localhost:5000/ListProject/${this.page}/allproject/chair_id/${this.$route.params.chairId}/${this.$route.params.type}/${this.$route.params.value}/id`)
                 .then(response => {
                    this.names = response.data[1]; 
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
             await axios.get(`http://localhost:5000/ListProject/${this.page}/allproject/chair_id/${this.$route.params.chairId}/${this.$route.params.type}/${this.$route.params.value}/id`)
              .then(response => {
                this.names = response.data[1];
               
                    })
              .catch(error => console.log(error))
           
                 },
        async  firstPage(page){
      
        this.page=1
       await axios.get(`http://localhost:5000/ListProject/${this.page}/allproject/chair_id/${this.$route.params.chairId}/${this.$route.params.type}/${this.$route.params.value}/id`)
        .then(response => {
          this.names = response.data[1];
         
              })
        .catch(error => console.log(error))
      
           },
      async  lastPage(page){
      
         this.page=this.pages
           await axios.get(`http://localhost:5000/ListProject/${this.page}/allproject/chair_id/${this.$route.params.chairId}/${this.$route.params.type}/${this.$route.params.value}/id`)
              .then(response => {
                this.names = response.data[1];
       
            })
             .catch(error => console.log(error))
      
               },
      
      async  fetchData(){
        await axios.get(`http://localhost:5000/searchProject/allproject/chair_id/${this.$route.params.chairId}/${this.$route.params.type}/${this.$route.params.value}/title/advisor/${this.search}`)
           .then(response => {
           this.names=response.data[1];
             console.log(this.pages)
           })
           .catch(error => console.log(error))
                 },
      
      async uploadProject(id,tab) {       
       try {
         await axios.put(`http://localhost:5000/updateBest/${id}`, {
             type:'status',
             table:tab,
             value:'Uploaded'
         });
       this.$router.push({name:'chairAllProject',params:{chairId:this.$route.params.chairId}})   
       } 
       catch (err) {
         console.log(err);
       }
     },
     async bestProject(id,tab) {       
       try {
         await axios.put(`http://localhost:5000/updateBest/${id}`, {
             type:'best_project',
             table:tab,
             value:'Yes'
         });
       this.$router.push({name:'chairAllProject',params:{chairId:this.$route.params.chairId}})   
       } 
       catch (err) {
         console.log(err);
       }
     },
    },
      }
    
    
  </script>