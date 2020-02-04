const state = {
  serial:null,
  date:null
}
const getters = {
  serial: state => state.serial,
  date: state => state.date
}
const mutations = {
  SELECT_SERIAL(state, serial) {
    state.serial = serial;
  },
  SELECT_DATE(state,date) {
    state.date = date
  }
}
const actions = {
  SELECT_SERIAL({commit}, serial) {
    commit('SELECT_SERIAL',serial)
  },
  SELECT_DATE({commit}, date) {
    commit('SELECT_DATE',date)
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}