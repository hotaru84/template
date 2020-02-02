import { db } from "../../db";
const state = {
  log: []
}
const getters = {
  logs: state => state.log
}
const mutations = {
  FETCH_LOG(state, log) {
    state.log = log;
  },
  ADD_LOG(state,log) {
    state.log.unshift(log)
  },
  DELETE_LOG(state,time) {
    state.log = state.log.filter(l=>l.time != time)
  }
}
const actions = {
  async FETCH_LOG({ commit }) {
    let logs = await db.log
      .toArray();
    commit("FETCH_LOG", logs);
  },
  async ADD_LOG({commit},log) {
    try{
      await db.log.add(log)
      commit('ADD_LOG',log)
    }catch(err){
      window.console.log(err)
    }
  },
  async DELETE_LOG({commit},time) {
    try{
      await db.log.where('time')
        .equals(time)
        .delete()
      commit('DELETE_LOG',time)
    }catch(err){
      window.console.log(err)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}