<template>
  <div class="bg-gray-100 flex ">
    <div class="font-serif bg-gray-900 lg:flex p-3 my-20 mx-10 rounded-md text-white items-center justify-center w-full ">
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
          <li>role: {{ profile.role_name }}</li>
          <li>Phone Number: {{ profile.phone_number }}</li>
          <li>E-mail: {{ profile.e_mail }}</li>

          <li v-if="isPassword">
            Password:
            <input type="text" v-model="password" required placeholder="Enter your new Password"
              class="w-full py-2 text-black px-1 rounded-md" @keyup.enter="updatePassword()" />

          </li>
          <li v-if="isPhone">
            Phone Number:
            <input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" maxlength="10" minlength="10" v-model="phone" required placeholder="Enter your new Phone number"
              class="w-full py-2 text-black px-1 rounded-md" @keyup.enter="updatePhone()" />

          </li>
          <li v-if="isEmail">
            E-mail:
            <input type="email" v-model="email" required placeholder="Enter your new Email"
              class="w-full py-2 text-black px-1 rounded-md" @keyup.enter="updateEmail()" />

          </li>
          <li><label v-if="isSave" class="text-red-600">Please fill the input field</label></li>
          <div class="w-full text-center">
            <button class="text-center rounded-md px-3 w-full py-1 my-2 bg-blue-500 text-white hover:bg-blue-700"
              @click=" updatePassword()" v-if="isPassword">Save</button>
            <button class="text-center rounded-md px-3 w-full py-1 my-2 bg-blue-500 text-white hover:bg-blue-700"
              @click=" updatePhone()" v-if="isPhone">Save</button>
              <button class="text-center rounded-md px-3 w-full py-1 my-2 bg-blue-500 text-white hover:bg-blue-700"
              @click=" updateEmail()" v-if="isEmail">Save</button>
          </div>

        </ul>
      </div>
    </div>

    <div class="w-1/4 h-1/6  mt-4 mr-4  rounded-md">
      <ul class="text-left font-serif">

        <li><button class="w-full py-2 mb-2 bg-gray-700 rounded-md text-white hover:bg-blue-900 "
            @click="this.isPassword = !this.isPassword, this.isSave = false,this.isPhone = false, this.isEmail = false">Change
            password</button></li>
        <li><button class="w-full py-2 mb-2 bg-gray-700 rounded-md text-white hover:bg-blue-900 "
            @click="this.isPhone = !this.isPhone, this.isSave = false, this.isPassword = false, this.isEmail = false">Change
            Phone </button></li>
        <li><button class="w-full py-2 mb-2 bg-gray-700 rounded-md text-white hover:bg-blue-900 "
            @click="this.isEmail = !this.isEmail, this.isSave = false, this.isPhone = false,this.isPassword = false">Change
            Email </button></li>
      </ul>
    </div>
  </div>
</template>
  
<script>
import axios from 'axios'

export default {
  name: 'profile',
  components: {},

  data() {
    return {
      profile: [],
      isEnable: true,
      password: '',
      phone: '1',
      email: '',
      isEmail: false,
      isSave: false,
      update: [],
      isPhone: false,
      isPassword: false,
      divStyle: 'm-5 font-serif  border-solid border-2 border-blue-700 rounded-md w-1/3 h-full '
    }
  },

  mounted() {
    let token = localStorage.getItem('token')
    if (!token) {
      this.$router.push({ name: 'Login' })
    }
    axios.get(`http://localhost:5000/staffInfo/${this.$route.params.id}`).then((response) => {
      this.profile = response.data
      console.log(this.profile)
    })
  },
  methods: {

    async updatePassword() {
      let id = localStorage.getItem('id');
      let group = localStorage.getItem('group_id');
      if (this.password == '') {
        this.isSave = true
      }
      else {
        try {
          await axios.put(`http://localhost:5000/updateProfile/${this.$route.params.id}`, {
            // username: this.username,
            password: this.password
          })

          this.password = ''
          this.isPassword=false
          location.reload()
        } catch (err) {
          console.log(err)
        }
        this.isSave = false
      }

    },
    async updatePhone() {
      let id = localStorage.getItem('id');
      let group = localStorage.getItem('group_id');
      if (this.phone == '') {
        this.isSave = true
      }
      else {
        try {
          await axios.put(`http://localhost:5000/updateStaffUserProfile/${this.$route.params.id}`, {
            // username: this.username,
            type: "phone_number",
            value: this.phone
          })

          this.phone = ''
          this.isPhone = false,
          location.reload()
        } catch (err) {
          console.log(err)
        }
        this.isSave = false
      }

    },
    async updateEmail() {
      let id = localStorage.getItem('id');
      let group = localStorage.getItem('group_id');
      if (this.email == '') {
        this.isSave = true
      }
      else {
        try {
          await axios.put(`http://localhost:5000/updateStaffUserProfile/${this.$route.params.id}`, {
            // username: this.username,
            type: "e_mail",
            value: this.email
          })

          this.email = ''
          this.isEmail = false,
          location.reload()
        } catch (err) {
          console.log(err)
        }
        this.isSave = false
      }

    },

  }
}
</script>
  