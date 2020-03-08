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
          :value="getPercent(getItem(mainTitle))"
          :size="80"
          :width="8"
          :color="getItem(mainTitle).color"
          >
          <v-icon large :color="getItem(mainTitle).color">{{getItem(mainTitle).icon}}</v-icon>
        </v-progress-circular>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="text-left" :style="'color:' + getItem(mainTitle).color">{{getItem(mainTitle).name}}</v-list-item-title>
        <v-list-item-title class="display-1">{{getValue(getItem(mainTitle))}}<span class="body-2 mx-2">{{getItem(mainTitle).unit}}</span></v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-row class="mx-2">
      <v-col :lg="3" :md="6" :sm="6" v-for="(item,id) in filteredItems" :key="id" class="text-center">
        <div class="caption" :style="'color:' + item.color">{{item.title}}</div> 
        <v-progress-circular
          :rotate="-90"
          :value="getPercent(item)"
          :size="36"
          :width="4"
          :color="item.color"
          >
          <v-icon small :color="item.color">{{item.icon}}</v-icon>
        </v-progress-circular>
        <div class="caption">{{getValue(item)}}</div>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
const moment = require('moment')
export default {
  props:['device','mainTitle'],
  data() {
    return {
      items:[
        {name:'Active',color:'#607D8B',icon:'touch_app',max:24, title:'active',unit:'hour'},
        {name:'Action',color:'#81c784',icon:'flare',max:3000, title:'action',unit:'logs'},
        {name:'Image',color:'#4fc3f7',icon:'photo',max:3000, title:'image',unit:'images'},
        {name:'Step',color:'#e57373',icon:'directions_walk',max:10000,title:'step',unit:'steps'},
        {name:'Battery',color:'#ffa726',icon:'battery_std',max:100, title:'battery',unit:'%'}
      ]
    }
  },
  methods:{
    getDuration(time){
      let past = moment(time)
      return moment().diff(past,'hour',true).toFixed(1)
    },
    getItem(title) {
      return this.items.filter(item=>item.title == title)[0]
    },
    getValue(item){
      return this.device[item.title]
    },
    getPercent(item) {
      window.console.log(item)
      return this.device[item.title]/item.max*100
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
  },
  computed:{
    filteredItems(){
      return this.items.filter(item=>{
        return item.title != this.mainTitle
      })
    }
  }
}
</script>