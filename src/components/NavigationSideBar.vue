<template>
  <v-navigation-drawer
    app
    clipped
    color="grey lighten-4"
  >
    <v-list
      dense
      class="grey lighten-4"
    >
      <template v-for="(item, i) in menus">
        <v-list-item
          :key="i"
          link
          :to="item.to">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="grey--text">
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  data() {
    return {
      menus:[
        { icon: 'phone_android', text: 'Home', to:'/home'},
        { icon: 'playlist_add_check', text: 'Data',to:'/data'},
        { icon: 'photo_library', text: 'Gallery', to:'/gallery'}
      ]
    }
  }
}
</script>