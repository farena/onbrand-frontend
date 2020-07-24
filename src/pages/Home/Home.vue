<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <div class="container">
        <a class="navbar-brand" href="#">OnBrand</a>
        <a class="text-light ml-auto" href="#" @click="logOut">Log Out</a>
      </div>
    </nav>

    <main role="main" class="container-fluid">
        <router-view />
    </main>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions(['logout']),
    logOut() {
      this.logout().then(() => {
        this.$router.push({ name: 'login' });
      });
    },
  },
};
</script>

<style scoped>
  main {
    margin-top: 100px
  }
</style>
