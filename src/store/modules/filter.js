const state = {
  serial:null,
  date:null,
  keyword:null
}
const getters = {
  serial: state => state.serial,
  date: state => state.date,
  keyword: state => state.keyword
}
const mutations = {
  SELECT_SERIAL(state, serial) {
    state.serial = serial;
  },
  SELECT_DATE(state,date) {
    state.date = date
  },
  SET_KEYWORD(state,k) {
    state.keyword = k
  }
}
const actions = {
  SELECT_SERIAL({commit}, serial) {
    commit('SELECT_SERIAL',serial)
  },
  SELECT_DATE({commit}, date) {
    commit('SELECT_DATE',date)
  },
  SET_KEYWORD({commit},key) {
    commit('SET_KEYWORD',key)
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}