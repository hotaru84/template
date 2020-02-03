<template>
<v-card outlined class="ma-2">
  <v-container fill-height class="overflow-y-auto">
    <v-row>
      <v-col cols="6">
        <v-card outlined>
        <v-list-item two-line>
          <v-list-item-avatar color="blue">
            <v-icon color="white">watch_later</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="title font-weight-light">{{$t('home.summary.title')}}</v-list-item-title>
            <v-list-item-subtitle>{{$t('home.summary.subtitle')}}</v-list-item-subtitle>
          </v-list-item-content>
          <span class="display-1 font-weight-bold text-center">{{ devices.length }}</span>
        </v-list-item>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card outlined>
        <v-list-item two-line>
          <v-list-item-avatar color="orange">
            <v-icon color="white">battery_alert</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="title font-weight-light">{{$t('home.battery.title')}}</v-list-item-title>
            <v-list-item-subtitle>{{$t('home.battery.subtitle')}}</v-list-item-subtitle>
          </v-list-item-content>
          <span class="display-1 font-weight-bold text-center">{{lowBatteryCount}}</span>
        </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</v-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'home',
  computed:{
    ...mapGetters('device',['devices']),
    lowBatteryCount:function() {
      return this.devices.filter(d=>d.battery < 0.15).length
    }
  }
}
</script>
