
<template>
    <div class=" font-serif">
        
        <div class="">
            
            <div :class="divStyle">
             <div class="flex lg:justify-end justify-start mb-2">
             <div class="w-1/4 right-4 bg-orange-500 hover:bg-blue-700 active:bg-slate-300 px-4 py-2 border rounded-md text-white">
                     <router-link :to="{ name: 'departmentAddChair',params:{departmentId:this.$route.params.departmentId} }">Add New Chair</router-link>
             </div></div>
             <div class="overflow-x-auto ">
        <table class="table-auto w-full table-responsive ">
                       <thead class="border-b">
                         <tr>
 
                           <th scope="col" class="text-sm font-medium text-gray-900 px-4 py-2 text-center bg-gray-300">
                            Chair ID
                           </th>
                          <th scope="col" class="text-sm font-medium text-gray-900  py-2 text-center bg-gray-300">
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
                           
                         
                           <td class="text-sm text-blue-500 font-light whitespace-nowrap ">
                            <span ><router-link class="p-1 mr-10 rounded-md bg-blue-700 text-white hover:bg-blue-500" :to="{name:'departmentChairInfo',params:{chairId:item.id,departmentId:this.$route.params.departmentId}}" >See More</router-link></span> 
                            <span ><button class="p-1 rounded-md bg-red-700 text-white hover:bg-red-500" @click="deleteChair(item.id)">Delete</button></span>
                           </td>
                          </tr>
                         
                       </tbody>
                     </table>
</div> 
            </div>
           
           
        </div>
       
        </div>
    
      
   </template>
   
   <script >
       import axios from "axios";
       
       
        export default{
            name:'departmentChairList',
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
          axios.get(`http://localhost:5000/DepChairList/department_id/${this.$route.params.departmentId}`)
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
            this.$router.push({name:'departmentHome',params:{departmentId:this.$route.params.departmentId}});
      
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