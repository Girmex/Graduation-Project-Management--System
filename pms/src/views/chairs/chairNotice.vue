<template>
  <div v-if="this.notices.length==0" class="ml-80 mt-6 text-xl">There is no any data</div>
  <div class="w-full py-4 px-4" v-if="this.notices.length!==0">
    <div class="overflow-x-auto ">
        <table class="table-auto w-full table-responsive ">
      <thead class="border-b">
        <tr>
          <th scope="col" class="text-sm font-medium text-gray-900  py-4 text-center bg-gray-300">
            Title
          </th>

          <th scope="col" class="text-sm font-medium text-gray-900  text-center bg-gray-300">
            Date
          </th>

          <th scope="col" class="text-sm font-medium text-gray-900  text-center bg-gray-300">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b" v-for="item in this.notices " :key="item.id">

          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            {{ item.title }}
          </td>

          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            {{ formatDate(item.date) }}
          </td>


          <td class="text-sm text-blue-500 font-light whitespace-nowrap ">
            <RouterLink class="p-1 rounded-md bg-blue-700 text-white hover:bg-blue-500"
              :to="{ name: 'chairNoticeView', params: { chairId: this.$route.params.chairId, notice: item.id } }">See
              More
            </RouterLink>
          </td>
        </tr>

      </tbody>
    </table>
</div>



  </div>
</template>
<script>
import axios from "axios";
export default {
  name: 'chairNotice',
  components: {

  },
  data() {

    return {

      numberOfStaffMember: '',
      divStyle: ' w-full border-solid border-2 border-blue-700 rounded-md h-2/3  ',
      notices: [],
    }

  },
  async mounted() {
    let token = localStorage.getItem('token')
    if (!token) {
      this.$router.push({ name: 'Login' })
    }
    let faculty = localStorage.getItem('faculty_id');
    console.log(faculty);
    await axios.get(`http://localhost:5000/notice_detail/${this.$route.params.chairId}/${faculty}/chair/all`)
      .then(response => {

        this.notices = response.data[1];

        console.log(this.notices)
      })
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleString('en-US', options)
    },
  }

}
</script>