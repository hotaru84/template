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
  DELETE_LOG(state,log) {
    state.log = state.log.filter(l=>{
      return !(l.time == log.time && l.serial == log.serial) 
    })
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
      let count = await db.log.where({time:log.time,serial:log.serial}).count()
      if(count == 0){
        await db.log.add(log)
        commit('ADD_LOG',log)
      }
    }catch(err){
      window.console.log(err)
    }
  },
  async DELETE_LOG({commit},log) {
    try{
      await db.log.where({time:log.time,serial:log.serial}).delete()
      commit('DELETE_LOG',log)
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