<template >
  <div v-if="this.names.length==0" class='w-full font-serif mt-3 '>There is no Student</div>
  <div v-if="this.names.length!==0" class="font-serif w-full ml-3 lg:mx-3">

    <div class="overflow-x-auto mt-3 ">
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
                        Phone Number
                        </th>
                        <th scope="col" class="text-sm font-medium text-gray-900  text-center bg-gray-300">
                        E-mail
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="border-b "  v-for="item in this.names " :key="item.id">
                      
                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {{ item.first_name }} {{ item.second_name }} {{ item.last_name }}
                        </td>
                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {{ item.id }}
                        </td>
                      
                        <td class="text-sm  font-light whitespace-nowrap ">
                          {{ item.phone_number }}
                        </td>
                        <td class="text-sm px-3 font-light whitespace-nowrap ">
                          {{ item.e_mail }}
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
       name:'advisorStudentList',
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
        let token=localStorage.getItem('token')
      if(!token){
       this.$router.push({name:'Login'})
      }
           axios.get(`http://localhost:5000/studentInfo/group_id/${this.$route.params.group}`)
                 .then(response => {
                    this.names = response.data; 
                    
                      })
                 .catch(error => console.log(error))
                this.page=1
                 
                 
          

            },
     
    }
    
  </script>