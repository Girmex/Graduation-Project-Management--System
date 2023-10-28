<template>
  <Header></Header>

  <section class="h-auto w-auto bg-gray-300">
   
   <div
     class="flex justify-center  items-center flex-wrap h-full g-6"
   >
     <div
       class="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0 rounded-3xl py-5 bg-gray-50 w-5/6 h-90"
     >
          <div class="w-full flex justify-center"> <img
           src="../assets/login.png"
           class=""
           width="100"
           height="100"
           alt="LOGIN"
         />
   </div>
        
       <form @submit.prevent="login" class="px-10 py-5">
         <div>
           <label class="text-red-600" v-if="this.message" >{{this.mess}}!</label>
          </div>
         <div class="mb-6">
           <input
             type="text"
             class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
             id="id1"
             placeholder="Enter your userID"
             v-model="username"
           />
         </div>
         <div class="mb-6">
           <input
             type="password"
             class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
             id="id2"
             placeholder="Password"
             v-model="password"
           />
         </div>
          
         <div class="flex justify-between items-center mb-6">
           <div class="form-group form-check"></div>
         </div>

         <div class="text-center lg:text-left">
           <button
             type="submit"
             class="inline-block px-7 py-3 rounded-xl bg-cyan-800 w-full text-white font-medium text-sm leading-snug uppercase shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
           >
             Login
           </button>

           
         </div>
       </form>
     </div>
   </div>

</section>


</template>

<script>
import axios from 'axios';
import Header from '../components/Header.vue'

export default {
  
 name: 'Login',
 components:{
   Header
 },
 
 data() {
    return {
      username: "",
      password: "",
      message:false,
      mess:'incorrect username or password '
    };
  },
  methods: {
    async login() {
      try{
      let result = await axios.post("http://localhost:5000/login", {
        username: this.username,
        password: this.password,
      });


        if(result.data.msg){
          const token = result.data.token;
          
        const expirationTime = new Date().getTime() + 24 * 60 * 1000;
          const tokenData = {
          token: token,
          expiration: expirationTime
        };
        const faculty_id=0

       localStorage.setItem('token', JSON.stringify(tokenData));
       localStorage.setItem('faculty_id',result.data.user.faculty_id)
       localStorage.setItem('department_id',result.data.user.department_id)
       localStorage.setItem('chair_id',result.data.user.chair_id)
       localStorage.setItem('id',result.data.user.id)
        console.log(result)
        if(result.data.user.position==1){
          this.$router.push({
          name: "adminHome"
        });
        }
        if(result.data.user.position==4){
          this.$router.push({
          name: "chairHome",
          params: { chairId: result.data.user.chair_id },
          
        });
        }
        if(result.data.user.position==3){
          this.$router.push({
          name: "departmentHome",
          params: { departmentId: result.data.user.department_id },
          
        });
        }
        if(result.data.user.position==2){
          this.$router.push({
          name: "facultyHome",
          params: { facultyId: result.data.user.faculty_id },
        });
         }
         if(result.data.user.position==5){
          localStorage.setItem('chair_id',result.data.user.chair_id)
          localStorage.setItem('group_id',result.data.user.group_id)
          this.$router.push({
          name: "advisorHome",
          params: { id: result.data.user.id },
        });
         }
         if(result.data.user.position==6){
          localStorage.setItem('group_id',result.data.user.group_id)
          localStorage.setItem('username',result.data.user.id)
          this.$router.push({
          name: "studentHome",
          params: { id: result.data.user.id, group:result.data.user.group_id},
        });
         }
      }
      else{
        this.message=true
      }
     }
     catch(err){
      console.log(err)
     }
    
      
    },
  
  },
 }

</script>
