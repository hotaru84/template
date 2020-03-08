<template>
  <v-container fluid>
    <v-data-iterator
      :items="devices"
      :items-per-page.sync="itemsPerPage"
      :sort-by="sortBy"
      :sort-desc="sortDesc"
      hide-default-footer
    >
      <template v-slot:header>
        <v-tabs icons-and-text centered grow color="primary">
          <v-tab @click="changeTab('time')">最近の更新<v-icon>date_range</v-icon></v-tab>
          <v-tab @click="changeTab('active')">最もアクティブ<v-icon>touch_app</v-icon></v-tab>
          <v-tab @click="changeTab('action')">アクション数が多い<v-icon>flare</v-icon></v-tab>
          <v-tab @click="changeTab('step')">移動回数が多い<v-icon>directions_walk</v-icon></v-tab>
          <v-tab @click="changeTab('battery')">バッテリー残量低<v-icon>battery_alert</v-icon></v-tab>
        </v-tabs>
      </template>
      <template v-slot:default="props">
        <v-row>
          <v-col :md="4" :sm="6" :xs="12" v-for="(item,id) in props.items" :key="id">
            <device-card :device="item" :mainTitle="title"/>
          </v-col>
        </v-row>
      </template>
        <template v-slot:footer>
          <v-toolbar
            flat
            dense
          >
            <v-spacer />
            <v-btn icon color="grey--darken-2" @click.stop="tuneDialog=true">
              <v-icon>
                tune
              </v-icon>
            </v-btn>
          </v-toolbar>
        </template>
    </v-data-iterator>
    <v-dialog
      v-model="tuneDialog"
      max-width="480"
    >
      <v-card>
        <v-card-title class="headline">Setup</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="tuneDialog=false"
          >
            Disagree
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="tuneDialog=false"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      sortBy:'time',
      sortDesc:true,
      title:'active',
      tuneDialog:false,
      itemsPerPage:6,
    }
  },
  methods:{
    changeTab(title) {
      this.title = title == 'time' ? 'active' : title
      this.sortDesc = title != 'battery'
      this.sortBy = title
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
