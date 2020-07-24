import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/index';
import Login from '../pages/Login.vue';
import Home from '../pages/Home/Home.vue';
import Products from '../pages/Home/Products.vue';

Vue.use(VueRouter);

const auth = (to, from, next) => {
  if (store.getters.isLoggedIn) {
    next();
    return;
  }
  next({ name: 'login' });
};

const guest = (to, from, next) => {
  if (!store.getters.isLoggedIn) {
    next();
    return;
  }
  next({ name: 'home' });
};

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    beforeEnter: auth,
    children: [
      {
        path: '/products',
        name: 'products',
        component: Products,
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    beforeEnter: guest,
    component: Login,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
