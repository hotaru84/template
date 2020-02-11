import { db } from "../../db";
import Dexie from 'dexie'
const moment = require('moment')
const state = {
  imagesInADay: [],
  imageCount:{}
}
const getters = {
  imagesInADay: state => state.imagesInADay,
  imageCount: state => state.imageCount
}
const mutations = {
  FETCH_DAILY_IMG(state, log) {
    state.imagesInADay = log
    state.imagesInADay.sort((a,b)=>b.time - a.time)
  },
  FETCH_DATE_STATS(state, logCount) {
    state.imageCount = logCount
  },
  ADD_IMG(state,log) {
    state.imagesInADay.unshift(log)
    state.imagesInADay.sort((a,b)=>b.time - a.time)
  },
  DELETE_IMG(state,log) {
    state.imagesInADay = state.imagesInADay.filter(l=>{
      return !(l.time == log.time && l.serial == log.serial) 
    })
  }
}
const actions = {
  async FETCH_DAILY_IMG({ commit },{date}) {
    let start = moment(date).startOf('day').valueOf()
    let end = moment(date).endOf('day').valueOf()
    let logs = await db.image.where("[time+serial]").between(
        [start,Dexie.minKey],
        [end,Dexie.maxKey]
      ).toArray();
    commit("FETCH_DAILY_IMG", logs);
  },
  async FETCH_DATE_STATS({commit},{startDate,endDate}) {
    let start = moment(startDate).startOf('day').valueOf()
    let end = moment(endDate).endOf('day').valueOf()
    let logs = await db.image.where("[time+serial]").between(
        [start,Dexie.minKey],
        [end,Dexie.maxKey]
      ).toArray()
    let counts = logs.reduce((ttl,l)=>{
      let day = moment(l.time).format('YYYY-MM-DD')
      if(ttl[day] === undefined) ttl[day] = 1
      else ttl[day] = ttl[day] + 1
      return ttl
    },{})
    commit("FETCH_DATE_STATS",counts)
  },
  async ADD_IMG({commit},log) {
    try{
      let count = await db.image.where({time:log.time,serial:log.serial}).count()
      if(count == 0){
        await db.image.add(log)
        commit('ADD_IMG',log)
      }
    }catch(err){
      window.console.log(err)
    }
  },
  async DELETE_IMG({commit},log) {
    try{
      await db.image.where({time:log.time,serial:log.serial}).delete()
      commit('DELETE_IMG',log)
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