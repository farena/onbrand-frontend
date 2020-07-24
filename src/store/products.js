/* eslint-disable no-unused-vars */
import axios from 'axios';

export default {
  state: {
    products: {
      current_page: 1,
      from: 1,
      last_page: 1,
      per_page: 15,
      to: 15,
      total: 0,
    },
    product: null,
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    SET_PRODUCT(state, product) {
      state.product = product;
    },
  },
  actions: {
    getProducts({ commit }, params = {}) {
      return new Promise((resolve, reject) => {
        console.log(`${process.env.VUE_APP_BASE_URL}/api/products`.paginableUrl(params));
        axios.get(`${process.env.VUE_APP_BASE_URL}/api/products`.paginableUrl(params))
          .then((res) => {
            const result = res.data;
            result.data.map((x) => {
              const finalProds = x;
              // eslint-disable-next-line eqeqeq
              finalProds.is_approved = finalProds.is_approved == true ? 'YES' : 'NO';
              return finalProds;
            });
            commit('SET_PRODUCTS', result);
            resolve(res);
          })
          .catch((err) => {
            commit('SET_PRODUCTS', {
              current_page: 1,
              from: 1,
              last_page: 1,
              per_page: 15,
              to: 15,
              total: 0,
            });
            reject(err);
          });
      });
    },
    getProduct({ commit }, productId) {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_BASE_URL}/api/products/${productId}`)
          .then((res) => {
            commit('SET_PRODUCT', res.data.data);
            resolve(res);
          })
          .catch((err) => {
            commit('SET_PRODUCT', null);
            reject(err);
          });
      });
    },
    createProduct({ commit }, product) {
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_BASE_URL}/api/products`, product)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    updateProduct({ commit }, product) {
      return new Promise((resolve, reject) => {
        axios.put(`${process.env.VUE_APP_BASE_URL}/api/products/${product.id}`, product)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    deleteProduct({ commit }, product) {
      return new Promise((resolve, reject) => {
        axios.delete(`${process.env.VUE_APP_BASE_URL}/api/products/${product.id}`)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    approveProduct({ commit }, product) {
      return new Promise((resolve, reject) => {
        axios.put(`${process.env.VUE_APP_BASE_URL}/api/products/${product.id}/approve`)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
  getters: {
    products(state) {
      return state.products;
    },
    product(state) {
      return state.product;
    },
  },
};
