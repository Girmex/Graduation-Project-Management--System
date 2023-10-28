
<template>
   <div class=" font-serif">
       
       <div class="">
           
           <div :class="divStyle">
            <div class="flex justify-end end mb-2">
            <div class="w-1/4 right-4 bg-orange-500 hover:bg-blue-700 active:bg-slate-300 px-4 py-2 border rounded-md text-white">
                    <router-link :to="{ name: 'adminAddChair' }">Add New Chair</router-link>
            </div></div>
            <div class="overflow-x-auto mt-3 ">
        <table class="table-auto w-full table-responsive ">
                      <thead class="border-b">
                        <tr>

                          <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-2 text-center bg-gray-300">
                           Chair ID
                          </th>
                         <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-2 text-center bg-gray-300">
                           Chair
                          </th>
                          <th scope="col" class="text-sm font-medium text-gray-900  text-center bg-gray-300">
                          Chair Holder
                          </th>
                        
                          <th scope="col" class="text-sm font-medium text-gray-900  text-center bg-gray-300">
                          Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="border-b text-white"  v-for="item in academic " :key="item.id">
                            <td class="text-sm  text-gray-900 font-light px-6 py-1 whitespace-nowrap">
                            {{ item.id }} 
                          </td>
                          <td class="text-sm text-left text-gray-900 font-light px-6 py-1 whitespace-nowrap">
                            {{ item.name }} 
                          </td>
                          <td class="text-sm text-left text-gray-900 font-light px-6 py-1 whitespace-nowrap">
                            {{ item.first_name }} {{ item.second_name }} {{ item.last_name }}
                          </td>
                          
                        
                          <td class="text-sm  font-light whitespace-nowrap ">
                           <span class="mr-12 p-1 rounded-md bg-blue-700 text-white hover:bg-blue-500"><router-link :to="{name:'adminChairInfo',params:{id:item.id}}" >See More</router-link></span> 
                           <span class=" p-1 rounded-md bg-red-700 text-white hover:bg-red-500"><button @click="deleteChair(item.id)">Delete</button></span>
                          </td>
                         </tr>
                        
                      </tbody>
                    </table>
            </div>
               
           </div>
          
          
       </div>
       <div class="mt-4 px-4 w-full max-h-full"><RouterView class="w-full" :key="$route.path"></RouterView></div> 
       </div>
   
     
  </template>
  
  <script >
      import axios from "axios";
      
      
       export default{
           name:'adminChairList',
           components:{
           },
      
           data() {
               return {
                academic:[],
                numberOfChairs:'',
                divStyle:'m-4'
               }
           },
          mounted() {
            let token=localStorage.getItem('token')    
      if(!token){
       this.$router.push({name:'Login'})
    }   
         axios.get(`http://localhost:5000/adminChairList`)
          .then(response => {
            this.academic = response.data;
             this.numberOfChairs = response.data.length;
         
         
       })
          
          },
          methods:{
            async deleteChair(id){
        
        try {
         let result = await axios.delete(`http://localhost:5000/deletechair/${id}`, {
          
          });
          
          if( result.data.msg == true){
     
              console.log(result.data.msg)
           this.$router.push({name:'adminHome'});
     
         }
        else if(result.data.msg==false){
          alert("You can't delete this chair,it is used by others")
        }
        } catch (err) {
          console.log(err);
        }

       
      }
       
        }
      
      
      }
       
        
       
       
       
      
       
       </script>