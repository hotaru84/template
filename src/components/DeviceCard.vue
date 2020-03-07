<template>
  <v-card
    outlined
  >
    <v-chip  outlined class="ma-2">
      <v-icon left :color="getStatusColor(device.status)">{{getStatusIcon(device.status)}}</v-icon>
      SN:#{{device.serial}}
    </v-chip>
    <v-list-item class="text-center mx-2">
      <v-list-item-avatar size="50">
        <v-progress-circular
          :rotate="-90"
          :value="device.active/24*100"
          :size="50"
          :width="6"
          color="accent"
          >
          <v-icon color="accent">touch_app</v-icon>
        </v-progress-circular>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-subtitle class="text-left">Total</v-list-item-subtitle>
        <v-list-item-title class="display-1">{{device.active}}<span class="caption mx-2">hour</span></v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-row class="mx-2">
      <v-col cols="3" v-for="(item,idx) in items" :key="idx" class="text-center">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-progress-circular
              :rotate="-90"
              :value="item.value"
              :size="36"
              :width="4"
              :color="item.color"
              v-on="on"
              >
              <v-icon small :color="item.color">{{item.icon}}</v-icon>
            </v-progress-circular>
            <div class="caption" v-on="on">{{getValue(item.unit)}}</div>
          </template>
          <div>{{item.name}}</div>
        </v-tooltip>
      </v-col>
    </v-row>
    <div class="caption text-right ma-2">最終更新:約{{getDuration(device.time)}}時間前</div>
  </v-card>
</template>
<script>
const moment = require('moment')
export default {
  props:['device'],
  data() {
    return {
      items:[
        {name:'Scans',color:'#81c784',icon:'flare',value:80, unit:'action'},
        {name:'Images',color:'#4fc3f7',icon:'photo',value:35, unit:'image'},
        {name:'Steps',color:'#e57373',icon:'directions_walk',value:20,unit:'step'},
        {name:'Battery',color:'#ffa726',icon:'battery_std',value:80, unit:'battery'}
      ]
    }
  },
  methods:{
    getDuration(time){
      let past = moment(time)
      return moment().diff(past,'hour',true).toFixed(1)
    },
    getValue(unit){
      return this.device[unit]
    },
    getStatusIcon(status){
      if(status == 'charging') return 'battery_charging_full'
      else if(status == 'active') return 'phone_android'
      return 'phonelink_erase'
    },
    getStatusColor(status){
      if(status == 'charging') return 'orange'
      else if(status == 'active') return 'green'
      return 'grey'
    },
  }
}
</script>