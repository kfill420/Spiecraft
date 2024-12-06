import { createStore } from "vuex";
import actions from './actions';
import mutations from './mutations';
import getters from './getters';
import auth from './modules/auth';
import cart from './modules/cart';
import profile from './modules/profile';

const store = createStore({
  modules: {
    cart,
    auth,
    profile,
  },
  actions,
  mutations,
  getters,
});

export default store;