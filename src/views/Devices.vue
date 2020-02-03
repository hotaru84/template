<template>
<v-card outlined class="ma-2">
  <v-card-actions>
    <v-btn text @click="ADD_DEVICE({
        serial:(Math.random() * 10000).toFixed(),
        ip:'192.168.1.9',
        screen:true,
        battery:Math.random().toFixed(2)
      })">{{$t('action.add')}}</v-btn>
  </v-card-actions>
  <v-data-table 
    :headers="headers"
    :items="devices">
    <template v-slot:item.action="{ item }">
      <v-btn icon @click="DELETE_DEVICE(item.serial)">
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
      
    }
  },
  methods:{
    ...mapActions('device',['ADD_DEVICE','DELETE_DEVICE']),
  },
  computed: {
    ...mapGetters('device',['devices']),
    headers:function(){
      return [
        {text:this.$i18n.t("devices.serial"),value:"serial"},
        {text:this.$i18n.t("devices.ip"),value:"ip"},
        {text:this.$i18n.t("devices.battery"),value:"battery"},
        {text:this.$i18n.t("devices.screen"),value:"screen"},
        {text:this.$i18n.t('action.title'),value:"action"}
      ]
    }
  }
}
</script>
