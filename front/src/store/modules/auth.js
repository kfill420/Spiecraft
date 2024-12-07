import { jwtDecode } from 'jwt-decode';

const state = {
  loginModalIsOpen: false,
  logged: false,
};

const mutations = {
  setLoginModalIsOpen(state, loginModalIsOpen) {
    state.loginModalIsOpen = loginModalIsOpen;
  },
  setLogged(state, logged) {
    state.logged = logged;
  },
  initializeState(state) {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token, 'secret');
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        state.logged = false;
        state.username = '';
        localStorage.removeItem('token');
      } else {
        state.logged = true;
        state.username = decoded.fullnameData.firstnameData;
      }
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
}