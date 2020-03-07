<template>
  <v-container fluid>
    <v-data-iterator
      :items="devices"
      :items-per-page.sync="itemsPerPage"
      hide-default-footer
    >
      <template v-slot:header>
      <v-tabs icons-and-text centered grow color="primary">
        <v-tab>Recently updated<v-icon>date_range</v-icon></v-tab>
        <v-tab>Most active<v-icon>touch_app</v-icon></v-tab>
        <v-tab>Most scanned<v-icon>flare</v-icon></v-tab>
        <v-tab>Most walked<v-icon>directions_walk</v-icon></v-tab>
        <v-tab>Low battery<v-icon>battery_alert</v-icon></v-tab>
        <v-tab>MORE<v-icon>tune</v-icon></v-tab>
      </v-tabs>
      </template>
      <template v-slot:default="props">
        <v-row>
          <v-col cols="4" v-for="item in props.items" :key="item">
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
