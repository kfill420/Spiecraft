import instanceAxios from '@/components/service/instance';
import { jwtDecode } from 'jwt-decode';

const state = {
  profileModalIsOpen: false,
  porifleModalType: '',
  profileModalError: '',
  profile: {
    firstname: '',
    lastname: '',
    email: ''
  }
};

const mutations = {
  setProfileModal(state, data) {
    state.profileModalIsOpen = data.isOpen;
    state.profileModalType = data.type;
    state.profileModalError = '';
  },
  updateProfile(state, data) {
    state.profile[data.type] = data.value;
    state.profileModalIsOpen = false;
    state.profileModalError = '';
  },
  initializeState(state) {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token, 'secret');
      state.profile.firstname = decoded.fullnameData.firstnameData;
      state.profile.lastname = decoded.fullnameData.lastnameData;
      state.profile.email = decoded.emailData;
    }
  },
  setProfileModalError(state, profileModalError) {
    state.profileModalError = profileModalError;
  }
};

const actions = {
  async updateProfile({ commit }, data) {
    try {
      const oldToken = localStorage.getItem('token');
      if (!oldToken)
        throw new Error('Token not found');
      const { userId } = jwtDecode(oldToken);
      const response = await instanceAxios.patch(`/updateProfile/${userId}`, data);
      const token = response.data.token;
      localStorage.setItem('token', token);
      commit('updateProfile', data);
    } catch (error) {
      commit('setProfileModalError', error.response.data.errorMessage);
      console.log(state.profileModalError);
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}