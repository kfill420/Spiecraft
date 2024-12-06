import instanceAxios from '@/components/service/instance';
import { jwtDecode } from 'jwt-decode';

const state = {
  profileModalIsOpen: false,
  porifleModalType: ''
};

const mutations = {
  setProfileModalIsOpen(state, profileModalIsOpen) {
    state.profileModalIsOpen = profileModalIsOpen;
  },
  setProfileModalType(state, profileModalType) {
    state.profileModalType = profileModalType;
  },
  updateProfile(state, data) {
    state.profile = data;
  }
};

const actions = {
  async updateProfile({ commit }, data) {
    try {
      const token = localStorage.getItem('token');
      if (!token)
        throw new Error('Token not found');
      const { userId } = jwtDecode(token);
      const response = await instanceAxios.patch(`/updateProfile/${userId}`, data);
      commit('updateProfile', response.data);
    } catch (error) {
      console.log(error);
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}