import Vue from 'vue';
import Vuex from 'vuex';
import http from '../config/axios'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    products: [],
    listCart : [],
    showCart : false,
    user: {},
    details: {},
    showModal: false,
  },
  mutations: {
    SET_LOGIN(state, data) {
      state.isLoggedIn = data
    },
    SET_SHOW_CART(state, data) {
      state.showCart = data
    },
    SET_PRODUCTS(state, data) {
      state.products = data
    },
    SET_LIST_CART(state, data) {
      state.listCart = data
    },
    SET_USER(state, data) {
      state.user = data
    },
    SET_DETAILS(state, data) {
      state.details = data
    },
    SET_SHOW_MODAL(state, data) {
      state.showModal = data
    }
  },
  actions: {
    setShowCart({ commit }, data) {
      commit('SET_SHOW_CART', data)
    },
    setLogOut({ commit, dispatch }) {
      dispatch('setUser', {})
      commit('SET_LOGIN', false)
    },
    login({ commit, dispatch }, user) {
      http.post('/login', {
        email: user.email,
        password: user.password
      })
      .then(({ data }) => {
        dispatch('setUser', {email: data.email, name: data.name})
        localStorage.access_token = data.access_token
        localStorage.name = data.name
        localStorage.email = data.email
        commit('SET_LOGIN', true)
        // router.push({ name: 'Dashboard' })
      })
    },
    getProducts({ commit}) {
      http.get('/products')
      .then(({ data }) => {
        commit('SET_PRODUCTS', data)
      })
      .catch(({ response }) => {
        console.log(response.data.message)
      })
    },
    addToCart({ dispatch }, data) {
      http.post('/my-cart', {
        productId: data.id,
        quantity: data.quantity
      }, {
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then(({ data }) => {
        dispatch('getCarts')
      })
      .catch(({ response }) => {
        console.log(response.data.message)
      })
    },
    getCarts({ commit }) {
      http.get('/my-cart', {
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then(({ data }) => {
        commit('SET_LIST_CART', data)
      })
      .catch(({ response }) => {
        console.log(response.data.message)
      })
    },
    setUser({ commit }, data) {
      commit('SET_USER', data)
    },
    editQuantity({ dispatch }, data) {
      http.put('/my-cart', {
        quantity: data.quantity,
        total_price: data.total_price,
        id: data.id
      }, {
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then(() => {
        dispatch('getCarts')
      })
      .catch(( err) => {
        console.log(err.response)
      })
    },
    deleteCart({ dispatch }, id) {
      http.delete(`/my-cart?id=${id}`, {
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then(() => {
        dispatch('getCarts')
      })
      .catch(( err) => {
        console.log(err.response)
      })
    },
    checkout({ dispatch }) {
      http.put('/my-cart/pay', {}, {
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then(() => {
        dispatch('getCarts')
      })
      .catch(( err) => {
        console.log(err.response)
      })
    },
    getDetail({ commit }, id) {
      http.get(`/products/${id}`, {
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then(({ data }) => {
        commit('SET_DETAILS', data)
      })
      .catch(( err) => {
        console.log(err.response)
      })
    },
    register({ dispatch }, newUser) {
      http.post('/register', newUser)
      .then(() => {
        dispatch('login', newUser)
      })
      .catch(( err) => {
        console.log(err.response)
      })
    },
    setShowModal({ commit }, data) {
      commit('SET_SHOW_MODAL', data)
    }
      
  },
});
