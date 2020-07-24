import Vue from 'vue';
import VueNoty from 'vuejs-noty';
import VueTables from 'vue-tables';
import App from './App.vue';
import router from './router';
import store from './store';
import errorHandler from './mixins/errorHandler';
import 'vue-tables/dist/vue-tables.css';
import './assets/sass/vue-tables-custom.scss';
import 'vuejs-noty/dist/vuejs-noty.css';
import './assets/fontawesome/css/all.css';

Vue.config.productionTip = false;

/** Plugins */
Vue.use(VueNoty);
Vue.use(VueTables);

/** General Mixin */
Vue.mixin(errorHandler);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
