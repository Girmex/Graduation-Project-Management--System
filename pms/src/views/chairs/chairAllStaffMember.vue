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
                      <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-center bg-gray-300">
                       Full Name
                      </th>
                     
                      <th scope="col" class="text-sm font-medium text-gray-900  text-center bg-gray-300">
                      ID
                      </th>
                     
                      <th scope="col" class="text-sm font-medium text-gray-900  text-center bg-gray-300">
                      Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="border-b"  v-for="item in names " :key="item.id">
                    
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {{ item.first_name }} {{ item.second_name }} {{ item.last_name }}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {{ item.id }}
                      </td>
                    
                      <td class="text-sm text-blue-500 font-light whitespace-nowrap ">
                        <router-link class="p-1 rounded-md bg-blue-700 text-white hover:bg-blue-500" :to="{name:'chairStaffMemberInfo',params:{id:item.id,chairId:item.chair_id}}" >See More</router-link>
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
     name:'chairAllStaffMember',
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
         axios.get(`http://localhost:5000/List/1/staff_member/chair_id/${this.$route.params.chairId}/''/1/first_name`)
               .then(response => {
                  this.names = response.data[0]; 
                  
                    })
               .catch(error => console.log(error))
              this.page=1
               
               
        axios.get(`http://localhost:5000/listLength/staff_member/chair_id/${this.$route.params.chairId}/''/1`)
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
         await axios.get(`http://localhost:5000/List/${this.page}/staff_member/chair_id/${this.$route.params.chairId}/''/1/first_name`)
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
           await axios.get(`http://localhost:5000/List/${this.page}/staff_member/chair_id/${this.$route.params.chairId}/''/''/first_name`)
            .then(response => {
              this.names = response.data[0];
             
                  })
            .catch(error => console.log(error))
         
               },
      async  firstPage(page){
    
      this.page=1
     await axios.get(`http://localhost:5000/List/${this.page}/staff_member/chair_id/${this.$route.params.chairId}/''/''/first_name`)
      .then(response => {
        this.names = response.data[0];
       
            })
      .catch(error => console.log(error))
    
         },
    async  lastPage(page){
    
       this.page=this.pages
         await axios.get(`http://localhost:5000/List/${this.page}/staff_member/chair_id/${this.$route.params.chairId}/''/''/first_name`)
            .then(response => {
              this.names = response.data[0];
     
          })
           .catch(error => console.log(error))
    
             },
    
    async  fetchData(){
        await axios.get(`http://localhost:5000/search/staff_member/chair_id/${this.$route.params.chairId}/''/''/first_name/second_name/${this.search}`)
         .then(response => {
         this.names=response.data[0];
           console.log(this.pages)
         })
         .catch(error => console.log(error))
               }
    }
  }
  
</script>