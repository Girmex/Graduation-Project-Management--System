
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 h-1/6 font-serif">

    <div class="flex shadow-md shadow-slate-300 m-7">
      <div class="border-r border-gray-200 p-2 shadow-sm shadow-slate-300 hover:bg-black hover:text-white bg-blue-300">
        <RouterLink
          :to="{ name: 'studentProject', params: { id: this.$route.params.id, group: this.$route.params.group } }">
          <svg class="w-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
            stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <br><label class="text-sm">View</label>
        </RouterLink>
      </div>
      <div class="p-2"><span class="text-black "><span class="font-bold ">My project Title</span><br>{{ this.title
      }}</span></div>
    </div>
    <div class="flex shadow-md shadow-slate-300 m-7">
      <div class="border-r border-gray-200 p-2 shadow-sm shadow-slate-300 bg-orange-300 hover:bg-black hover:text-white">
        <RouterLink
          :to="{ name: 'studentAdvisor', params: { id: this.$route.params.id, group: this.$route.params.group } }">
          <svg class="w-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
            stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg><br><label class="text-sm">View</label>
        </RouterLink>
      </div>
      <div class="p-2"><span class="text-black "><span class="font-bold ">Advisor</span><br>{{ this.advisor }}</span>
      </div>
    </div>
    <div class="flex shadow-md shadow-slate-300 m-7">
      <div class="border-r border-gray-200 p-2 shadow-sm shadow-slate-300 bg-green-300 hover:bg-black hover:text-white">
        <RouterLink class=""
          :to="{ name: 'studentDepartmentProject', params: { id: this.$route.params.id, group: this.$route.params.group } }">
          <svg class="w-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
            stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg><br><label class="text-sm">View</label>
        </RouterLink>
      </div>
      <div class="p-2"><span class="text-black font-bold">{{ this.departmentProject }}<br>{{ this.departmentName }}
          Projects</span></div>
    </div>

    <div class="shadow-md shadow-slate-300 m-7">
      <div class="flex shadow-md shadow-slate-300  ">
        <svg xmlns="http://www.w3.org/2000/svg" class='w-16 bg-red-300 h-16 p-2' xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="256" height="256" viewBox="0 0 256 256" xml:space="preserve">

<defs>
</defs>
<g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
	<path d="M 57.532 48.745 l -4.36 -0.734 c -1.205 -0.203 -2.08 -1.143 -2.08 -2.259 l -0.017 -0.704 c 1.93 -1.887 3.176 -4.436 3.409 -7.218 c 0 -0.003 -0.001 -0.005 -0.001 -0.008 c 0 -0.004 0.003 -0.007 0.003 -0.011 l 0.328 -5.095 c 1.846 -2.839 2.446 -5.396 1.762 -7.599 c -0.633 -2.036 -2.348 -3.737 -5.105 -5.068 c 0.214 -0.126 0.49 -0.271 0.843 -0.434 c 0.367 -0.168 0.597 -0.541 0.582 -0.944 c -0.014 -0.403 -0.27 -0.758 -0.647 -0.9 c -5.123 -1.925 -11.641 -1.687 -14.852 3.094 c -1.716 0.675 -2.964 1.935 -3.536 3.578 c -0.813 2.336 -0.213 5.262 1.669 8.262 l 0.31 5.127 c 0.234 2.791 1.488 5.346 3.427 7.235 l -0.017 0.712 c 0 1.092 -0.875 2.031 -2.08 2.234 l -4.36 0.734 c -1.662 0.279 -3.111 1.217 -3.977 2.573 c -0.539 0.844 -0.824 1.811 -0.824 2.796 v 18.407 c 0 0.553 0.448 1 1 1 h 32.323 c 0.553 0 1 -0.447 1 -1 V 54.114 C 62.332 51.472 60.313 49.214 57.532 48.745 z M 35.748 25.098 c 0.407 -1.17 1.314 -2.021 2.625 -2.463 c 0.221 -0.075 0.408 -0.224 0.531 -0.421 c 1.583 -2.557 4.369 -3.577 7.324 -3.577 c 1.084 0 2.189 0.137 3.268 0.386 c -0.38 0.359 -0.609 0.732 -0.706 1.137 c -0.116 0.484 0.142 0.979 0.604 1.163 c 2.957 1.17 4.73 2.646 5.271 4.387 c 0.304 0.979 0.234 2.097 -0.206 3.345 c -0.104 -0.188 -0.233 -0.353 -0.391 -0.492 c -0.382 -0.337 -0.881 -0.469 -1.385 -0.375 c -1.847 0.289 -3.885 0.427 -6.258 -0.48 c -2.708 -1.134 -6.116 -2.249 -8.442 -0.799 c -0.867 0.541 -1.503 1.363 -1.917 2.485 C 35.445 27.782 35.328 26.306 35.748 25.098 z M 37.833 37.686 l -0.319 -5.274 c 0.124 -1.969 0.637 -3.25 1.528 -3.806 c 1.567 -0.977 4.523 0.073 6.64 0.958 c 2.733 1.046 5.1 0.926 7.096 0.632 c 0.072 0.268 0.131 0.855 0.055 2.14 c 0 0 0 0.001 0 0.001 L 52.49 37.67 c -0.309 3.655 -2.737 6.823 -6.187 8.069 c -0.368 0.133 -0.752 0.2 -1.141 0.2 c -0.39 0 -0.774 -0.067 -1.142 -0.2 C 40.567 44.492 38.138 41.321 37.833 37.686 z M 41.174 46.563 c 0.675 0.423 1.4 0.78 2.167 1.057 c 0.586 0.212 1.199 0.319 1.821 0.319 c 0.622 0 1.234 -0.107 1.821 -0.319 c 0.774 -0.28 1.505 -0.64 2.186 -1.068 c 0.231 1.183 0.986 2.199 2.046 2.829 l -6.053 6.192 l -6.046 -6.184 C 40.183 48.759 40.943 47.741 41.174 46.563 z M 60.332 71.521 h -6.467 v -6.535 c 0 -0.553 -0.447 -1 -1 -1 s -1 0.447 -1 1 v 6.535 H 38.476 v -6.535 c 0 -0.553 -0.448 -1 -1 -1 s -1 0.447 -1 1 v 6.535 h -6.467 V 54.114 c 0 -0.604 0.176 -1.198 0.509 -1.72 c 0.562 -0.88 1.518 -1.491 2.623 -1.677 l 3.845 -0.648 l 7.461 7.632 c 0.188 0.192 0.446 0.301 0.715 0.301 s 0.527 -0.108 0.715 -0.301 l 7.462 -7.635 l 3.861 0.65 c 1.814 0.306 3.132 1.733 3.132 3.396 V 71.521 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
	<path d="M 85.781 44.547 l -3.723 -0.627 c -0.958 -0.161 -1.653 -0.903 -1.653 -1.787 l -0.013 -0.54 c 0.115 -0.114 0.212 -0.245 0.322 -0.364 h 4.53 c 1.467 0 2.66 -1.193 2.66 -2.66 v -10.34 c 0 -6.116 -5.697 -11.092 -12.7 -11.092 s -12.7 4.976 -12.7 11.092 v 10.34 c 0 1.466 1.193 2.66 2.66 2.66 h 4.515 c 0.115 0.125 0.216 0.262 0.337 0.382 l -0.013 0.547 c 0 0.86 -0.695 1.602 -1.653 1.763 l -3.722 0.627 c -1.23 0.207 -2.336 0.827 -3.112 1.745 c -0.356 0.421 -0.304 1.053 0.118 1.409 c 0.188 0.159 0.417 0.236 0.645 0.236 c 0.284 0 0.566 -0.12 0.765 -0.354 c 0.471 -0.557 1.152 -0.935 1.917 -1.063 l 3.206 -0.54 l 6.315 6.461 c 0.188 0.192 0.445 0.301 0.715 0.301 s 0.527 -0.108 0.715 -0.301 l 6.317 -6.463 l 3.221 0.542 C 86.927 46.769 88 47.927 88 49.274 v 14.713 h -5.228 v -5.432 c 0 -0.553 -0.447 -1 -1 -1 s -1 0.447 -1 1 v 5.432 H 69.636 v -5.432 c 0 -0.553 -0.447 -1 -1 -1 s -1 0.447 -1 1 v 5.432 h -2.177 c -0.553 0 -1 0.447 -1 1 s 0.447 1 1 1 H 89 c 0.553 0 1 -0.447 1 -1 V 49.274 C 90 46.947 88.226 44.959 85.781 44.547 z M 76.121 41.988 c -0.297 0.107 -0.608 0.162 -0.925 0.162 s -0.627 -0.055 -0.925 -0.162 c -2.894 -1.045 -4.93 -3.703 -5.185 -6.746 l -0.262 -4.34 c 0.963 -2.471 3.052 -2.305 6.61 -1.792 c 1.997 0.289 4.197 0.6 6.1 -0.02 l -0.228 6.138 C 81.046 38.291 79.011 40.944 76.121 41.988 z M 65.164 39.229 c -0.364 0 -0.66 -0.296 -0.66 -0.66 v -10.34 c 0 -5.014 4.8 -9.092 10.7 -9.092 s 10.7 4.079 10.7 9.092 v 10.34 c 0 0.364 -0.296 0.66 -0.66 0.66 h -3.098 c 0.63 -1.172 1.039 -2.472 1.154 -3.843 c 0.001 -0.008 -0.003 -0.015 -0.003 -0.023 c 0 -0.008 0.005 -0.015 0.006 -0.024 l 0.293 -7.875 c 0.002 -0.047 -0.017 -0.089 -0.022 -0.135 c -0.007 -0.07 -0.012 -0.139 -0.034 -0.207 c -0.022 -0.069 -0.059 -0.128 -0.095 -0.19 c -0.023 -0.039 -0.031 -0.084 -0.06 -0.121 c -0.009 -0.011 -0.022 -0.016 -0.031 -0.027 c -0.046 -0.055 -0.104 -0.095 -0.161 -0.138 c -0.048 -0.037 -0.091 -0.078 -0.144 -0.105 c -0.051 -0.026 -0.109 -0.037 -0.165 -0.054 c -0.07 -0.021 -0.137 -0.045 -0.21 -0.051 c -0.014 -0.001 -0.026 -0.009 -0.04 -0.01 c -0.048 -0.002 -0.09 0.017 -0.136 0.022 c -0.069 0.007 -0.136 0.011 -0.203 0.033 c -0.065 0.021 -0.121 0.056 -0.18 0.09 c -0.044 0.025 -0.092 0.035 -0.133 0.066 c -1.512 1.179 -3.818 0.846 -6.261 0.492 c -3.263 -0.47 -7.326 -1.058 -8.848 3.272 c -0.001 0.002 -0.001 0.003 -0.002 0.005 c 0 0 0 0 0 0 c -0.008 0.024 -0.004 0.048 -0.01 0.072 c -0.028 0.102 -0.051 0.207 -0.045 0.319 l 0 0.001 c 0 0 0 0.001 0 0.001 l 0.277 4.584 c 0.115 1.371 0.524 2.671 1.154 3.843 H 65.164 z M 75.196 50.311 l -4.933 -5.046 c 0.811 -0.529 1.393 -1.319 1.622 -2.231 c 0.54 0.324 1.102 0.617 1.707 0.836 c 0.517 0.186 1.056 0.28 1.604 0.28 c 0.549 0 1.089 -0.094 1.604 -0.281 c 0.611 -0.221 1.178 -0.518 1.723 -0.846 c 0.228 0.916 0.806 1.705 1.612 2.235 L 75.196 50.311 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
	<path d="M 28.895 47.894 c 0.465 -0.297 0.602 -0.915 0.305 -1.381 c -0.768 -1.204 -2.054 -2.037 -3.528 -2.285 l -3.768 -0.635 c -0.976 -0.164 -1.684 -0.92 -1.685 -1.821 l -0.014 -0.552 c 1.666 -1.649 2.742 -3.863 2.944 -6.28 c 0 -0.003 -0.001 -0.006 -0.001 -0.01 c 0 -0.004 0.002 -0.006 0.003 -0.01 l 0.281 -4.37 c 1.602 -2.476 2.121 -4.714 1.519 -6.649 c -0.54 -1.738 -1.967 -3.197 -4.25 -4.348 c 0.14 -0.075 0.303 -0.156 0.494 -0.244 c 0.367 -0.168 0.596 -0.541 0.582 -0.944 c -0.015 -0.403 -0.27 -0.758 -0.648 -0.9 c -4.465 -1.677 -10.147 -1.471 -12.972 2.69 c -1.5 0.602 -2.592 1.712 -3.095 3.158 c -0.713 2.051 -0.195 4.608 1.438 7.225 l 0.266 4.401 c 0.203 2.425 1.284 4.647 2.96 6.298 l -0.013 0.558 c 0 0.876 -0.708 1.632 -1.684 1.796 l -3.768 0.635 C 1.792 44.644 0 46.651 0 49.002 v 15.906 c 0 0.553 0.448 1 1 1 h 23.882 c 0.552 0 1 -0.447 1 -1 s -0.448 -1 -1 -1 h -2.267 v -5.511 c 0 -0.553 -0.448 -1 -1 -1 s -1 0.447 -1 1 v 5.511 H 9.317 v -5.511 c 0 -0.553 -0.448 -1 -1 -1 s -1 0.447 -1 1 v 5.511 H 2 V 49.002 c 0 -1.37 1.091 -2.549 2.593 -2.802 l 3.252 -0.548 l 6.398 6.545 c 0.188 0.192 0.446 0.301 0.715 0.301 s 0.527 -0.108 0.715 -0.301 l 6.4 -6.547 l 3.266 0.55 c 0.917 0.154 1.71 0.661 2.175 1.389 c 0.19 0.299 0.514 0.462 0.844 0.462 C 28.542 48.051 28.729 48 28.895 47.894 z M 6.952 23.971 c 0.337 -0.97 1.092 -1.677 2.183 -2.044 c 0.221 -0.075 0.408 -0.224 0.531 -0.421 c 1.34 -2.164 3.703 -3.027 6.213 -3.027 c 0.847 0 1.711 0.098 2.558 0.278 c -0.247 0.276 -0.402 0.563 -0.475 0.873 c -0.115 0.483 0.143 0.979 0.604 1.161 c 2.516 0.996 4.021 2.242 4.476 3.706 c 0.232 0.749 0.202 1.599 -0.089 2.542 c -0.062 -0.079 -0.131 -0.153 -0.207 -0.22 c -0.363 -0.319 -0.837 -0.442 -1.306 -0.356 c -1.577 0.246 -3.318 0.365 -5.335 -0.406 c -2.371 -0.993 -5.356 -1.967 -7.42 -0.68 c -0.688 0.429 -1.212 1.052 -1.578 1.883 C 6.687 26.027 6.628 24.902 6.952 23.971 z M 8.487 30.247 c 0.105 -1.651 0.527 -2.72 1.256 -3.175 c 1.301 -0.811 3.812 0.083 5.618 0.839 c 2.331 0.891 4.354 0.813 6.074 0.572 c 0.045 0.256 0.073 0.748 0.018 1.688 c 0 0 0 0.001 0 0.001 l -0.296 4.602 c -0.261 3.108 -2.324 5.801 -5.257 6.861 c 0 0 0 0 -0.001 0 c 0 0 0 0 0 0 c -0.302 0.109 -0.618 0.165 -0.939 0.165 s -0.638 -0.056 -0.94 -0.165 c -2.934 -1.06 -4.998 -3.754 -5.256 -6.84 L 8.487 30.247 z M 14.958 50.067 l -5.012 -5.128 c 0.83 -0.537 1.425 -1.344 1.653 -2.276 c 0.549 0.331 1.122 0.63 1.738 0.853 c 0.521 0.189 1.066 0.285 1.621 0.285 c 0.553 0 1.098 -0.096 1.618 -0.284 c 0.001 0 0.002 0 0.003 0 c 0.623 -0.225 1.201 -0.529 1.756 -0.864 c 0.228 0.936 0.82 1.742 1.643 2.279 L 14.958 50.067 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
</g>
</svg>
        <div class="p-2">
          <span class="text-black font-bold">

            {{ this.numberOfGroupMember }}<br>Group Members</span>
        </div>
      </div>
      <div class="mt-4">
        <ul >
          <li class="text-left px-2 flex justify-between" v-for="group in studentGroup" :key="group.id">
            {{ group.first_name }} {{ group.second_name }} {{ group.last_name }}</li>


        </ul>

      </div>
    </div>
    <div class="shadow-md shadow-slate-300 m-7">
      <div class="flex shadow-md shadow-slate-300  ">
        <svg class='w-16 bg-red-300 h-16 p-2' xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="256" height="256" viewBox="0 0 256 256" xml:space="preserve">

<defs>
</defs>
<g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
	<path d="M 70.24 20.934 c 4.069 0 7.378 3.31 7.378 7.378 v 3.722 c 0 4.069 -3.31 7.378 -7.378 7.378 c -4.069 0 -7.378 -3.31 -7.378 -7.378 v -3.722 C 62.862 24.244 66.172 20.934 70.24 20.934 M 70.24 17.934 L 70.24 17.934 c -5.708 0 -10.379 4.67 -10.379 10.378 v 3.722 c 0 5.708 4.67 10.378 10.378 10.378 h 0 c 5.708 0 10.378 -4.67 10.378 -10.378 v -3.722 C 80.619 22.604 75.948 17.934 70.24 17.934 L 70.24 17.934 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
	<path d="M 19.76 20.934 c 4.069 0 7.378 3.31 7.378 7.378 v 3.722 c 0 4.069 -3.31 7.378 -7.379 7.378 c -4.069 0 -7.378 -3.31 -7.378 -7.378 v -3.722 C 12.381 24.244 15.691 20.934 19.76 20.934 M 19.76 17.934 L 19.76 17.934 c -5.708 0 -10.379 4.67 -10.379 10.378 v 3.722 c 0 5.708 4.67 10.378 10.378 10.378 h 0 c 5.708 0 10.378 -4.67 10.378 -10.378 v -3.722 C 30.138 22.604 25.468 17.934 19.76 17.934 L 19.76 17.934 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
	<path d="M 63.291 62.979 H 32.709 c -0.829 0 -1.5 -0.672 -1.5 -1.5 s 0.671 -1.5 1.5 -1.5 h 30.582 c 0.828 0 1.5 0.672 1.5 1.5 S 64.119 62.979 63.291 62.979 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
	<path d="M 63.291 62.979 c -0.362 0 -0.726 -0.13 -1.014 -0.395 l -5.894 -5.404 c -0.61 -0.56 -0.651 -1.509 -0.092 -2.119 c 0.561 -0.609 1.509 -0.652 2.119 -0.092 l 5.894 5.404 c 0.61 0.56 0.651 1.509 0.092 2.119 C 64.101 62.815 63.696 62.979 63.291 62.979 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
	<path d="M 57.397 68.384 c -0.405 0 -0.81 -0.164 -1.105 -0.486 c -0.56 -0.61 -0.519 -1.56 0.092 -2.119 l 5.894 -5.404 c 0.611 -0.559 1.56 -0.518 2.119 0.092 c 0.56 0.61 0.519 1.56 -0.092 2.119 l -5.894 5.404 C 58.123 68.253 57.76 68.384 57.397 68.384 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
	<path d="M 57.291 52.979 H 26.709 c -0.829 0 -1.5 -0.672 -1.5 -1.5 s 0.671 -1.5 1.5 -1.5 h 30.582 c 0.828 0 1.5 0.672 1.5 1.5 S 58.119 52.979 57.291 52.979 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
	<path d="M 26.71 52.979 c -0.406 0 -0.81 -0.164 -1.106 -0.486 c -0.56 -0.61 -0.519 -1.56 0.092 -2.119 l 5.894 -5.404 c 0.61 -0.56 1.559 -0.52 2.119 0.092 c 0.56 0.61 0.519 1.56 -0.092 2.119 l -5.894 5.404 C 27.435 52.849 27.072 52.979 26.71 52.979 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
	<path d="M 32.603 58.384 c -0.362 0 -0.725 -0.13 -1.013 -0.395 l -5.894 -5.404 c -0.611 -0.56 -0.652 -1.509 -0.092 -2.119 c 0.56 -0.609 1.508 -0.652 2.119 -0.092 l 5.894 5.404 c 0.611 0.56 0.652 1.509 0.092 2.119 C 33.413 58.22 33.008 58.384 32.603 58.384 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
	<path d="M 36.519 65.529 V 69.5 H 3 v -9.522 c 0 -6.251 4.457 -11.698 10.501 -13.015 c 1.986 0.869 4.087 1.308 6.259 1.308 c 1.718 0 3.388 -0.286 4.995 -0.831 l 3.224 -3.046 c -0.771 -0.238 -1.561 -0.434 -2.375 -0.556 c -1.756 0.909 -3.74 1.432 -5.844 1.432 s -4.088 -0.523 -5.844 -1.432 C 6.069 45.01 0 51.819 0 59.978 v 10.736 C 0 71.696 0.804 72.5 1.786 72.5 h 35.947 c 0.983 0 1.786 -0.804 1.786 -1.786 v -5.184 H 36.519 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
	<path d="M 76.084 43.839 c -1.756 0.909 -3.74 1.432 -5.844 1.432 c -2.104 0 -4.088 -0.523 -5.844 -1.432 c -3.448 0.515 -6.552 2.119 -8.949 4.447 h 5.024 c 1.087 -0.595 2.262 -1.051 3.51 -1.323 c 1.986 0.869 4.087 1.308 6.259 1.308 s 4.273 -0.44 6.259 -1.308 C 82.543 48.28 87 53.727 87 59.978 V 69.5 H 53.481 v -3.971 h -3 v 5.184 c 0 0.983 0.804 1.786 1.786 1.786 h 35.947 c 0.983 0 1.786 -0.804 1.786 -1.786 V 59.978 C 90 51.819 83.931 45.01 76.084 43.839 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
</g>
</svg>
        <div class="p-2">
          <span class="text-black font-bold">

            {{ this.numberOfExaminer }}<br>Examiners</span>
        </div>
      </div>
      <div class="mt-4">
        <ul >
          <li class="text-left px-2 flex justify-between" v-for="group in examinerList" :key="group.id">
            {{ group.first_name }} {{ group.second_name }} {{ group.last_name }}</li>


        </ul>

      </div>
    </div>
    <div class="shadow-md shadow-slate-300  m-7">
      <div class="flex shadow-md shadow-slate-300  ">
        <svg class="w-14 text-red-500 pr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
        </svg>
        <div class="p-2"><span class="text-black font-bold">{{ this.numberOfAdvisorProject }}<br>Advisors Projects</span>
        </div>
      </div>
      <div class="mt-4">
        <ul  >
          <li class="text-left  mb-1 px-2 flex justify-between" v-for="group in advisorProject" :key="group.id"><span>{{
            group.title }}</span>
            <RouterLink class="px-2 text-white rounded bg-blue-500 hover:bg-blue-900"
              :to="{ name: 'studentProjectDetail', params: { id: this.$route.params.id, group: group.id } }">View
            </RouterLink>
          </li>


        </ul>

      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: 'studentHome',
  components: {

  },
  data() {

    return {
      studentGroup: [],
      examinerList: [],
      advisorProject: [],
      departmentName: '',
      departmentProject: '',
      numberOfGroupMember: '',
      numberOfExaminer: '',
      numberOfAdvisorProject: '',
      title: '',
      advisor: '',
      examiner: '',
      type: '',
      value: '',
      group: '1',
      projectChair: '',
      year: '1',
      divStyle: 'm-8 bg-gray-200 border-solid border-2 border-blue-700 rounded-md ',
    }

  },
  async mounted() {
    let dat = new Date();
    this.year = dat.getFullYear();
    console.log(this.year)
    console.log(this.year)
    let token = localStorage.getItem('token')
    if (!token) {
      this.$router.push({ name: 'Login' })
    }
    let chairId = localStorage.getItem('chair_id');
    let departmentId = localStorage.getItem('department_id')
    let group = localStorage.getItem('group_id')


    await axios.get(`http://localhost:5000/listLength/students/group_id/${group}/date/1`)
      .then(response => {

        this.studentGroup = response.data[0];
        this.numberOfGroupMember = response.data[0].length;


        console.log(this.studentGroup)
      })
    await axios.get(`http://localhost:5000/listLength/allproject/id/${group}/date/1`)
      .then(response => {
        let result = response.data[0]
        this.title = result[0].title;
        this.advisor = result[0].advisor;
        this.projectChair = result[0].chair_id;
        this.departmentName = result[0].department_name;
        console.log(result)

        console.log(233, this.title)
      })
    await axios.get(`http://localhost:5000/listLength/project/id/${group}/date/1`)
      .then(response => {
        let result = response.data[0]
        this.examiner = result[0].group_id;

        console.log(this.examiner)
      })
    await axios.get(`http://localhost:5000/listLength/allproject/advisor/${this.advisor}/status/Uploaded`)
      .then(response => {

        this.advisorProject = response.data[1];
        this.numberOfAdvisorProject = response.data[1].length;


        console.log(this.advisorProject)
      })
    await axios.get(`http://localhost:5000/listLength/allproject/department_id/${departmentId}/status/Uploaded`)
      .then(response => {

        this.departmentProject = response.data[1].length;


        console.log(this.advisorProject)
      })
    if (this.projectChair == null) {
      this.type = 'department_id';
      this.value = departmentId
    }
    else {
      this.type = 'chair_id';
      this.value = chairId
    }
    console.log(this.type, this.value)
    console.log(this.examiner)
    await axios.get(`http://localhost:5000/examinerList/${this.examiner}/${this.type}/${this.value}`)
      .then(response => {
        console.log(this.examiner)
        this.examinerList = response.data;
        this.numberOfExaminer = response.data.length;

        console.log(this.examinerList)
      })

  }
}
</script>