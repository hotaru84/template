<template>
<v-card outlined class="ma-2">
  <v-card-actions>
    <v-btn text @click="addDevice">{{$t('action.add')}}</v-btn>
  </v-card-actions>
  <v-data-table 
    :headers="headers"
    :items="devices">
    <template v-slot:item.status="{item}">
      <v-chip>
      <v-icon left >
        {{getStatusIcon(item.status)}}
      </v-icon>
      {{item.status}}
      </v-chip>
    </template>
    <template v-slot:item.battery="{item}">
      <v-progress-circular
        :rotate="-90"
        :value="item.battery"
        :size="40"
        :width="4"
        :color="item.battery > 30 ? 'green':'orange'"
        >
        <span class="caption">{{item.battery}}</span><span class="overline">%</span>
      </v-progress-circular>
    </template>
    <template v-slot:item.active="{item}">
      <v-progress-circular
        :rotate="-90"
        :value="item.active/24*100"
        :size="40"
        :width="4"
        :color="item.active > 12 ? 'green':'orange'"
        >
        <span class="caption">{{item.active}}</span><span class="overline">h</span>
      </v-progress-circular>
    </template>
    <template v-slot:item.action="{item}">
      {{item.action}} <span class="caption">actions</span>
      <v-progress-linear height="10" :value="item.action/3000*100"/>
    </template>
    <template v-slot:item.image="{item}">
      {{item.action}} <span class="caption">images</span>
      <v-progress-linear height="10" :value="item.image/3000*100"/>
    </template>
    <template v-slot:item.step="{item}">
      {{item.action}} <span class="caption">steps</span>
      <v-progress-linear height="10" :value="item.step/10000*100"/>
    </template>
    <template v-slot:item.delete="{ item }">
      <v-btn icon @click="DELETE_DEVICE(item)">
        <v-icon small>delete</v-icon>
      </v-btn>
    </template>
  </v-data-table>
</v-card>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
const moment = require('moment')
export default {
  data() {
    return {
      
    }
  },
  methods:{
    ...mapActions('device',['ADD_DEVICE','DELETE_DEVICE']),
    addDevice() {
      this.ADD_DEVICE({
        time:moment().format('YYYY-MM-DD HH:MM:ss'),
        serial:(Math.random() * 10000).toFixed(),
        ip:'192.168.1.9',
        status:Math.random() > 0.5?'charging' :'active',
        battery:(100*Math.random()).toFixed(0),
        active:(24*Math.random()).toFixed(2),
        action:(3000*Math.random()).toFixed(0),
        image:(3000*Math.random()).toFixed(0),
        step:(10000*Math.random()).toFixed(0),
      })
    },
    getStatusIcon(status){
      if(status == 'charging') return 'battery_charging_full'
      else if(status == 'active') return 'phone_android'
      return 'phonelink_erase'
    },
  },
  computed: {
    ...mapGetters('device',['devices']),
    headers:function(){
      return [
        {text:this.$i18n.t("devices.time"),value:"time"},
        {text:this.$i18n.t("devices.serial"),value:"serial"},
        {text:this.$i18n.t("devices.ip"),value:"ip"},
        {text:this.$i18n.t("devices.status"),value:"status"},
        {text:this.$i18n.t("devices.battery"),value:"battery"},
        {text:this.$i18n.t("devices.active"),value:"active"},
        {text:this.$i18n.t('action.action'),value:"action"},
        {text:this.$i18n.t('action.image'),value:"image"},
        {text:this.$i18n.t('action.step'),value:"step"},
        {text:this.$i18n.t('action.delete'),value:"delete"},
      ]
    }
  }
}
</script>
