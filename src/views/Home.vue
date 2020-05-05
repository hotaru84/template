<template>
  <v-container fluid>
    <v-toolbar flat :dark="!isNoneSelected" :color="isNoneSelected?'white':'primary'">
      <template v-if="isNoneSelected">
        <v-text-field
          v-model="search"
          solo-inverted
          flat
          hide-details
          label="Search"
          prepend-inner-icon="search"
        />
        <v-spacer />
        <v-btn icon tile @click="addDevice">
          <v-icon>add</v-icon>
        </v-btn>
      </template>
      <template v-else>
        <v-btn
          icon
          @click="resetSelection">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>
          {{`${selectedDevice.length} selected`}}
        </v-toolbar-title>
        <v-spacer/>
        <v-btn icon tile @click="deleteDevice">
          <v-icon>delete</v-icon>
        </v-btn>
        <v-btn icon tile>
          <v-icon>vertical_align_bottom</v-icon>
        </v-btn>
        <v-btn icon tile>
          <v-icon>vertical_align_top</v-icon>
        </v-btn>
        <v-btn icon tile>
          <v-icon>settings</v-icon>
        </v-btn>
      </template>
    </v-toolbar>
    <v-row no-gutters>
      <v-col>
        <v-data-table
          show-select
          item-key="serial"
          v-model="selectedDevice"
          :headers="headers"
          :search="search"
          :items="devices">
          <template v-slot:top>
            <device-info-tabs />
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import {db} from '../db'
import DeviceInfoTabs from '../components/DeviceInfoTabs'
const moment = require('moment')
export default {
  components:{DeviceInfoTabs},
  data() {
    return {
      devices:[],
      selectedDevice:[],
      search:'',
      showAddDeviceDialog:false
    }
  },
  methods:{
    async fetchDevice() {
      this.devices = await db.device.toArray();
    },
    async deleteDevice(){
      const promise = this.selectedDevice.map(d=>{
        return db.device.where({serial:d.serial}).delete()
      })
      await Promise.all(promise)
      this.fetchDevice()
      this.resetSelection()
    },
    async addDevice() {
      await db.device.add({
        serial:(Math.random() * 10000).toFixed(),
        uptime:moment().format('YYYY-MM-DD HH:MM:ss'),
        ip:'192.168.1.' + (Math.random() * 10).toFixed(0),
        status:Math.random() > 0.5?'charging' :'active',
        battery:(100*Math.random()).toFixed(0)
      })
      this.fetchDevice()
    },
    resetSelection() {
      this.selectedDevice = []
    }
  },
  computed:{
    headers(){
      return [
        {
          text:'S/N',
          value:'serial'
        },
        {
          text:'Time',
          value:'uptime'
        },
        {
          text:'IP',
          value:'ip'
        },
        {
          text:'Status',
          value:'status'
        },
        {
          text:'Battery',
          value:'battery'
        }
      ]
    },
    isNoneSelected() {
      return this.selectedDevice.length==0
    }
  },
  created(){
    this.fetchDevice()
  }
}
</script>