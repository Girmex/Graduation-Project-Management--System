<template>
    <div class="flex font-serif w-full ">
      <div v-if="this.names.length==0" class="ml-80 mt-6 text-xl">There is no any data</div>
    <div v-if="this.names.length!==0" class="w-full">
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
                           For
                          </th>
                          <th scope="col" class="text-sm font-medium text-gray-900  text-center bg-gray-300">
                          date
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
                            {{ item.status }}
                          </td>                       
                          
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {{ formatDate(item.date) }} 
                          </td>
                        
                          <td class="text-sm  font-light whitespace-nowrap ">
                           <RouterLink class="p-1 rounded-md bg-blue-700 text-white hover:bg-blue-500" :to="{name:'noticeView',params:{facultyId:this.$route.params.facultyId,notice:item.id}}">See More</RouterLink> 
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
         name:'listAllNotice',
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
             axios.get(`http://localhost:5000/noticeList/1/${this.$route.params.facultyId}/${this.$route.params.type}/${this.$route.params.value}`)
                   .then(response => {
                      this.names = response.data[1]; 
                      
                        })
                   .catch(error => console.log(error))
                  this.page=1
                   
                   
            axios.get(`http://localhost:5000/listLength/notice/faculty_id/${this.$route.params.facultyId}/${this.$route.params.type}/${this.$route.params.value}`)
             .then(response => {
               this.pages = Math.ceil(response.data[1].length/6);
               console.log(this.pages)
             })
             .catch(error => console.log(error))
  
              },
        methods:{
            
      formatDate(date){
  const options={year:'numeric',month:'long',day:'numeric'};
  return new Date(date).toLocaleString('en-US',options)
    },
    
        async  getPage(page){
            
              if(this.page < (this.pages) && this.page>0){
                this.page+=1 
                    }
                    else{
                     return this.page
                    }
             await axios.get(`http://localhost:5000/noticeList/${this.page}/${this.$route.params.facultyId}/${this.$route.params.type}/${this.$route.params.value}`)
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
               await axios.get(`http://localhost:5000/noticeList/${this.page}/${this.$route.params.facultyId}/${this.$route.params.type}/${this.$route.params.value}`)
                .then(response => {
                  this.names = response.data[1];
                 
                      })
                .catch(error => console.log(error))
             
                   },
          async  firstPage(page){
        
          this.page=1
         await axios.get(`http://localhost:5000/List/${this.page}/${this.$route.params.facultyId}/${this.$route.params.type}/${this.$route.params.value}`)
          .then(response => {
            this.names = response.data[1];
           
                })
          .catch(error => console.log(error))
        
             },
        async  lastPage(page){
        
           this.page=this.pages
             await axios.get(`http://localhost:5000/List/${this.page}/${this.$route.params.facultyId}/${this.$route.params.type}/${this.$route.params.value}`)
                .then(response => {
                  this.names = response.data[1];
         
              })
               .catch(error => console.log(error))
        
                 },
        
        async  fetchData(){
            await axios.get(`http://localhost:5000/search/notice/faculty_id/${this.$route.params.facultyId}/${this.$route.params.type}/${this.$route.params.value}/title/date/${this.search}`)
             .then(response => {
             this.names=response.data[1];
               console.log(this.pages)
             })
             .catch(error => console.log(error))
                   }
        }
      }
      
    </script>