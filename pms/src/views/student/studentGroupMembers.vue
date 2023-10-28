<template>
    <div class="font-serif w-full ">
      <div class="overflow-x-auto mx-3 my-3 ">
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
                        <tr class="border-b"  v-for="item in this.names " :key="item.id">
                        
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {{ item.first_name }} {{ item.second_name }} {{ item.last_name }}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {{ item.id }}
                          </td>
                        
                          <td class="text-sm text-blue-500 font-light whitespace-nowrap ">
                            <router-link :to="{name:'groupMemberInfo',params:{id:this.$route.params.id,group:this.$route.params.group,info:item.id,advisor:item.advisor}}" >view</router-link>
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
         name:'studentGroupMembers',
         data(){
            return{
                divStyle:'m-5  border-solid border-2 border-blue-700 rounded-md  ',
                style:"border-2 rounded-l-lg border-blue-500 ml-12 mr-6 px-4 py-1 hover:border-black font-serif", 
                names:[],                   
                page:1,
                
                pages:1,
                
            }
         },
         mounted() {
                let group=localStorage.getItem('group_id')
             axios.get(`http://localhost:5000/studentInfo/group_id/${group}`)
                   .then(response => {
                      this.names = response.data; 
                      
                        })
                   .catch(error => console.log(error))
                  this.page=1
                   
                   
            
  
              },
       
      }
      
    </script>