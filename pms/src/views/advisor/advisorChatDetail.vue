<template>
  <div class=" flex items-center w-full max-h-screen bg-gray-200 ">
    <div class=" overflow-y-scroll h-full w-full">
    <div class=" bg-gray-100 w-3/4 mx-20  ">
      <div class="" v-for="message in messages" :key="message.id">
        <div v-if="message.sender_id != currentUser.id" class="flex items-start">
          <div class="font-semibold  text-gray-700">{{ message.sender_name }}</div>
          <div class="">
            <div class="bg-white mt-6 ml-6 p-6 rounded-lg shadow-sm">{{ message.message }}</div>
            <div class="text-xs text-gray-500 p-3">{{ formatDate(message.created_at) }}</div>
          </div>
        </div>

      <div v-else class=" flex items-start">
          <div class="font-semibold  text-cyan-600">You</div>
          <div class="">
            <div class="bg-blue-400 ml-6 mt-6 p-6 text-white rounded-lg shadow-sm">
              {{ message.message }}
            </div>

            <textarea v-if="this.click1 && this.id == message.id" v-model="msg"
              class="form-textarea rounded-lg shadow-sm pt-5 h-40 border border-solid border-cyan-800" value
              required></textarea>
            <button @click="edit(message.id)"
              class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-l mx-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                <path
                  d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
              </svg>
            </button>
            <button @click="showDialog = true" class="bg-red-500 hover:bg-red-700 text-white font-bold rounded-r mx-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                <path fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.75 9.25a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z"
                  clip-rule="evenodd" />
              </svg>
            </button>
            <div v-if="showDialog" class="fixed inset-0 bg-gray-500 bg-opacity-20 flex items-center justify-center">
              <div class="bg-white rounded-lg p-8">
                <h2 class="text-lg font-medium mb-4">
                  Are you sure you want to delete this message?
                </h2>
                <div class="flex justify-center">
                  <button @click="showDialog = false"
                    class="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md mr-4">
                    Cancel
                  </button>
                  <button @click="remove(message.id)" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">
                    Delete
                  </button>
                </div>
                
              </div>
              
            </div>
            <div class="text-xs text-gray-500 ">{{ formatDate(message.created_at) }}</div>
          </div>
         
    
          
        </div>
      </div>
    </div>
  
      <textarea v-model="newMessage"
        class="form-textarea rounded-lg shadow-sm w-3/4 mr-6  border border-solid border-cyan-800">
    </textarea>
    <div class="flex justify-between">
      <router-link :to="{ name: 'Chat', params: { id: this.$route.params.id, group: this.$route.params.group } }"
        class="text-indigo-700">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
          <path
            d="M9.195 18.44c1.25.713 2.805-.19 2.805-1.629v-2.34l6.945 3.968c1.25.714 2.805-.188 2.805-1.628V8.688c0-1.44-1.555-2.342-2.805-1.628L12 11.03v-2.34c0-1.44-1.555-2.343-2.805-1.629l-7.108 4.062c-1.26.72-1.26 2.536 0 3.256l7.108 4.061z" />
        </svg>
      </router-link>
      <button @click="sendMessage" class="rounded-lg text-blue-500 hover:bg-blue-600 hover:text-white">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
        </svg>
      </button>
    </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios'
export default {
  name: 'advisorChatDetail',
  components: {},
  data() {
    return {
      showDialog: false,
      group_id: null,
      messages: [],
      newMessage: '',
      currentUser: {
        id: null,
        name: ''
      },
      click1: false,
      id: null,
      msg: 'hello'
    }
  },
  created() {
    this.fetchMessages()
  },
  methods: {
    formatDate(date) {
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      }
      return new Date(date).toLocaleString('en-AU', options)
    },
    edit(id) {
      this.click1 = !this.click1
      this.id = id

      let result = axios.put(`http://localhost:5000/message/${id}`, {
        message: this.msg
      })
      if (result) {
        this.fetchMessages()
        console.log(id)
      }
    },
    async remove(id) {
      let result1 = await axios.delete(`http://localhost:5000/message/${id}`)
      if (result1) {
        this.showDialog = false
        this.fetchMessages()
      }
    },
    fetchMessages() {
      axios.get(`http://localhost:5000/messages/${this.$route.params.group}`)
        .then((response) => {
          if (response.data) {
            this.messages = response.data
            console.log(this.messages)
          } else {
            console.error(response.data)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    sendMessage() {
      if (!this.newMessage) {
        return
      }

      const message = {
        group_id: this.$route.params.group,
        sender_id: this.currentUser.id,
        sender_name: this.currentUser.name,
        message: this.newMessage
      }

      axios
        .post('http://localhost:5000/api/messages', message)
        .then((response) => {
          this.newMessage = ''
          this.messages.push(message)
          this.fetchMessages()
        })
        .catch((error) => { })
    }
  },
 async mounted() {
  let token=localStorage.getItem('token')
      if(!token){
       this.$router.push({name:'Login'})
      }
    this.currentUser.id = this.$route.params.id
    let result = await axios.get(`http://localhost:5000/user/${this.currentUser.id}`)
    if (result) {
      this.currentUser.name = result.data[0].first_name;
      console.log(this.currentUser.name)
    }
  },
}
</script>
