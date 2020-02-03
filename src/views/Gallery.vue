<template>
<v-card outlined class="ma-2">
  <v-container fill-height class="overflow-y-auto">
    <v-timeline dense align-top>
      <v-timeline-item fill-dot v-for="(hour,idx) in hours" :key="idx">
        <v-row>
          <v-col cols="6">
            <span class="caption">{{hour}}</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="3" v-for="col in 4" :key="col">
            <v-img :src="'https://picsum.photos/seed/' +hour + col +'/320/480'">
            </v-img>
          </v-col>
        </v-row>
      </v-timeline-item>
    </v-timeline>
  </v-container>
</v-card>
</template>
<script>
export default {
  data() {
    return {
      hours:["00:00","01:00","02:00","03:00","04:00"]
    }
  }
}
</script>
