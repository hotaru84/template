<template>
<v-card outlined class="ma-2">
  <v-card-actions>
    <v-btn icon @click="addImg"><v-icon>add</v-icon></v-btn>
  </v-card-actions>
  <v-container fill-height class="overflow-y-auto">
    <v-row>
      <v-col
        v-for="(image,index) in imagesInADay" :key="index"
        class="d-flex child-flex"
        cols="2"
      >
        <v-card flat tile class="d-flex">
          <v-img :src="blob2Url(image.blob)">
            <template v-slot:placeholder>
              <v-row
                class="fill-height ma-0"
                align="center"
                justify="center"
              >
                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</v-card>
</template>
<script>
import {mapActions,mapGetters} from 'vuex'

const axios = require('axios')
const moment = require('moment')

export default {
  data() {
    return {
      hours:[],
      images:[]
    }
  },
  methods:{
    ...mapActions('image',['FETCH_DAILY_IMG','ADD_IMG','DELETE_IMG']),
    blob2Url(blob) {
      return URL.createObjectURL(blob)
    },
    getDate(ts) {
      return moment(ts).format('HH:mm:ss')
    },
    imagesInHour(h){
      return this.imagesInADay.filter(img=>{
        let hh = moment(img.time).startOf('hour').format('HH:mm')
        return hh == h
      })
    },
    addImg(){
      let seed = Math.random() * 10
      const url = 'https://picsum.photos/seed/' + seed + '/1200/1080'
      axios.get(url, {responseType:'blob'})
      .then(response =>{
        const blob = new Blob([response.data],{
          type:response.data.type
        })
        let time = moment().startOf('day').add(Math.random()*24, 'hour')
        this.ADD_IMG({
          time: time.valueOf(),
          serial:'serial',
          name:seed,
          blob:blob
        })      
      })
    }
  },
  computed: {
    ...mapGetters('filter',['serial']),
    ...mapGetters('image',['imagesInADay'])
  },
  mounted() {
    for(let h = 0; h < 24; h++) this.hours.push(moment().startOf('day').add(h,'hour').format('HH:mm'))
    this.FETCH_DAILY_IMG({date:moment().format('YYYY-MM-DD')})
  },
  beforeDestroy() {
    this.imagesInADay.forEach(image => {
      URL.revokeObjectURL(image.blob)
    });
  }
}
</script>
