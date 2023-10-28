<template>
  <div class="font-serif flex  flex-col my-6 items-center mx-3 ">
    <div class="w-2/3 min-h-full  border border-gray-700 rounded-md bg-white text-black">
      <div class="bg-gray-700 text-xl text-white">Add New Notice</div>
      <label v-if="this.isName" class="text-red-500">Please fill the input field correctly</label>
      <div class="lg:flex mx-4  justify-between">
        <div class="flex  field text-left  mt-3 ">
          <div class="mr-2"><label class="label py-5">Date:</label></div>
          <div class="control">
            <input type="date" v-model="date" />
          </div>
        </div>
        <div class="flex field text-left  mt-3">
          <div class="mr-2"><label class="label py-4">For:</label></div>
          <div class="control">
            <select v-model="status" name="dropdown" class="w-full rounded py-1 border">
              <option selected value="all">All</option>
              <option value="department">Department</option>
              <option value="chair">Chair</option>
              <option value="advisor">Advisor</option>
              <option value="student">Student</option>

            </select>
          </div>
        </div>
      </div>
      <div class="field text-left mx-4  ">
        <label class="label py-5">Title</label>
        <div class="control">
          <input class="input border h-9 w-full rounded-md " type="text" placeholder="Enter Title" v-model="title" />
        </div>
      </div>
      <div class="h-1/3 lg:mb-7 field text-left ml-4 ">
        <label class="label py-4">body</label>
        <div class="control h-full mr-4">
          <textarea v-model="body" class="w-full h-full flex justify-center items-center border rounded-md"
            placeholder="Enter notice body"></textarea>
        </div>
      </div>

      <div class="">
        <button class="button is-success w-1/2 h-8 my-3 border rounded-md bg-blue-800 text-white"
          @click="sendNotice()">Send</button>
      </div>
    </div>
  </div>
</template>
    
<script>
// import axios
import axios from "axios";

export default {
  name: "addNotice",
  data() {
    return {
      date: '',
      status: '',
      title: '',
      body: '',
      academic: [],
      isName: false,

    };
  },
  mounted() {
    let token = localStorage.getItem('token')
    if (!token) {
      this.$router.push({ name: 'Login' })
    }
  },

  methods: {
    // Create new notice
    async sendNotice() {
      if (this.title == '' || this.body == '' || this.date == '' || this.status == '') {
        this.isName = true
      }
      else {
        try {
          await axios.post(`http://localhost:5000/addNotice`, {
            title: this.title,
            body: this.body,
            date: this.date,
            status: this.status,
            faculty_id: this.$route.params.facultyId
          });
          this.title = "";
          this.body = "";
          this.date = "";
          this.status = "";

          this.$router.push({ name: 'facultyHome', params: { facultyId: this.$route.params.facultyId } });
        } catch (err) {
          console.log(err);
        }
      }

    },
  },
};
</script>
    
<style></style>