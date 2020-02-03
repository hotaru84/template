<template>
<v-card outlined class="ma-2">
  <v-card-actions>
    <v-select
      v-model="serial"
      :items="serials"
      outlined>
    </v-select>
    <v-btn text @click="ADD_LOG({serial:serial,time:new Date().getTime(),data:'TEST'})">{{$t('action.add')}}</v-btn>
  </v-card-actions>
  <v-data-table 
    :headers="headers"
    :items="logs">
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
export default {
  data() {
    return {
      serial:null
    }
  },
  methods:{
    ...mapActions('log',['ADD_LOG','DELETE_LOG']),
    getDate:function(ts){
      return new Date(ts).toISOString()
    }
  },
  computed: {
    ...mapGetters('log',['logs']),
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