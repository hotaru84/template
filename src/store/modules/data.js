import { db } from "../../db";
const state = {
  data: []
}
const getters = {
  data: state => state.data
}
const mutations = {
  FETCH_DATA(state, data) {
    state.data = data;
  },
  ADD_DATA(state,data) {
    state.data.unshift(data)
  }
}
const actions = {
  async FETCH_DATA({ commit }) {
    let data = await db.data
      .toArray();
    commit("FETCH_DATA", data);
  },
  async ADD_DATA({commit},data) {
    try{
      db.data.add(data)
    }catch(err){
      window.console.log(err)
    }
    commit('ADD_DATA',data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}