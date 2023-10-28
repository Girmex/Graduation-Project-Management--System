<template>

  <div v-for="item in this.history " :key="item.id" class="bg-gray-300 w-full border border-blue-600 rounded-md">    
    <router-link :to="{ name: 'advisorChatDetail', params: { id: this.$route.params.id, group:this.$route.params.group} }">
      <p class="font-bold text-cyan-800 font-serif"> {{ item.sender_name }}</p>
      <p class="font-bold font-mono "> {{ item.message }}</p>
      <div class="text-xs text-gray-500 ml-2">{{ formatDate(item.created_at) }}</div>
    </router-link>
    <br>
  </div>
  <div class="ml-5" v-if="this.history.length==0">
    <div >      
      <router-link :to="{ name: 'advisorChatDetail', params: { id: this.$route.params.id, group:this.$route.params.group } }">
       <p>start a chat</p>
    </router-link>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  
  name: 'advisorChat',
  components: {

  },
  data() {
    return {

      group: null,
      groups: [],
      history: [],
      query: '',
      user: '',
      partnerDetail: ''



    }
  },


  methods: {
    formatDate(date) {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      return new Date(date).toLocaleString('en-US', options);
    },



  },

  async mounted() {
    let token = localStorage.getItem('token')
    
    if (!token) {
      this.$router.push({ name: 'Login' })
    }

    this.user = localStorage.getItem('username')
    let result = await axios.get(`http://localhost:5000/chat_messages/${this.$route.params.group}`)
    this.history = result.data
    console.log(this.history)
    
  }
}
</script>