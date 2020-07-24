/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
export default {
  methods: {
    showError(err) {
      console.log(err);
      if (typeof err.response.data.error === 'object') {
        for (const i in err.response.data.error) {
          for (const a in err.response.data.error[i]) {
            this.$noty.error(err.response.data.error[i][a]);
          }
        }
      } else {
        if (err.response.data.code === 401) this.$store.dispatch('logout').then(() => this.$router.push({ name: 'login' }));

        this.$noty.error(err.response.data.error);
      }
    },
  },
};
