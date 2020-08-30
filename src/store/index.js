import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
const store =  new Vuex.Store({
  state: {
    userinfo: {
      username: localStorage.getItem('user') || '',
    },
    token: localStorage.getItem('token') || ''
  },
  mutations: {
    changeUserInfo (state, payload) {
      state.userinfo.username = payload.username
    },
    logout(state) {
      state.userinfo.username = ''
      state.token = ''
    }
  },
  actions: {
  },
  modules: {
  }
})
export default store