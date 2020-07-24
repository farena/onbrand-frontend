import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import errorHandler from './mixins/errorHandler';

Vue.config.productionTip = false;

/** General Mixin */
Vue.mixin(errorHandler);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
