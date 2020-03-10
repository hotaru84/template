<template>
<v-card outlined class="ma-2">
  <v-toolbar flat>
    <filter-menu />
    <v-btn icon @click="addLog"><v-icon>add</v-icon></v-btn>
  </v-toolbar>
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
import FilterMenu from '../components/FilterMenu'
//import FilterMenu from '../components/FilterMenu'
const moment = require('moment')
export default {
  components:{FilterMenu},
  data(){
    return {
      menu:false,
      yearMonth:'',
    } 
  },
  methods:{
    ...mapActions('log',['ADD_LOG','DELETE_LOG','FETCH_DAY_LOG','FETCH_DATE_STATS','queryCount']),
    getDate(ts){
      return moment(ts).format('YYYY-MM-DD hh:mm:ss')
    },
    setToday() {
      this.SELECT_DATE(moment().format('YYYY-MM-DD'))
    },
    availableDates(day){
      return this.queryCount(day)
    },
    setDate(date){
      window.console.log(date)
    },
    setKeword(keyword){
      window.console.log(keyword)
    },
    setSerial(serial){
      window.console.log(serial)
    },
    addLog(){
      this.ADD_LOG({
        serial:this.serial,
        time:moment(this.targetDate).add(Math.random()*60*24,'minutes').valueOf(),
        data:'TEST' + Math.random()
      })
    },
  },
  watch:{
    yearMonth(yearMonth){
      window.console.log(yearMonth)
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
    }
  }
}
</script>