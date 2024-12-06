import { jwtDecode } from 'jwt-decode';

const state = {
  loginModalIsOpen: false,
  logged: false,
  username: '',
};

const mutations = {
  setLoginModalIsOpen(state, loginModalIsOpen) {
    state.loginModalIsOpen = loginModalIsOpen;
  },
  setLogged(state, logged) {
    state.logged = logged;
  },
  setUsername(state, username) {
    state.username = username;
  },
  initializeState(state) {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token, 'secret');
      state.logged = true;
      state.username = decoded.fullnameData.firstnameData;
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
}