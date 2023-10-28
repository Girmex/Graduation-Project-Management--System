<template>
  <div class="flex font-serif">
    <RouterView class="w-full" :key="$route.path"></RouterView>
    <div class="absolute right-2">
     
      <div :class="divStyle">
        <div class="border-b-2 border-blue-900 bg-blue-500 text-white">Project Categories</div>
        <ul class="text-left ">
            <li class="pl-8 py-1 bg-gray-200 hover:bg-gray-500 hover:text-white"><RouterLink :to="{name:'departmentAllProject' ,params:{departmentId:this.$route.params.departmentId}}"><span :class="mainlistStyle">All projects</span></RouterLink></li>                 
            <li class="pl-8 py-1 bg-gray-200 hover:bg-gray-500 hover:text-white"><RouterLink :to="{name:'departmentCompletedProject', params:{departmentId:this.$route.params.departmentId,type:'status',value:'Completed'}}">Completed Projects</RouterLink></li>
            <li class="pl-8 py-1 bg-gray-300 hover:bg-gray-500 hover:text-white"><RouterLink :to="{name:'departmentCompletedProject', params:{departmentId:this.$route.params.departmentId,type:'status !',value:'Completed'}}">Projects in Progress</RouterLink></li>               
            <li class="pl-8 py-1 bg-gray-200 hover:bg-gray-500 hover:text-white"><RouterLink :to="{name:'departmentFormGroup',params:{departmentId:this.$route.params.departmentId}}"><span :class="mainlistStyle">Create New Project</span></RouterLink></li>               
            <li class="pl-8 py-1 bg-gray-300 hover:bg-gray-500 hover:text-white"><RouterLink :to="{name:'departmentStudentGroup',params:{departmentId:this.$route.params.departmentId}}">Add Project Member</RouterLink></li>
            
        </ul>
      </div>
      <div :class="divStyle" >
              <div class="border-b-2  border-blue-900 bg-blue-500 text-white">Chair <span class="text-right bg-gray-500 px-1 rounded-sm"> {{ this.numberOfChairs }}</span></div>
              <ul class="text-left pt-2">
                                              
                  <li v-for="chair in this.chairs " :key="chair.id" class="pl-8 py-1 bg-gray-300 hover:bg-gray-500 hover:text-white">  <RouterLink :to="{name:'departmentCompletedProject', params:{departmentId:this.$route.params.departmentId,type:'project.chair_id',value:chair.id}}">{{ chair.name }}</RouterLink>
                  </li>
                                      
              </ul>
          </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'departmentProject',
  data() {
    return {
      divStyle: 'm-5 bg-gray-200 border-solid border-2 border-blue-700 rounded-md  ',
      style:
        'border-2 rounded-l-lg border-blue-500 ml-12 mr-6 px-4 py-1 hover:border-black font-serif',    
      
      chairs:[],
      numberOfChairs:''
     
    }
  },
  mounted() {
    let token=localStorage.getItem('token')
      if(!token){
       this.$router.push({name:'Login'})
    }
    axios.get(`http://localhost:5000/chairList/department_id/${this.$route.params.departmentId}`)
                  .then(response => {
                    this.chairs = response.data;
                     this.numberOfChairs = response.data.length;
             
             console.log(this.stream)
           })
              
  },
  methods: {}
}
</script>
