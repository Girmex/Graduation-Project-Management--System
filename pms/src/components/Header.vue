<template>
        <img src="../assets/bit.jpg" alt="">

        <nav class="bg-sky-900 ">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-full">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <img class="h-8 w-8" src="../assets/logo.png" alt="Logo">
          </div>
        </div>
        <div class="hidden md:flex items-center">
          <div class="ml-auto">
            <div class="flex items-center space-x-4">
              <li><router-link to="/" class="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-xl font-medium"> Home</router-link></li>
              <li><router-link to="/Allprojects" class="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-xl font-medium"> All Projects</router-link></li>
              <li><router-link to="/BestProjects" class="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-xl font-medium"> Best Projects</router-link></li>
              <li><router-link to="/Login" class="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-xl font-medium"> Login</router-link></li>
            </div>
          </div>
        </div>
        <div class="-mr-2 flex md:hidden">
          <!-- Menu icon -->
          <button @click="toggleMenu" class="text-gray-300 hover:bg-gray-700 focus:outline-none focus:bg-gray-700 p-2 rounded-md">
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          <!-- Close icon -->
          <button v-if="isMenuOpen" @click="toggleMenu" class="text-gray-300 hover:bg-gray-700 focus:outline-none focus:bg-gray-700 p-2 rounded-md">
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>
      <!-- Mobile menu -->
      <div v-if="isMenuOpen" class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <li><router-link to="/" class="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-xl font-medium"> Home</router-link></li>
              <li><router-link to="/AllProjects" class="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-xl font-medium"> All Projects</router-link></li>
              <li><router-link to="/BestProjects" class="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-xl font-medium"> Best Projects</router-link></li>
              <li><router-link to="/Login" class="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-xl font-medium"> Login</router-link></li>
        </div>
      </div>
    </div>
  </nav>


  
</template>

<script>
export default {

  name:'Header',
  data() {
    return {
      isMenuOpen: false,
    };
  },

  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
};
</script>
