// tokenExpirationMixin.js
export default {
    mounted() {
      const storedToken = localStorage.getItem('token');
      
      if (!storedToken) {
        this.redirectToLogin();
        return;
      }
      
      const tokenData = JSON.parse(storedToken);
      const currentTime = new Date().getTime();
      
      if (currentTime > tokenData.expiration) {
        this.redirectToLogin();
      }
      console.log('Token expiration check executed.');

    },
    
    methods: {
      redirectToLogin() {
        this.$router.push('/Login');
      }
    }
  };
  