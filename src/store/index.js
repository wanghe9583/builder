import Vue from 'vue'
import Vuex from 'vuex'
import PostDto from './modules/PostDto';
import prefix from './modules/prefix';
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex)
export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    PostDto,
    prefix
  },
  plugins: [createPersistedState()]
})