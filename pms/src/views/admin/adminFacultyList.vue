<template>
    <div class=" font-serif">
         
         <div class="m-4">
             
             <div :class="divStyle">
              <div class="flex justify-begin end mb-2">
            <div class="w-1/4 mr-4 right-4 bg-orange-500 hover:bg-blue-700 active:bg-slate-300 px-4 py-2 border rounded-md text-white">
              <button @click="isEnable = !isEnable, isAdd=false">Add New Faculty</button></div> <input v-if="isEnable" v-model="faculty" placeholder="please enter faculty name" class=" mr-2 text-black">
                  <label v-if="isAdd" class="text-red-500 mr-4">please fill correctly</label>
                  <button v-if="isEnable" @click="saveFaculty()" class="bg-gray-800 text-white px-2 py-1 rounded-md hover:bg-gray-500">Save</button>
            </div>
            <div class="overflow-x-auto mt-3 ">
        <table class="table-auto w-full table-responsive ">
                      <thead class="border-b">
                        <tr>

                          <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-2 text-center bg-gray-300">
                           Faculty ID
                          </th>
                         <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-2 text-center bg-gray-300">
                           Faculty
                          </th>
                          <th scope="col" class="text-sm font-medium text-gray-900  text-center bg-gray-300">
                          Faculty Dean
                          </th>
                        
                          <th scope="col" class="text-sm font-medium text-gray-900  text-center bg-gray-300">
                          Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="border-b text-white"  v-for="item in academic " :key="item.faculty_id">
                            <td class="text-sm  text-gray-900 font-light px-6 py-1 whitespace-nowrap">
                            {{ item.faculty_id }} 
                          </td>
                          <td class="text-sm text-left text-gray-900 font-light px-6 py-1 whitespace-nowrap">
                            {{ item.faculty_name }} 
                          </td>
                          <td class="text-sm text-left text-gray-900 font-light px-6 py-1 whitespace-nowrap">
                            {{ item.first_name }} {{ item.second_name }} {{ item.last_name }}
                          </td>
                          
                        
                          <td class="text-sm  font-light whitespace-nowrap ">
                            <span class="mr-12 p-1 rounded-md bg-blue-700 text-white hover:bg-blue-500"><router-link :to="{name:'adminFacultyInfo',params:{id:item.faculty_id}}" >See More</router-link></span> 
                           <span class="p-1 rounded-md bg-red-700 text-white hover:bg-red-500"><button @click="deleteFaculty(item.faculty_id)">Delete</button></span>
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
    name: 'adminFacultyList',
    components: {},
  
    data() {
      return {
        academic: [],
        numberOfFaculty: '',
        faculty:'',
        divStyle:'',
        isAdd:false,
        isEnable:false
      }
    },
    mounted() {
      let token=localStorage.getItem('token')    
        if(!token){
         this.$router.push({name:'Login'})
      }
      axios.get(`http://localhost:5000/adminFacultyList`)
          .then(response => {
            this.academic = response.data;
             this.numberOfFaculty = response.data.length;
            console.log(this.academic)
         
       })
    },
    methods: {
      // Create New Faculty
      async saveFaculty() {
        if(this.faculty==''){
                this.isAdd=true
       }
       else{
        try {
          await axios.post(`http://localhost:5000/addFaculty`, {
            faculty_name: this.faculty,
           
          });
         
          this.faculty="";
          this.$router.push({name:'adminHome'});
        } catch (err) {
          console.log(err);
        }

       }

       
      },
      async deleteFaculty(id){
        
        try {
          let result= await axios.delete(`http://localhost:5000/deleteFaculty/${id}`, {
          
          });
          if( result.data.msg== true){
     
      console.log(result.data.msg)
      this.$router.push({name:'adminHome'});
      
      }
    else if(result.data.msg==false){
      alert("You can't delete this faculty,it is used by others")
    }
          
        } catch (err) {
          console.log(err);
        }

       
      }
    },
  }
  </script>
  