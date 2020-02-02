import { db } from "../../db";

const state = {
  device: []
}
const getters = {
  devices: state => state.device
}
const mutations = {
  FETCH_DEVICE(state, device) {
    state.device = device;
  },
  ADD_DEVICE(state,d) {
    state.device.unshift(d)
  },
  DELETE_DEVICE(state,serial) {
    state.device = state.device.filter(l=>l.serial != serial)
  }
}
const actions = {
  async FETCH_DEVICE({ commit }) {
    let devices = await db.device
      .toArray();
    commit("FETCH_DEVICE", devices);
  },
  async ADD_DEVICE({commit},device) {
    try{
      let exists = await db.device.where('serial').equals(device.serial).count()
      if(exists == 0){
        await db.device.add(device)
        commit('ADD_DEVICE',device)
      }
    }catch(err){
      window.console.log(err)
    }
  },
  async DELETE_DEVICE({commit},serial) {
    try{
      await db.device.where('serial')
        .equals(serial)
        .delete()
      commit('DELETE_DEVICE',serial)
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
