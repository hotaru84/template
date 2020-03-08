<template>
  <v-card
    outlined
  >
    <v-card-actions>
      <v-chip color="white">
        <v-icon left :color="getStatusColor(device.status)">{{getStatusIcon(device.status)}}</v-icon>
        #{{device.serial}}
      </v-chip>
      <v-spacer/>
      <v-chip small color="white">
        <v-icon small left color="grey">history</v-icon>
        最終更新:約{{getDuration(device.time)}}時間前
      </v-chip>
    </v-card-actions>
    <v-list-item class="text-center mx-2">
      <v-list-item-avatar size="80">
        <v-progress-circular
          :rotate="-90"
          :value="device.active/24*100"
          :size="80"
          :width="8"
          color="#607D8B"
          >
          <v-icon large color="#607D8B">touch_app</v-icon>
        </v-progress-circular>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="text-left" :style="'color:' + '#607D8B'">Active</v-list-item-title>
        <v-list-item-title class="display-1">{{device.active}}<span class="body-2 mx-2">hour/day</span></v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-row class="mx-2">
      <v-col :lg="3" :md="6" :sm="6" v-for="(item,id) in items" :key="id" class="text-center">
        <div class="caption" :style="'color:' + item.color">{{item.unit}}</div> 
        <v-progress-circular
          :rotate="-90"
          :value="getPercent(item)"
          :size="36"
          :width="4"
          :color="item.color"
          >
          <v-icon small :color="item.color">{{item.icon}}</v-icon>
        </v-progress-circular>
        <div class="caption">{{getValue(item.unit)}}</div>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
const moment = require('moment')
export default {
  props:['device'],
  data() {
    return {
      items:[
        {name:'Scans',color:'#81c784',icon:'flare',maxValue:3000, unit:'action'},
        {name:'Images',color:'#4fc3f7',icon:'photo',maxValue:3000, unit:'image'},
        {name:'Steps',color:'#e57373',icon:'directions_walk',maxValue:10000,unit:'step'},
        {name:'Battery',color:'#ffa726',icon:'battery_std',maxValue:100, unit:'battery'}
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
    getPercent(device) {
      return this.device[device.unit]/device.maxValue*100
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