<template>
  <Header></Header>
  <div class="w-full flex font-serif">
    <div v-if="this.names.length == 0" class="ml-80 mt-6 text-xl">There is no any data</div>
    <div v-if="this.names.length !== 0" class="w-full px-4">
      <div class="flex justify-start lg:justify-end lg:px-3 py-1">
      <input @keyup.enter="fetchData" type="text"
          class="bg-white border border-blue-500 w-1/2 h-10 rounded-l-md py-1 text-black" v-model="search" placeholder="search here...">
        <button class="text-white rounded-r-md px-1 bg-blue-700" @click="fetchData">GO</button>
      </div>
      <div class="overflow-x-auto ">
      <table class="table-auto w-full table-responsive ">
        <thead class="border-b">
          <tr>
            <th scope="col" class="text-sm font-medium text-gray-900  py-4 text-center bg-gray-300">
              Title
            </th>

            <th scope="col" class="text-sm font-medium text-gray-900  text-center bg-gray-300">
              advisor
            </th>
            <th scope="col" class="text-sm font-medium text-gray-900  text-center bg-gray-300">
              Department
            </th>
            
            <th scope="col" class="text-sm font-medium text-gray-900  text-center bg-gray-300">
              Issue Date
            </th>
            <th scope="col" class="text-sm font-medium text-gray-900  text-center bg-gray-300">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b" v-for="item in this.names " :key="item.id">

            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {{ item.title }}
            </td>

            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {{ item.advisor }}
            </td>
            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {{ item.department_name }}
            </td>
            
            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {{item.date}}
            </td>
            <td class="text-sm text-blue-500 font-light whitespace-nowrap ">
              <RouterLink :to="{ name: 'Detail',params:{id:item.id} }" class="px-2 py-1 bg-blue-500 text-white hover:to-blue-800">view</RouterLink>
            </td>
          </tr>

        </tbody>
      </table></div>
      <div class=" my-8 bottom-0 left-90 flex justify-between text-sm text-center ">
                    <button @click="firstPage" class="border-2 border-blue-500   px-3 py-1  hover:border-black font-serif " >First Page</button>
                    <button  @click='backPage(page)' class="border-2 border-blue-500   px-3 py-1  hover:border-black font-serif "> Previous</button>
                    <button :disabled="true" class="border-2 border-blue-500   px-3 py-1 rounded-full  font-serif"> {{ this.page }} / {{ this.pages }}</button>
                    <button  @click='getPage(page)'  class="border-2 border-blue-500   px-3 py-1  hover:border-black font-serif "> Next</button>
                    <button @click="lastPage" class="border-2 rounded-r-lg border-blue-500  px-3 py-1  hover:border-black font-serif">Last Page</button>
                 
                  </div>
    </div>

  </div>
</template>
<script>
import axios from "axios";
import Header from '../../components/Header.vue'
export default {
  name: 'BesstProjects',
  components:{
      Header
  },
  data() {
    return {
      divStyle: 'm-5  border-solid border-2 border-blue-700 rounded-md  ',
      style: "border-2 rounded-l-lg border-blue-500 ml-12 mr-6 px-4 py-1 hover:border-black font-serif",
      names: [],
      page: 1,
      back: 2,
      end: 0,
      pages: 1,
      search: '',
    }
  },
  mounted() {
    
    axios.get(`http://localhost:5000/ListProject/1/allproject/best_project/yes/faculty_id/1/id`)
      .then(response => {
        this.names = response.data[0];

      })
      .catch(error => console.log(error))
    this.page = 1


    axios.get(`http://localhost:5000/adminListProjectLength/allproject/best_project/yes`)
      .then(response => {
        this.pages = Math.ceil(response.data[1].length / 6);
        console.log(this.pages)
      })
      .catch(error => console.log(error))

  },
  methods: {
    formatDate(date){
const options={year:'numeric',month:'long',day:'numeric'};
return new Date(date).toLocaleString('en-US',options)
  },
    async getPage(page) {

      if (this.page < (this.pages) && this.page > 0) {
        this.page += 1
      }
      else {
        return this.page
      }
      await axios.get(`http://localhost:5000/ListProject/${this.page}/allproject/best_project/yes/faculty_id/1/id`)
        .then(response => {
          this.names = response.data[0];
          console.log(this.pages)
        })
        .catch(error => console.log(error))


    },
    async backPage(page) {

      if (this.page < (this.pages + 1) && this.page > 1) {
        this.page -= 1
      }
      else {
        return this.page = 1;
      }
      await axios.get(`http://localhost:5000/ListProject/${this.page}/allproject/best_project/yes/faculty_id/1/id`)
        .then(response => {
          this.names = response.data[0];

        })
        .catch(error => console.log(error))

    },
    async firstPage(page) {

      this.page = 1
      await axios.get(`http://localhost:5000/ListProject/${this.page}/allproject/best_project/yes/faculty_id/1/id`)
        .then(response => {
          this.names = response.data[0];

        })
        .catch(error => console.log(error))

    },
    async lastPage(page) {

      this.page = this.pages
      await axios.get(`http://localhost:5000/ListProject/${this.page}/allproject/best_project/yes/faculty_id/1/id`)
        .then(response => {
          this.names = response.data[0];

        })
        .catch(error => console.log(error))

    },

    async fetchData() {
      await axios.get(`http://localhost:5000/searchProject/allproject/best_project/yes/faculty_id/1/title/date/${this.search}`)
        .then(response => {
          this.names = response.data[1];
          console.log(this.pages)
        })
        .catch(error => console.log(error))
    }
  }
}

</script>