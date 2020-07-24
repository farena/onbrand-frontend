/* eslint-disable radix */
/* eslint-disable no-unused-vars */
import axios from 'axios';

export default {
  state: {
    tokens: JSON.parse(localStorage.getItem('tokens')) || null,
    user: JSON.parse(localStorage.getItem('identity')) || null,
  },
  mutations: {
    AUTH_SUCCESS(state, { token, user }) {
      state.tokens = token;
      state.user = user;
      console.log(state);
    },
    LOGOUT(state) {
      state.tokens = null;
      state.user = null;
    },
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_BASE_URL}/api/login`, user)
          .then((res) => {
            // Set Tokens
            localStorage.setItem('tokens', JSON.stringify(res.data.data.token));

            // Set User
            localStorage.setItem('identity', JSON.stringify(res.data.data.user));

            // axios.defaults.headers.common['Authorization'] = token

            commit('AUTH_SUCCESS', {
              token: res.data.data.token,
              user: res.data.data.user,
            });
            resolve(res);
          })
          .catch((err) => {
            localStorage.removeItem('tokens');
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        commit('LOGOUT');
        localStorage.removeItem('tokens');
        localStorage.removeItem('identity');
        resolve();
      });
    },
  },
  getters: {
    getToken(state) {
      if (!state.tokens) return null;

      if (Date.now() > parseInt(state.tokens.expires_at)) {
        return null;
      }

      return state.tokens.access_token;
    },
    isLoggedIn(state, getters) {
      return getters.getToken != null;
    },
    getUser(state) {
      return state.user;
    },
  },
};
