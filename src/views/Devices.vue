<template>
<v-card outlined class="ma-2">
  <v-data-table 
    :headers="headers"
    :items="devices">
  </v-data-table>
</v-card>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      headers:[
        {text:"Serial",value:"serial"},
        {text:"IP Address",value:"ip"},
        {text:"Battery",value:"battery"},
        {text:"Screen",value:"screen"}
      ]
    }
  },
  computed: {
    ...mapGetters('device',['devices'])
  }
}
</script>
