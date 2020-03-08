<template>
  <v-card outlined>
    <v-card-actions>
      <v-chip large color="white">
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
      <v-row no-gutters v-for="(item,id) in filteredItems" :key="id" class="my-2 mx-3">
        <v-col :sm="4" class="d-flex align-center">
          <v-chip small color="white" text-color="#607D8B">
            <v-icon small left color="#607D8B">{{item.icon}}</v-icon>
            {{item.name}}
          </v-chip>
        </v-col>
        <v-col :sm="8" class="pb-1 pr-2">
          <div class="caption">{{getValue(item)+' ' +item.unit}}</div>
          <v-progress-linear
            :value="getPercent(item)"
            color="#607D8B"
          />
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
        {name:'Active',color:'#fb8c00',icon:'touch_app',max:24, title:'active',unit:'hours'},
        {name:'Action',color:'#e57373',icon:'flare',max:3000, title:'action',unit:'logs'},
        {name:'Image',color:'#4fc3f7',icon:'photo',max:3000, title:'image',unit:'images'},
        {name:'Step',color:'#039be5',icon:'directions_walk',max:10000,title:'step',unit:'steps'},
        {name:'Battery',color:'#66bb6a',icon:'battery_std',max:100, title:'battery',unit:'%'}
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
      return this.device[item.title]/item.max*100
    },
    getStatusIcon(status){
      if(status == 'charging') return 'battery_charging_full'
      else if(status == 'active') return 'phone_android'
      return 'phonelink_erase'
    },
    getStatusColor(status){
      if(status == 'charging') return 'orange'
      else if(status == 'active') return 'blue-grey'
      return 'grey'
    }
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