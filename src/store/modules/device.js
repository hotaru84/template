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
  }
}
const actions = {
  async FETCH_DEVICE({ commit }) {
    let devices = await db.device
      .toArray();
    commit("FETCH_DEVICE", devices);
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
