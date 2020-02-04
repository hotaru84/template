<template>
  <v-bottom-sheet v-model="sheet" inset>
    <template v-slot:activator="{ on }">
      <v-btn text v-on="on" class="ma-2">
        {{$t('app.filter')}}
      </v-btn>
    </template>
    <v-sheet>
      <v-card flat>
        <v-card-text>
          <v-text-field
            v-model="searchKeyword"
            :label="$t('filter.search')"
            prepend-icon="search"
            outlined>
          </v-text-field>
          <v-select
            v-model="selectSerial"
            :items="serials"
            :label="$t('filter.device')"
            prepend-icon="phone_android"
            outlined>
          </v-select>
          <v-menu
            v-model="datePicker"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="selectDate"
                prepend-icon="event"
                :label="$t('filter.date')"
                readonly
                outlined
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="selectDate" @input="datePicker = false"></v-date-picker>
          </v-menu>
        </v-card-text>
        <v-card-actions>
        <v-btn text @click="init">{{$t('app.cancel')}}</v-btn>
        <v-btn text @click="submit">{{$t('app.ok')}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-sheet>
  </v-bottom-sheet>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data(){
    return {
      sheet:false,
      searchKeyword:'',
      datePicker:false,
      selectSerial:this.serial,
      selectDate:this.date
    }
  },
  methods:{
    ...mapActions('filter',['SELECT_SERIAL','SELECT_DATE']),
    submit:function(){
      this.SELECT_SERIAL(this.selectSerial)
      this.SELECT_DATE(this.selectDate) 
      this.sheet = false
    },
    init:function() {
      this.selectSerial = this.serial
      this.selectDate = this.date
      this.sheet = false
    }
  },
  computed:{
    ...mapGetters('filter',['serial','date']),
    ...mapGetters('device',['serials'])
  },
  mounted:function() {
    this.init()
  }
}
</script>