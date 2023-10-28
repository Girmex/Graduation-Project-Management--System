<template>
  <div class="font-serif flex flex-col justify-center items-center  ">
    <div class="w-1/2 border border-gray-700 rounded-md bg-white text-black">
      <div class="bg-gray-700 text-xl text-white">Final Year Project Student Sign UP Form</div>
      <form @submit.prevent="signup">
        <label v-if="isEnable" class="text-red-500">please fill all input field correctly</label>

        <div class="w-full">
          <div class="field text-left mx-4  ">
            <label class="label py-5">First Name</label>
            <div class="control">
              <input class="input border h-9 w-full  border-blue-600 rounded-md " type="text" placeholder="Enter First name"
                v-model="first_name" />
            </div>
          </div>
          <div class="field text-left mx-4  ">
            <label class="label py-5">Second Name</label>
            <div class="control">
              <input class="input border h-9 w-full rounded-md border-blue-600 " type="text" placeholder="Enter Second name"
                v-model="second_name" />
            </div>
          </div>
          <div class="field text-left mx-4  ">
            <label class="label py-5">Last Name</label>
            <div class="control">
              <input class="input border h-9 w-full rounded-md border-blue-600 " type="text" placeholder="Enter Last name"
                v-model="last_name" />
            </div>
          </div>
          <div class="w-full">
            <div class="field text-left mx-4  ">
              <label class="label py-5">ID</label>
              <div class="control">
                <input class="input border h-9 w-full rounded-md border-blue-600" type="number" placeholder="Enter User ID"
                  v-model="id" />
              </div>
            </div>

          </div>
          <div class="field text-left ml-4  ">
            <label class="label py-5">Sex</label>
            <div class="control">
              <label class="inline-flex items-center ml-6">
                <input type="radio" class="form-radio h-5 w-5 text-gray-600 border-blue-600" v-model="gender" value="male">
                <span class="ml-2 text-gray-700">Male</span>
              </label>
              <label class="inline-flex items-center ml-6">
                <input type="radio" class="form-radio h-5 w-5 text-gray-600 border-blue-600" v-model="gender" value="female">
                <span class="ml-2 text-gray-700">Female</span>
              </label>



            </div>
          </div>

        </div>

        <div class="control">
          <button type="submit"
            class="button is-success w-1/2 h-8 my-3 border rounded-md bg-blue-800 text-white">SAVE</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';


export default {
  name: 'addStudent',
  components: {

  },
  data() {
    return {
      alert: '',
      department_id: '',
      first_name: '',
      second_name: '',
      last_name: '',
      gender: '',
      username: '',
      password: '',
      msg: [],
      repassword: '',
      role: '6',
      isEnable: false,
      disabled: [true, true]
    }
  },
  watch: {
    email(value) {
      // binding this to the data value in the email input
      // this.email = value;
      this.validateEmail(value);
    },
    password(value) {
      // this.password = value;
      this.validatePassword(value);
    },
    first_name(value) {
      this.validateName(value)
    }
  },
  methods: {
    validateEmail(value) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        this.msg['email'] = '';
        this.disabled = [false, this.disabled[1]]
      } else {
        this.msg['email'] = 'Invalid Email Address';
        this.disabled = [true, this.disabled[1]]
      }
    },
    validatePassword(value) {
      let difference = 6 - value.length;
      if (value.length < 6) {
        this.msg['password'] = 'Must be 6 characters! ' + difference + ' characters left';
        this.disabled = [this.disabled[1], true]
      } else {
        this.msg['password'] = '';
        this.disabled = [this.disabled[1], false]
      }
    },
    validateName(value) {
      if (value.length < 3) {
        this.msg['first_name'] = "Not valid name";
      }
      else {
        this.msg['first_name'] = '';
      }
    },

    async signup() {
      let facultyId = localStorage.getItem('faculty_id');
      let departmentId = localStorage.getItem('department_id')
      let chairId = localStorage.getItem('chair_id')
      // if((this.first_name==''|| this.second_name || this.last_name=='' || this.username=='' || this.department_id==''|| this.gender=='' || this.password==''||this.repassword=='')){
      //    this.alert="All inputs are required!"
      // }
      if (this.id == '' || this.first_name == '' || this.second_name == '' ||
        this.last_name == '' || this.gender == ''
      ) {
        this.isEnable = true;
      }
      else {
        try {
          let result = await axios.post("http://localhost:5000/addStudent", {
            faculty_id: facultyId,
            department_id: departmentId,
            chair_id: chairId,
            id: this.id,
            first_name: this.first_name,
            second_name: this.second_name,
            last_name: this.last_name,
            gender: this.gender,
            username: 'BDU'+this.id,
            password: this.second_name+123+'+',




          });

          if (result) {
            alert("signup done")


            this.$router.push({ name: 'chairHome', params: { chairId: this.$route.params.chairId } })



          }
        }
        catch (err) {
          console.log(err)
        }
      }


    },


    mounted() {
      let token = localStorage.getItem('token')
      if (!token) {
        this.$router.push({ name: 'Login' })
      }
    }

  }
}

</script>
