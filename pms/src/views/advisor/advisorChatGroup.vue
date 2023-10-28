
<template>
    <div class="grid grid-cols-1 p-4  lg:flex lg:flex-row-reverse">
    
    <div :class="divStyle" >
          <div class="border-b-2 font-serif border-blue-900 bg-blue-900 text-white flex justify-between ">
            <div class="flex flex-row w-full justify-center lg:ml-6">Groups </div>
          
          </div>
          <ul class="text-left font-serif  pt-2">
                                 
              <li  v-for="item in this.academic " :key="item.id"  ><span></span> <RouterLink class="flex lg:pl-3 py-2 focus:bg-white focus:text-black shadow-md shadow-gray-600 hover:bg-slate-400 hover:text-black" :to="{name:'advisorChatDetail',params:{id:this.$route.params.id,group:item.id}}">{{ item.title }}</RouterLink>
              </li>
                                  
          </ul>
      </div>
      <RouterView class="w-full mt-4 lg:mt-0 font-serif" :key="$route.path"></RouterView>
    </div>
    
      
  
  </template>
  
  <script >
      import axios from "axios";
      
      
       export default{
           name:'advisorChatGroup',
           components:{
           },
      
           data() {
               return {
                academic:[],                
                divStyle:'ml-2 mt-2 bg-gray-700 text-white  border-solid border-2 border-blue-700 rounded-md lg:w-1/3 h-auto lg:h-1/3 ',
               }
           },
          mounted() {
            let token=localStorage.getItem('token')
      if(!token){
       this.$router.push({name:'Login'})
      }
            axios.get(`http://localhost:5000/listLength/project/advisor/${this.$route.params.id}/status !/uploaded`)
         .then(response => {
           this.academic = response.data[1];
           console.log(this.academic)
         })
         .catch(error => console.log(error))
          
          },
          methods:{
              
       
        }
      
      
      }
       
        
       
       
       
      
       
       </script>