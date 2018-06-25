import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import message from './modules/message'
import content from './modules/content'

import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: [
    'user'
  ]
})

const actions = {}
const getters = {}
Vue.use(Vuex)
export default new Vuex.Store({
  actions,
  getters,
  modules: {
    user, message, content
  },
  plugins: [vuexLocal.plugin]
})
