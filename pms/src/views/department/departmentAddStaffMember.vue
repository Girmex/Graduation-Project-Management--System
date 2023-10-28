<template>
  <div class="font-serif my-3 flex flex-col justify-center items-center  ">
        <div class="w-1/2 border border-gray-700 rounded-md bg-white text-black">
      <div class="bg-gray-700 text-xl text-white">Final Year Project Staff Members Sign UP Form</div>
      <form @submit.prevent="signup">
        <label v-if="isEmpty" class="text-red-500">Please fill all the input field correctly</label>
      <div class="lg:flex my-4 mx-4">
        
      <div class="w-full">
      <div class="field text-left py-1 mx-4  ">
        <label class="label py-5">First Name</label>
        <div class="control">
          <input
            class="input border w-full py-1 rounded-md "
            type="text"
            placeholder="Enter First name"
            v-model="first_name"
          />
        </div>
      </div>
      <div class="field text-left mx-4  ">
        <label class="label py-5">Second Name</label>
        <div class="control">
          <input
            class="input border w-full py-1 rounded-md "
            type="text"
            placeholder="Enter Second name"
            v-model="second_name"
          />
        </div>
      </div>
      <div class="field text-left mx-4  ">
        <label class="label py-5">Last Name</label>
        <div class="control">
          <input
            class="input border w-full py-1 rounded-md "
            type="text"
            placeholder="Enter Last name"
            v-model="last_name"
          />
        </div>
      </div>
      <div class="field text-left mx-4 ">
        <label class="label py-4">Select Chair</label>
        <div class="control">
          <select v-model="chairs" class="w-full border rounded py-1">
            <option v-for="chair in chair" :key="chair.id" :value="chair.id" >
              {{ chair.name }}
            </option>
          </select>
         
        </div>
        </div>
      
    </div>
    
    <div class="w-full">
      <div class="field text-left mx-4  ">
        <label class="label py-5">Sex</label>
        <div class="control">
          <label class="inline-flex items-center ml-6">
             <input type="radio" class="form-radio h-5 w-5 text-gray-600" v-model="gender" value="male">
             <span class="ml-2 text-gray-700">Male</span>
          </label>
          <label class="inline-flex items-center ml-6">
             <input type="radio" class="form-radio h-5 w-5 text-gray-600" v-model="gender" value="female">
             <span class="ml-2 text-gray-700">Female</span>
          </label>
      
   
        </div>
      </div>
      <div class="field text-left mx-4  "><div><label class="label py-5">Select Role</label></div><div>
            <select class="w-full border rounded py-1" v-model="position" name="dropdown">
            <option value="4">Chair Person</option>
            <option value="5">advisor</option>
            <option value="7">none</option>
          </select>
        </div></div>
      <div class="field text-left mx-4  ">
        <label class="label py-5">ID</label>
        <div class="control">
          <input
            class="input border w-full py-1  rounded-md "
            type="number"
            placeholder="Enter User ID"
            v-model="id"
          />
        </div>
        <label v-if="this.isId" class="text-red-500">there is a staff Member with id {{ this.id }}</label>
      </div>
    
    </div>
  </div>
    
      <div class="control">
        <button type="submit" class="button is-success w-1/2 h-8 my-3 border rounded-md bg-blue-800 text-white" >SAVE</button>
      </div>
    </form>
    </div>
    </div>

 </template>
 
 <script>
 import axios from 'axios';
 
 
 export default {
  name: 'departmentAddStaffMember',
  components:{
   
  },
  data(){
    return {
      alert:'',
      chair:[],
      first_name:'',
      second_name:'',
      last_name:'',
      gender:'',
      id:'',
      position:'',
      isId:false,
      numberId:'',
      isEmpty:false,
      chairs:'',
      username: '',
      password: '',
      msg: [],
      repassword: '',
      role:'1',
      disabled: [true, true]
    }
  },
  watch: {
    email(value){
      // binding this to the data value in the email input
      // this.email = value;
      this.validateEmail(value);
    },
    password(value){
      // this.password = value;
      this.validatePassword(value);
    },
    first_name(value){
    this.validateName(value)
  }
  },
  methods:{
    validateEmail(value){
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
  {
    this.msg['email'] = '';
    this.disabled = [false, this.disabled[1]]
  } else{
    this.msg['email'] = 'Invalid Email Address';
    this.disabled = [true, this.disabled[1]]
  } 
    },
    validatePassword(value){
      let difference = 6 - value.length;
      if (value.length<6) {
        this.msg['password'] = 'Must be 6 characters! '+ difference + ' characters left' ;
        this.disabled = [this.disabled[1], true]
      } else {
         this.msg['password'] = '';
         this.disabled = [this.disabled[1], false]
      }
    },
    validateName(value){
      if(value.length<3){
        this.msg['first_name']="Not valid name";
      }
      else{
        this.msg['first_name']='';
      }
    },
  
   async signup(){
    let facultyId=localStorage.getItem('faculty_id');
    let departmentId=localStorage.getItem('department_id')
    // axios
    //   .get(`http://localhost:5000/staffInfo/${this.id}`)
    //   .then((response) => {
    //     this.numberId = response.data.length
    //     console.log(this.numberId)
    //   })
   // if((this.first_name==''|| this.second_name || this.last_name=='' || this.username=='' || this.department_id==''|| this.gender=='' || this.password==''||this.repassword=='')){
   //    this.alert="All inputs are required!"
   // }
   if(this.departments==''|| this.chairs=='' || this.first_name=='' || this.second_name=='' ||
        this.last_name=='' || this.gender=='' || this.position==''
        ){
        this.isEmpty= true;
     }
    //  else if(this.numberId !== 0){
    //   this.isId=true
    //  }
     else{
      try{
    let result= await axios.post("http://localhost:5000/addStaffMember",{
          faculty_id:facultyId,
          department_id:departmentId,
          chair_id:this.chairs,
          id:this.id,
          qualification:'msc',
          first_name:this.first_name,
          second_name:this.second_name,
          last_name:this.last_name,
          gender:this.gender,
          username:'BIT'+this.id,
          password:this.id+123+'+',
          position:this.position,
          
         
        
      });
      
     
    if( result.data.msg== true){
     
      alert("signup done")
      console.log(result.data.msg)
      this.first_name='',
      this.second_name='',
      this.last_name='',
      this.gender='',
      this.id='',
      this.position='',
      this.chairs=''
      
      }
    else if(result.data.msg==false){
      this.isId=true
    }
    }
      
      catch(err){
       console.log(err)
      }
     }
   
    
    },
   
    
   //  mounted(){
   //    let user=localStorage.getItem('user-info')
   //    if(user){
   //      this.$router.push({name:'/'})
   //    }
   //  }
 
    },
    mounted() {
      let token=localStorage.getItem('token')
      if(!token){
       this.$router.push({name:'Login'})
    }
    axios
      .get(`http://localhost:5000/chairList/department_id/${this.$route.params.departmentId}`)
      .then((response) => {
        this.chair = response.data
        
      })
  }
  }
 
 </script>
 