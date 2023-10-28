<template>
    <div class="w-full font-serif">

      <div class="grid grid-cols-1 p-4 w-full  lg:flex lg:flex-row-reverse">
        <div :class="divStyle" >
          <div class="border-b-2 font-serif border-blue-900 bg-blue-900 text-white flex justify-between ">
            <div class="flex flex-row w-full justify-center lg:ml-6">Groups </div>
          
          </div>
          <ul class="text-left font-serif  pt-2">
                                 
            <li v-for="chair in this.chairs " :key="chair.group_id"  class="px-3 py-1"> <button class="bg-gray-700 text-white w-full rounded-md text-center" @click="group(chair.group_id)">Group {{ chair.group_id }}</button>
                    </li>
                                  
          </ul>
      </div>
       
            
              <RouterView class="w-full" :key="$route.path"></RouterView>
            

      </div>
    </div>
  </template>
  <script>
  import axios from 'axios'
  export default {
    name: 'departmentExaminerGroup',
    data() {
      return {
        divStyle: 'm-2 w-1/4 bg-gray-200 border-solid border-2 border-blue-700 rounded-md  ',
        style:
          'border-2 rounded-l-lg border-blue-500 ml-12 mr-6 px-4 py-1 hover:border-black font-serif',
  
        chairs: [],
        numberOfChairs:'',
      }
    },
    mounted() {
      let token=localStorage.getItem('token')
        if(!token){
         this.$router.push({name:'Login'})
      }
      axios.get(`http://localhost:5000/examinerGroup/${this.$route.params.departmentId}`)
                    .then(response => {
                      this.chairs = response.data;
                       this.numberOfChairs = response.data.length;
               
               console.log(this.stream)
             })
    },
    methods: {
      group(id){
        this.$router.push(
         {name:'departmentExaminerList', params:{departmentId:this.$route.params.departmentId,group:id}}
      )
    }}}
  
  </script>
  