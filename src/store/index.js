import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {}
  },
  mutations: {
    commitCurrentUser(state, user) {
      state.currentUser = user
    }
  },
  actions: {
    loadCurrentUserAction(Store) {
      axios.get('/user/current').then(res => {
        Store.commit('commitCurrentUser', res.data)
      })
    }
  },
  modules: {
  }
})
