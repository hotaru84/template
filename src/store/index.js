import Vue from 'vue'
import Vuex from 'vuex'
import log from './modules/log'
import device from './modules/device'
import filter from './modules/filter'
import image from './modules/image'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules:{
    log,
    device,
    filter,
    image
  },
  strict:debug
})
