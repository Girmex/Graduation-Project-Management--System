<template>
  <div class="w-full font-serif">
       
       <div class="m-4">
           
           <div :class="divStyle">
            <div class="flex justify-start lg:justify-end end mb-2">
            <div class="lg:w-1/4 right-4 bg-orange-500 hover:bg-blue-700 active:bg-slate-300 px-4 py-2 border rounded-md text-white">
                    <router-link :to="{ name: 'adminAddDepartment' }">Add New Department</router-link>
            </div></div>
            <div class="overflow-x-auto ">
        <table class="table-auto w-full table-responsive ">
                      <thead class="border-b">
                        <tr>

                          <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-2 text-center bg-gray-300">
                           Department ID
                          </th>
                         <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-2 text-center bg-gray-300">
                           Department
                          </th>
                          <th scope="col" class="text-sm font-medium text-gray-900  text-center bg-gray-300">
                          Department Head
                          </th>
                        
                          <th scope="col" class="text-sm font-medium text-gray-900  text-center bg-gray-300">
                          Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="border-b text-white"  v-for="item in academic " :key="item.department_id">
                            <td class="text-sm  text-gray-900 font-light px-6 py-1 whitespace-nowrap">
                            {{ item.department_id }} 
                          </td>
                          <td class="text-sm text-left text-gray-900 font-light px-6 py-1 whitespace-nowrap">
                            {{ item.department_name }} 
                          </td>
                          <td class="text-sm text-left text-gray-900 font-light px-6 py-1 whitespace-nowrap">
                            {{ item.first_name }} {{ item.second_name }} {{ item.last_name }}
                          </td>
                          
                        
                          <td class="text-sm text-blue-500 font-light whitespace-nowrap ">
                           <span class="mr-12 p-1 rounded-md bg-blue-700 text-white hover:bg-blue-500"><router-link :to="{name:'adminDepartmentInfo',params:{id:item.department_id}}" >See More</router-link></span> 
                           <span class="p-1 rounded-md bg-red-700 text-white hover:bg-red-500"><button @click="deleteDepartment(item.department_id)">Delete</button></span>
                          </td>
                         </tr>
                        
                      </tbody>
                    </table>
               </div>
           </div>

       </div>
       </div>
 
  
</template>

<script>
import axios from 'axios'

export default {
  name: 'adminAllDepartment',
  components: {},

  data() {
    return {
      academic: [],
      numberOfChairs: '',
      divStyle:' ',
      isAdd:false
    }
  },
  mounted() {
    let token=localStorage.getItem('token')    
      if(!token){
       this.$router.push({name:'Login'})
    }
    axios
      .get(`http://localhost:5000/adminDepartmentList`)
      .then((response) => {
        this.academic = response.data
        this.numberOfChairs = response.data.length

        console.log(this.academic)
      })
  },
  methods: {
    async deleteDepartment(id){
        
        try {
          let result= await axios.delete(`http://localhost:5000/deleteDepartment/${id}`, {
          
          });
          if( result.data.msg== true){
     
     console.log(result.data.msg)
     this.$router.push({name:'adminHome'});
     
     }
   else if(result.data.msg==false){
     alert("You can't delete this department,it is used by others")
   }
       
        } catch (err) {
          console.log(err);
        }

       
      }
  }
}
</script>
