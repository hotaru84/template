<template>
<v-card outlined class="ma-2">
  <v-toolbar flat>
    <v-text-field
      v-model="searchKeyword"
      :label="$t('filter.search')"
      prepend-icon="search"
      single-line
      hide-details>
    </v-text-field>
    <v-spacer/>
    <v-btn icon @click="addLog"><v-icon>add</v-icon></v-btn>
  </v-toolbar>
  <v-toolbar flat>

    <v-text-field
      v-model="date"
      :label="$t('filter.date')"
      prepend-icon="date_range"
      single-line
      readonly
      hide-details>
    </v-text-field>
    <v-spacer/>
    <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
      Today
    </v-btn>
    <v-btn fab text small color="grey darken-2" @click="$refs.calendar.prev()">
      <v-icon small>chevron_left</v-icon>
    </v-btn>
    <v-btn fab text small color="grey darken-2" @click="$refs.calendar.next()">
      <v-icon small>chevron_right</v-icon>
    </v-btn>
  </v-toolbar>
  <v-card flat class="ma-2">
    <v-calendar
      ref="calendar"
      v-model="targetDate"
      @change="updateRange"
    >
      <template v-slot:day="{date}">
        <v-progress-linear
          height="10"
          :value="logCount[date]">
        </v-progress-linear>
      </template>
    </v-calendar>
  </v-card>
  <v-divider></v-divider>
  <v-data-table 
    :headers="headers"
    :items="logInADay">
    <template v-slot:item.time="{ item }">
      {{getDate(item.time)}}
    </template>
    <template v-slot:item.action="{ item }">
      <v-btn icon @click="DELETE_LOG(item)">
        <v-icon small>delete</v-icon>
      </v-btn>
    </template>
  </v-data-table>
</v-card>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
//import FilterMenu from '../components/FilterMenu'
const moment = require('moment')
export default {
  //components: {FilterMenu},
  methods:{
    ...mapActions('log',['ADD_LOG','DELETE_LOG','FETCH_DAY_LOG','FETCH_DATE_STATS']),
    ...mapActions('filter',['SET_KEYWORD','SELECT_SERIAL','SELECT_DATE']),
    getDate(ts){
      return moment(ts).format('YYYY-MM-DD hh:mm:ss')
    },
    setToday() {
      this.SELECT_DATE(moment().format('YYYY-MM-DD'))
    },
    addLog(){
      this.ADD_LOG({serial:this.serial,
      time:moment(this.targetDate).add(Math.random()*60*24,'minutes').valueOf(),
      data:'TEST' + Math.random()})
    },
    updateLog() {
      this.FETCH_DAY_LOG({
        date: this.targetDate,
        keyword: this.searchKeyword
      })
    },
    updateRange({start,end}){
      this.FETCH_DATE_STATS({
        startDate:start.date,
        endDate:end.date,
        keyword: this.searchKeyword
      })
    }
  },
  computed: {
    ...mapGetters('log',['logInADay','logCount']),
    ...mapGetters('filter',['serial','date','keyword']),
    ...mapGetters('device',['serials']),
    headers:function() {
      return [
        {text:this.$i18n.t("devices.serial"),value:"serial"},
        {text:this.$i18n.t('logs.time'),value:"time"},
        {text:this.$i18n.t('logs.data'),value:"data"},
        {text:this.$i18n.t('action.title'),value:"action"}
      ]
    },
    targetDate:{
      set(v) {
        this.SELECT_DATE(v)
        this.updateLog()
      },
      get() {return this.date}
    },
    searchKeyword:{
      set(v) {
        this.SET_KEYWORD(v)
        this.updateLog()
      },
      get() {return this.keyword}
    }
  },
  mounted() {
    this.SELECT_SERIAL(this.serials[0])
    this.setToday()
    this.updateLog()
  }
}
</script>