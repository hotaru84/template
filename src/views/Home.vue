<template>
  <v-container fluid>
    <v-data-iterator
      :items="devices"
      :items-per-page.sync="itemsPerPage"
      hide-default-footer
    >
      <template v-slot:header>
      <v-tabs icons-and-text centered grow color="primary">
        <v-tab>最近の更新<v-icon>date_range</v-icon></v-tab>
        <v-tab>最もアクティブ<v-icon>touch_app</v-icon></v-tab>
        <v-tab>スキャン回数が多い<v-icon>flare</v-icon></v-tab>
        <v-tab>移動回数が多い<v-icon>directions_walk</v-icon></v-tab>
        <v-tab>バッテリー残量低<v-icon>battery_alert</v-icon></v-tab>
        <v-tab>MORE<v-icon>tune</v-icon></v-tab>
      </v-tabs>
      </template>
      <template v-slot:default="props">
        <v-row>
          <v-col :md="4" :sm="6" :xs="12" v-for="(item,id) in props.items" :key="id">
            <device-card :device="item"/>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import DeviceCard from '../components/DeviceCard'

export default {
  components:{DeviceCard},
  name: 'home',
  data(){
    return {
      itemsPerPage:4,
      items:[1,1,1,1,1,1]
    }
  },
  computed:{
    ...mapGetters('device',['devices']),
    lowBatteryCount:function() {
      return this.devices.filter(d=>d.battery < 0.15).length
    }
  }
}
</script>
