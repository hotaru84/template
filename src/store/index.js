import Vue from 'vue'
import Vuex from 'vuex'
import log from './modules/log'
import device from './modules/device'
import filter from './modules/fliter'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules:{
    log,
    device,
    filter
  },
  strict:debug
})
