<template>
<div class="signInContainer text-center">
  <form class="form-signin" @submit.prevent="signIn">
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input type="email"
        id="inputEmail"
        class="form-control"
        placeholder="Email address"
        v-model="form.email">
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password"
        id="inputPassword"
        class="form-control"
        placeholder="Password"
        v-model="form.password">
      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      <p class="mt-5 mb-3 text-muted">OnBrand © 2020</p>
    </form>
</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      form: {
        email: null,
        password: null,
      },
    };
  },
  methods: {
    ...mapActions(['login']),
    signIn() {
      if (!this.form.email || !this.form.password) {
        this.$noty.error('Complete the form first');
      } else {
        this.login(this.form)
          .then(() => this.$router.push({ name: 'products' }))
          .catch((err) => this.showError(err));
      }
    },
  },
};
</script>

<style>
html,
body {
  height: 100%;
}
</style>
<style scoped>
.signInContainer {
  height: 100%;
}

.signInContainer {
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -ms-flex-align: center;
  -ms-flex-pack: center;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
