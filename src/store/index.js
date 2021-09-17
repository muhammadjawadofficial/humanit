import Vue from 'vue'
import Vuex from 'vuex'
import shellStore from './modules/shellStore'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    shellStore
  }
})
