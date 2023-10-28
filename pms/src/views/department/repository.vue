<!-- FileCreate.vue -->
<template>
  <div class="container font-serif mx-auto py-8">
    <form @submit="handleSubmit" class="max-w-full mx-20  bg-white border border-gray-700 shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <label class="text-red-500" v-if="this.isNo">Please fill all the input field correctly</label>
      <div class="max-w-full  lg:flex mr-3 ">
        
        <div class="w-full lg:w-1/2 mr-4">
      <div class="flex mb-3">
        <label class="label py-1">Date:</label>        
          <input            
            type="date"            
            v-model="date" required
            class="py-1"
          />     
      </div>
      <div class="flex mb-2">
        <label for="name" class="py-1 pr-2 text-gray-700">Title:</label>
        <input type="text" id="name" v-model="title" required
          class="w-full px-4 py-1 border border-blue-500 rounded focus:outline-none focus:border-cyan-800" />
      </div>
      <div class="flex">
        <label for="authorId" class="py-1 pr-2 text-gray-700">Advisor:</label>
        <input type="text" id="authorId" v-model="advisor" required
          class="w-full px-4 py-1 border border-blue-500 rounded focus:outline-none focus:border-cyan-800" />
      </div>
      <div class=" my-3 ">
      <div class="field text-left  ">
        <label class="label py-1">Student 1</label>
        <div class="control">
          <div class="control">
          <input class="w-full border  border-blue-500 rounded py-1 placeholder:px-2" v-model="student1" placeholder="please insert student1" required>
        </div>
        </div>
      </div>
      <div class="field text-left  ">
        <label class="label py-1">Student 2</label>
        <div class="control">
         <div class="control">
          <input class="w-full border  border-blue-500 rounded py-1 placeholder:px-2" v-model="student2" placeholder="please insert student2" required>
        </div>
        </div>
      </div>
      <div class="field text-left ">
        <label class="label py-1">Student 3</label>
        <div class="control">
          <input class="w-full border  border-blue-500 rounded py-1 placeholder:px-2" v-model="student3" placeholder="please insert student3" required>
        </div>
      </div>
      <div class="field text-left ">
        <label class="label py-1">Student 4</label>
        <div class="control">
          <div class="control">
          <input class="w-full border  border-blue-500 rounded py-1 placeholder:px-2" v-model="student4" placeholder="please insert student4" required>
        </div>
        </div>
      </div>
    </div>
  </div>
  <div class="w-full lg:w-1/2">
      <div class="my-2">
        <div class="lg:flex">
          <label for="authorId" class="py-1 pr-2">Proposal:</label>
          <span class="py-1" v-if="file1">{{ file1.name }}</span>
          <label for="file1" class="bg-blue-500 hover:bg-blue-700 text-white ml-6 font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline cursor-pointer">
            <template v-if="file1">Replace File</template>
            <template v-else>Select File</template>
          </label>
          
        </div>
        <input type="file"  id="file1" @change="handleFile1Change" accept=".pdf" class="hidden" required>
      </div>
      <div class="mb-2">
        <div class="lg:flex">
          <label for="authorId" class="py-1 pr-2">Final:</label>
          <span class="py-1" v-if="file2">{{ file2.name }}</span>
          <label for="file2" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 ml-6 rounded focus:outline-none focus:shadow-outline cursor-pointer">
            <template v-if="file2">Replace File</template>
            <template v-else>Select File</template>
          </label>
          
        </div>
        <input type="file" id="file2" @change="handleFile2Change" accept=".pdf" class="hidden" required>
      </div>
      <div class="text-left">
        <label for="content" class=" text-gray-700">Description:</label>
        <textarea id="content" v-model="description" required
                    class="w-full h-40 px-4 py-2 border border-blue-500 rounded focus:outline-none focus:border-cyan-800 overflow-y-auto">
        </textarea>
      </div>
      <div class="text-left">
        <label for="content" class=" text-gray-700 mr-2">Best Project:</label>
        <select v-model="best_project" class="w-1/4 border  border-blue-500 rounded py-1 placeholder:px-2">
          <option value="Yes">Yes</option>
          <option selected value="">No</option>
        </select>
      </div>
    </div>
  </div>
    
      
      <div class="w-full">
        <button type="submit" class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Submit
        </button>
      </div>
    </form>
  </div>




  
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      title: '',
      student:[],
      description: '',
      date:'',
      faculty_id:'',
      chair_id:'',
      department_id:'',
      advisor: '',   
      student1:'',
      student2:'',
      student3:'',
      student4:'',
      best_project:'',
      status:'Repository',
      file1: null,
      file2: null,
      isNo:false
    };
  },
  mounted() {
    this.faculty_id=localStorage.getItem('faculty_id')
    console.log(this.faculty_id)
    this.department_id=localStorage.getItem('department_id')
    console.log(this.department_id);
    axios.get(`http://localhost:5000/ListLength/department_id/${this.department_id}`)
          .then(response => {
            
             this.student = response.data;
         
         console.log(this.student)
       })
  },
  methods: {
    handleFile1Change(event) {
      this.file1 = event.target.files[0];
    },
    handleFile2Change(event) {
      this.file2 = event.target.files[0];
    },
    handleSubmit(event) {
      event.preventDefault();
      const formData = new FormData();
      formData.append('title', this.title);
      formData.append('description', this.description);
      formData.append('advisor', this.advisor);
      formData.append('file1', this.file1);
      formData.append('file2', this.file2);
      formData.append('date', this.date);
      formData.append('faculty_id', this.faculty_id);
      formData.append('department_id', this.department_id);
      formData.append('chair_id', this.chair_id);
      formData.append('status',this.status );
      formData.append('student1',this.student1 );
      formData.append('student2',this.student2 );
      formData.append('student3',this.student3 );
      formData.append('student4',this.student4 );
      formData.append('best_project',this.best_project );

      if(this.date == '' || this.title =='' || this.advisor=='' || this.student1 =='' || this.description =='' 
       ){
        this.isNo=true
        console.log(this.isNo)
      }
      else{
      axios.post('http://localhost:5000/repo', formData)
        .then(response => {
       
        })
        alert('you have successfully submit repository!')
          this.title='',
          this.description='',
          this.advisor='',
          this.file1=null,
          this.file2=null,
          this.date='',
          this.student1='',
          this.student2='',
          this.student3='',
          this.student4=''
      }
}
  },
};
</script>

<style>
input[type="file"] {
  display: none;
}
</style>