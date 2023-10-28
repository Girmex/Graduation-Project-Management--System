// mixins/authentication.js
export default {
  computed: {
    isAuthenticated() {
      const token = localStorage.getItem('token');
      return token !== null && token !== undefined;
    }
  },
  created() {
    if (!this.isAuthenticated) {
      this.redirectToLogin();
    }
  },
  methods: {
    redirectToLogin() {
      this.$router.push('/'); // Redirect to the login page if the token is not present
    }
  }
};
