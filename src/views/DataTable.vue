<template>
<v-card outlined class="ma-2">
  <v-data-table 
    :headers="headers"
    :items="data">
  </v-data-table>
</v-card>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      headers:[
        {text:"Time",value:"time"},
        {text:"Data",value:"data"},
      ]
    }
  },
  computed: {
    ...mapGetters('data',['data'])
  }
}
</script>