<template>
    <Header></Header>
    <div>
      <div ref="printContent" class="py-4">
        <h2>Projects Done previously</h2>
        <div v-for="item in data" :key="item.id" class="bg-white rounded p-4 shadow mb-4">
          <h3 class="text-xl font-bold mb-2">Title:{{ item.title }}</h3>
          <p class="text-gray-700 mb-4">Description:{{ item.description }}</p>
          <p class="text-gray-500">Advisor: {{ item.advisor }}</p>
          <p class="text-gray-500">File URL: {{ item.url }}</p>
        </div>
      </div>
  
      <button @click="printContent" class="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
        </svg>
  
      </button>
    </div>
  </template>
  
  <script>
  import html2pdf from 'html2pdf.js';
  import axios from 'axios';
  import Header from '../components/Header.vue'
  
  export default {
    components: {
      Header
    },
    data() {
      return {
        data: [],
      };
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      fetchData() {
        axios.get('http://localhost:5000/api/repo')
          .then(response => {
            this.data = response.data;
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      },
      printContent() {
        const content = this.$refs.printContent;
        const options = {
          margin: 10,
          filename: 'content.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        };
  
        html2pdf().set(options).from(content).save();
      },
    },
  };
  </script>
  