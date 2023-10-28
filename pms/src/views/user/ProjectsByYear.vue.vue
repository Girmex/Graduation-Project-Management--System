<template>
  <div class="max-w-md mx-auto p-6 bg-white rounded shadow">
    <h2 class="text-2xl font-bold mb-6">Upload Notice</h2>
    <form @submit.prevent="uploadNotice">
      <div class="mb-4">
        <label class="block font-bold mb-1" for="title">Title:</label>
        <input
          id="title"
          type="text"
          v-model="title"
          required
          class="w-full p-2 border border-gray-300 rounded"
        >
      </div>
      <div class="mb-4">
        <label class="block font-bold mb-1" for="detail">Detail:</label>
        <textarea
          id="detail"
          v-model="detail"
          required
          class="w-full p-2 border border-gray-300 rounded"
        ></textarea>
      </div>
      <div class="mb-4">
        <label class="block font-bold mb-1" for="images">Images:</label>
        <input
          id="images"
          type="file"
          ref="imageInput"
          multiple
          @change="onImagesChange"
          required
          class="hidden"
        >
        <div>
          <label
            for="images"
            class="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Select Images
          </label>
          <span class="ml-2" v-if="images.length > 0">{{ images.length }} image(s) selected</span>
        </div>
      </div>
      <div class="mb-4">
        <label class="block font-bold mb-1" for="pdf">PDF:</label>
        <input
          id="pdf"
          type="file"
          @change="onPDFChange"
          required
          class="hidden"
        >
        <div class="flex items-center">
          <label
            for="pdf"
            class="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Select PDF
          </label>
          <span class="ml-2" v-if="pdf">{{ pdf.name }}</span>
        </div>
      </div>
      <div class="mb-4">
        <label class="block font-bold mb-1" for="date">Date:</label>
        <input
          id="date"
          type="date"
          v-model="date"
          required
          class="p-2 border border-gray-300 rounded"
        >
      </div>
      <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">Upload</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      title: '',
      detail: '',
      images: [], // Array to store selected images
      pdf: null,
      date: '',
    };
  },
  methods: {
    onImagesChange(event) {
      this.images = Array.from(event.target.files);
    },
    onPDFChange(event) {
      this.pdf = event.target.files[0];
    },
    uploadNotice() {
      const formData = new FormData();
      formData.append('title', this.title);
      formData.append('detail', this.detail);
      this.images.forEach((image, index) => {
        formData.append('images', image);
      })
      formData.append('pdf', this.pdf);
      formData.append('date', this.date);
      const notices='news'
      axios.post(`http://localhost:5000//api/notices/${notices}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          // Clear form fields after successful upload
          this.title = '';
          this.detail = '';
          this.images = [];
          this.pdf = null;
          this.date = '';
        })
        .catch(error => {
          console.error(error);
        });
    },
  },
};
</script>

<style>
input[type="text"],
textarea {
  resize: vertical;
}
</style>
