<template>
 <div class="font-serif bg-orange-900 lg:flex p-3 my-20 mx-10 rounded-md text-white items-center justify-center w-full ">
    <div class="bg-white rounded-md mx-6 "><img src="../../components/icons/profile.png" class=" h-60 " /></div>
    <div class="text-left">
      <ul v-for="profile in profile" :key="profile.id">
        <li>
          Full Name:{{ profile.first_name }} {{ profile.second_name }} {{ profile.last_name }}
        </li>
        <li>Id: {{ profile.id }}</li>
        <li>Faculty: {{ profile.faculty_name }}</li>
        <li>Department: {{ profile.department_name }}</li>
        <li>Stream: {{ profile.name }}</li>
        <li>Sex: {{ profile.gender }}</li>
        <li>E-mail: {{ profile.e_mail }}</li>
        <li>Roll: {{ profile.role_name }}</li>
        <li>Position: {{ profile.role_name }}</li>
        <li v-if="isPassword && profile.position == 7 || isPassword && profile.position==5 || isPassword && profile.position==4">
            <select v-model="position" name="dropdown" class="w-full rounded border py-1 my-2 text-black">
            <option value="4">Chair Person</option>
            <option value="5">Advisor</option>
            <option value="7">None</option>
          </select></li>
          <li class="text-red-500" v-if="this.isSave && isPassword">Please Select From the selection form</li>
          <li v-if="isPassword && profile.position == 7 || isPassword && profile.position==5 || isPassword && profile.position==4"><button @click="updateRoll()"  class="bg-blue-600 text-white  py-1 rounded-sm hover:bg-blue-900 text-center w-full">Save</button>
          </li>
    
       
        
        
      </ul>
    </div>
  </div>
  <div class="" :class="divStyle">
    <ul class="text-left font-serif">
      
      <li class=""><button class="w-full bg-gray-700 hover:bg-blue-600 text-white rounded-md py-1 focus:bg-slate-600 text-center" @click="isPassword = !isPassword, isUserName=false,isSave=false">Change roll</button></li>

    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'departmentStaffMemberInfo',
  components: {},

  data() {
    return {
      profile: [],
      isEnable: true,
      position:'',        
      update: [],
      isSave:false,
      isUserName: false,
      isPassword: false,
      divStyle: 'm-5 font-serif rounded-md w-1/3 h-full '
    }
  },

  mounted() {
    let token=localStorage.getItem('token')
      if(!token){
       this.$router.push({name:'Login'})
    }
    axios.get(`http://localhost:5000/staffInfo/${this.$route.params.id}`).then((response) => {
      this.profile = response.data
      console.log(this.profile)
    })
  },
  methods: {
    
    async updateRoll() {
      if(this.position==''){
        this.isSave=true
      }
      else{
        try {
        await axios.put(`http://localhost:5000/updateRoll/${this.$route.params.id}`, {
          // username: this.username,
          position: this.position
        })

        this.position = ''
        this.$router.push({name:'departmentHome',params:{departmentId:this.$route.params.departmentId}})
      } catch (err) {
        console.log(err)
      }
      }
     
    },

  }
}
</script>
