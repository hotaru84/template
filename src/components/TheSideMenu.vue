<template>
  <div>
    <v-navigation-drawer
      app
      clipped
      permanent
      color="grey lighten-4"
    >
      <v-list
        dense
        class="grey lighten-4"
      >
        <template v-for="(item, i) in items">
          <v-row
            v-if="item.heading"
            :key="i"
            align="center"
          >
            <v-col cols="6">
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-col>
            <v-col
              cols="6"
              class="text-right"
            >
              <v-btn
                small
                text
              >edit</v-btn>
            </v-col>
          </v-row>
          <v-divider
            v-else-if="item.divider"
            :key="i"
            dark
            class="my-4"
          />
          <v-list-item
            v-else
            :key="i"
            link
            :to="item.to"
            @click.stop="itemClick(item)"
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text">
                {{ $t(item.text) }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>

export default {
  props: {
    name: {
      type:String
    },
    subname: {
      type:String
    },
    color: {
      type:String,
      required:true
    }
  },
  data: () => ({
    items: [
      { icon: 'lightbulb_outline', text:'app.home', to:'/' },
      { icon: 'list ', text:'app.datatable', to:'/logs'},
      { icon: 'image', text:'app.gallery', to:'/gallery'},
      { icon: 'phone_android', text:'app.devices', to:'/devices'},
      { divider: true },
      { icon: 'phonelink', text: 'app.setup', to:'/setup' },
      { icon: 'settings', text: 'app.settings', to:'settings' },
      { icon: 'perm_device_information', text: 'app.about', to:'/about' },
    ],
  }),
  methods:{
    itemClick: function(item){
      if(item.click != null){
        item.click()
      }
    },
  }
}
</script>
<style scoped>
#keep .v-navigation-drawer__border {
  display: none
}
</style>