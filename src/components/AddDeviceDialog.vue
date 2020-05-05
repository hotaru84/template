<template>
  <v-dialog
    v-model="show"
    hide-overlay
    width="300px"
  >
    <v-card>
      <v-card-title>{{title}}</v-card-title>
      <v-card-actions>
        <v-btn text @click="addDevice">ADD</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import {db} from '../db'
const moment = require('moment')
export default {
  props:['title','show','progress'],
  methods:{
    addDevice() {
      db.device.add({
        serial:(Math.random() * 10000).toFixed(),
        uptime:moment().format('YYYY-MM-DD HH:MM:ss'),
        ip:'192.168.1.' + (Math.random() * 10).toFixed(0),
        status:Math.random() > 0.5?'charging' :'active',
        battery:(100*Math.random()).toFixed(0)
      })
    }
  }
}
</script>