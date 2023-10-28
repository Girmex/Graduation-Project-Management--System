<template>
  <Header></Header>
<div v-for="detail in details" :key="detail.id" class="p-8 ">
    <h3 class="text-4xl font-bold mb-4">{{detail.title}}
    </h3>
    <div class="flex items-center mb-4">
      <span class="text-gray-500 mr-2 font-semibold">Department:</span>
      <div class="flex flex-wrap">
        <span class="mr-2 bg-blue-100 text-blue-500 px-2 py-1 rounded-lg">{{ detail.department_name }}</span>

      </div>
    </div>
    <div class="flex items-center mb-4">
      <span class="text-gray-500 mr-2 font-semibold">Issue Date:</span>
      <div class="flex flex-wrap">
        <span class="mr-2 bg-blue-100 text-blue-500 px-2 py-1 rounded-lg">{{ formatDate(detail.date) }}</span>
      </div>
    </div>
    <div class="flex items-center mb-4">
      <span class="text-gray-500 mr-2 font-semibold">Advisor:</span>
      <div class="flex flex-wrap">
        <span class="mr-2 bg-blue-100 text-blue-500 px-2 py-1 rounded-lg">{{detail.advisor}}</span>

      </div>
    </div>
    <div class="flex items-center mb-4">
      <span class="text-gray-500 mr-2 font-semibold">Participant Student Names:</span>
      <div class="flex flex-wrap">
        <span class="mr-2 bg-blue-100 text-blue-500 px-2 py-1 rounded-lg">{{detail.student1}}, {{detail.student2}}, {{detail.student3}}, {{detail.student4}}</span>

      </div>
    </div>
    <div class="flex items-center mb-4">
      <span class="text-gray-500 mr-2 font-semibold">Status:</span>
      <div class="flex flex-wrap">
        <span class="mr-2 bg-blue-100 text-blue-500 px-2 py-1 rounded-lg">{{detail.status}}</span>

      </div>
    </div>
 
    <div class="flex items-center mb-4">
      <span class="text-gray-500 mr-2 font-semibold">Abstract:</span>
      
    </div>
    <div class="mb-3 font-light text-left text-gray-500 dark:text-gray-400">
        <span class="mr-2 px-2 py-1 rounded-lg">{{detail.description}}</span>

      </div>
    
      <div class="flex items-center mb-4">
      <span class="text-gray-500 mr-2 font-semibold">URL:</span>
      <div class="flex flex-wrap">
        <a :href="detail.url" class="mr-2 bg-blue-100 text-blue-500 px-2 py-1 rounded-lg">{{detail.title}}</a>

      </div>
    </div>

    
  <div class="mb-4">
   

  </div>
</div>
</template>
<script>
import Header from '@/components/Header.vue';
import axios from 'axios';

export default {
  name: 'Details',
  components: {
    Header
  },

  data() {
    return {
      details: [],


    }
  },
  methods: {
    formatDate(date){
const options={year:'numeric',month:'long',day:'numeric'};
return new Date(date).toLocaleString('en-US',options)
  },
  },
  async mounted() {
    //  

    await axios.get(`http://localhost:5000/detail/${this.$route.params.id}`)
      .then(response => {
        this.details = response.data;
      })

  }
}
</script>



