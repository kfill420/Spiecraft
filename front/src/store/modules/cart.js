import instanceAxios from '@/components/service/instance';
import { jwtDecode } from 'jwt-decode';

const state = {
  cart: [],
};

const mutations = {
  addToCart(state, product) {
    state.cart.push(product);
  },
  removeFromCart(state, productId) {
    state.cart = state.cart.filter(product => product.id !== productId);
  },
  setCart(state, cart) {
    state.cart = cart;
  },
};

const actions = {
  async addToCart({ commit }, product) {
    try {
      const reponse = await instanceAxios.post(`/cart`, product);
      commit('setCart', reponse.data.productCarts);
    } catch (error) {
      console.log(error);
    }
  },
  async removeFromCart({ commit }, { userId, productId }) {
    try {
      const response = await instanceAxios.delete(`/cart/${userId}/${productId}`);
      const pId = response.data.productCart.id;
      commit('removeFromCart', pId);
    } catch (error) {
      console.log(error);
    }
  },
  async fetchCart({ commit }) {
    try {
      const token = localStorage.getItem('token');
      if (!token)
        throw new Error('Token not found');
      const { userId } = jwtDecode(token);
      const response = await instanceAxios.get(`/cart/${userId}`);
      commit('setCart', response.data);
    } catch (error) {
      console.log(error);
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}