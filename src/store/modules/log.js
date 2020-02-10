import { db } from "../../db";
import Dexie from 'dexie'
const moment = require('moment')
const state = {
  logInADay: [],
  logCount:{}
}
const getters = {
  logInADay: state => state.logInADay,
  logCount: state => state.logCount
}
const mutations = {
  FETCH_DAY_LOG(state, log) {
    state.logInADay = log
  },
  FETCH_DATE_STATS(state, logCount) {
    state.logCount = logCount
  },
  ADD_LOG(state,log) {
    state.logInADay.unshift(log)
  },
  DELETE_LOG(state,log) {
    state.logInADay = state.logInADay.filter(l=>{
      return !(l.time == log.time && l.serial == log.serial) 
    })
  }
}
const actions = {
  async FETCH_DAY_LOG({ commit },{date,keyword}) {
    let start = moment(date).startOf('day').valueOf()
    let end = moment(date).endOf('day').valueOf()
    let logs = await db.log.where("[time+serial]").between(
        [start,Dexie.minKey],
        [end,Dexie.maxKey]
      ).and(function(l){
        return keyword != null ? l.data.includes(keyword) : true
      }).toArray();
    commit("FETCH_DAY_LOG", logs);
  },
  async FETCH_DATE_STATS({commit},{startDate,endDate,keyword}) {
    let start = moment(startDate).startOf('day').valueOf()
    let end = moment(endDate).endOf('day').valueOf()
    let logs = await db.log.where("[time+serial]").between(
        [start,Dexie.minKey],
        [end,Dexie.maxKey]
      ).and(function(l){
        return keyword != null ? l.data.includes(keyword) : true
      }).toArray()
    let counts = logs.reduce((ttl,l)=>{
      let day = moment(l.time).format('YYYY-MM-DD')
      if(ttl[day] === undefined) ttl[day] = 1
      else ttl[day] = ttl[day] + 1
      return ttl
    },{})
    commit("FETCH_DATE_STATS",counts)
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