<template>
  <div class="flex font-serif">
    <RouterView class="w-full" :key="$route.path"></RouterView>
    <div class="absolute right-2">
      
      <div :class="divStyle">
        <div class="border-b-2 border-blue-900 bg-blue-500 text-white">Staff Members</div>
        <ul class="text-left ">
          <li class="pl-8 py-1 bg-gray-200 hover:bg-gray-500 hover:text-white">
            <RouterLink
              :to="{ name: 'chairAllStaffMember', params: { chairId: this.$route.params.chairId } }"
              ><span :class="mainlistStyle">All Staff Members</span></RouterLink
            >
          </li>

          <li class="pl-8 py-1 bg-gray-300 hover:bg-gray-500 hover:text-white">
            <RouterLink
              :to="{
                name: 'chairStaffList',
                params: { chairId: this.$route.params.chairId, type: 'position', value: 5 }
              }"
              >Project Advisor</RouterLink
            >
          </li>
          <li class="pl-8 py-1 bg-gray-200 hover:bg-gray-500 hover:text-white">
            <RouterLink
              :to="{
                name: 'chairStaffList',
                params: { chairId: this.$route.params.chairId, type: 'position', value: 7 }
              }"
              >other</RouterLink
            >
          </li>
          <li class="pl-8 py-1 bg-gray-300 hover:bg-gray-500 hover:text-white"><RouterLink :to="{name:'addStaffMember', params:{chairId:this.$route.params.chairId}}">Add Staff Member</RouterLink></li> 
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'chairStaff',
  data() {
    return {
      divStyle: 'm-5 bg-gray-200 border-solid border-2 border-blue-700 rounded-md  ',
      style:
        'border-2 rounded-l-lg border-blue-500 ml-12 mr-6 px-4 py-1 hover:border-black font-serif',

      names: []
    }
  },
  mounted() {
    let token=localStorage.getItem('token')
      if(!token){
       this.$router.push({name:'Login'})
    }
  },
  methods: {}
}
</script>
