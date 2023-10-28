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
        <li>Position: {{ profile.role_name }}<br>
          <select v-model="position" name="dropdown" v-if="isPassword" class="w-full border text-black rounded py-1 my-2">
            <option value="2">Faculty Dean</option>
            <option value="3">Department Head</option>
            <option value="4">Chair Person</option>
            <option value="5">advisor</option>
            <option value="7">none</option>
          </select>
    
        </li>
        <li class="text-red-500" v-if="this.isSave && isPassword">Please Select From the selection form</li>
        <li><button @click="updateRoll()" v-if="isPassword" class="bg-blue-600 text-white pr-7 py-1 rounded-sm hover:bg-blue-900 text-center w-full">Save</button>
</li>
        
      </ul>
    </div>
  </div>
  <div class=" w-1/4 h-1/2 right-2" :class="divStyle">
    <ul class="text-left font-serif">
      
      <li class="px-3 pt-2"><button class="w-full py-1 bg-gray-700 text-white text-center rounded-md hover:bg-blue-600 focus:bg-gray-500"  @click="isPassword = !isPassword, isUserName=false,this.isSave=false">Change roll</button></li>
      <li class="px-3 pt-2"><button class="w-full py-1 bg-gray-700 text-white text-center rounded-md hover:bg-blue-600 focus:bg-gray-500"  @click="updatePassword()">Reset Password</button></li>

    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'chairStaffMemberInfo',
  components: {},

  data() {
    return {
      profile: [],
      isEnable: true,
      position:'', 
      password:'1',       
      update: [],
      isSave:false,
      isUserName: false,
      isPassword: false,
      divStyle: 'm-5 font-serif  rounded-md w-1/3 h-full '
    }
  },

  mounted() {
    let token=localStorage.getItem('token')    
      if(!token){
       this.$router.push({name:'Login'})
    }
    axios.get(`http://localhost:5000/staffInfo/${this.$route.params.id}`).then((response) => {
      this.profile = response.data
      console.log(this.profile[0].department_name)
      this.password = this.profile[0].second_name+123+"+"
    })
  },
  methods: {
    async updatePassword() {
      let id = localStorage.getItem('id');
      let group = localStorage.getItem('group_id');
      
        try {
          await axios.put(`http://localhost:5000/updateProfile/${this.$route.params.id}`, {
            // username: this.username,
            password: this.password
          })

          location.reload()
        } catch (err) {
          console.log(err)
        }
      

    },
    async updateRoll() {
      let faculty_id=this.profile[0].faculty_id;
      let department_id=this.profile[0].department_id;
      let chair_id=this.profile[0].chair_id;
      console.log(chair_id)
      if(this.position==2){
       var type=faculty_id
      }
      else if(this.position==3){
       var type=department_id
      }
      if(this.position==4){
       var type=chair_id
      }
      if(this.position==''){
        this.isSave=true
      }
      else{
        try {
        await axios.put(`http://localhost:5000/up/${this.$route.params.id}/${type}`, {
          // username: this.username,
          position: this.position
        })

        this.position = ''
        this.$router.push({name:'adminStaffMember'})
      } catch (err) {
        console.log(err)
      }
      }
     
    },

  }
}
</script>
