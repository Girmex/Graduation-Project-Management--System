<template>
    <div class="font-serif w-full ">
        <div v-if="this.names.length==0">There is no Project</div>
      <div class="mx-2" v-if="this.names.length!==0">
                    <table  class="w-full ">
                      <thead class="border-b">
                        <tr>
                          <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-center bg-gray-300">
                            Title
                          </th>
                         
                          <th scope="col" class="text-sm font-medium text-gray-900  text-center bg-gray-300">
                          Status
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
                        
                          <td class="text-sm text-blue-500 font-light whitespace-nowrap ">
                            <span class="hover:text-purple-600 hover:border-b hover:border-purple-600"><router-link :to="{name:'advisorProjectDetail',params:{group:item.id,id:this.$route.params.id}}">view detail</router-link> </span>       
                             <RouterLink v-if="item.status == 'Inprogress'" class="hover:text-purple-600 hover:border-b hover:border-purple-600" :to="{name:'advisorProjectAbstract',params:{id:this.$route.params.id,description:item.id,status:item.status}}">/ attach description</RouterLink>
                            <RouterLink v-else-if="item.status !== 'Inprogress' && item.status !=='Completed'" class="hover:text-purple-600 hover:border-b hover:border-purple-600" :to="{name:'fileUpload',params:{id:item.id,status:item.status}}">/ attach proposal</RouterLink> 
                          </td>
                         </tr>
                        
                      </tbody>
                    </table>
                </div>
    </div>
    </template>
    <script>
    import axios from "axios";
    export default{
         name:'advisorProjectList',
         data(){
            return{
                divStyle:'m-5  border-solid border-2 border-blue-700 rounded-md  ',
                style:"border-2 rounded-l-lg border-blue-500 ml-12 mr-6 px-4 py-1 hover:border-black font-serif", 
                names:[],                   
                
                
            }
         },
         mounted() {
          let token=localStorage.getItem('token')
      if(!token){
       this.$router.push({name:'Login'})
      }
             axios.get(`http://localhost:5000/listLength/project/advisor/${this.$route.params.id}/status/${this.$route.params.value}`)
                   .then(response => {
                      this.names = response.data[1]; 
                      console.log(this.names)
                        })
                   .catch(error => console.log(error))
                  this.page=1
                   
                   
            
  
              },
       
      }
      
    </script>