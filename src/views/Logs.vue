<template>
<v-card outlined class="ma-2">
  <v-card-actions>
    <v-btn text @click="ADD_LOG({time:new Date().getTime(),data:'TEST'})">{{$t('action.add')}}</v-btn>
  </v-card-actions>
  <v-data-table 
    :headers="headers"
    :items="logs">
    <template v-slot:item.time="{ item }">
      {{getDate(item.time)}}
    </template>
    <template v-slot:item.action="{ item }">
      <v-btn icon @click="DELETE_LOG(item.time)">
        <v-icon small>delete</v-icon>
      </v-btn>
    </template>
  </v-data-table>
</v-card>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  methods:{
    ...mapActions('log',['ADD_LOG','DELETE_LOG']),
    getDate:function(ts){
      return new Date(ts).toISOString()
    }
  },
  computed: {
    ...mapGetters('log',['logs']),
    headers:function() {
      return [
        {text:this.$i18n.t('logs.time'),value:"time"},
        {text:this.$i18n.t('logs.data'),value:"data"},
        {text:this.$i18n.t('action.title'),value:"action"}
      ]
    }
  }
}
</script>