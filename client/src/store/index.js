import Vue from 'vue'
import Vuex from 'vuex'

import core from './core'
import hr from './hr'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    core,
    hr
  }
})

export default store
