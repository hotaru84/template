<template>
  <v-app>
    <the-side-menu color="grey"/>
    <v-content >
      <transition
        name="fade"
        mode="out-in"
      >
        <router-view/>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
import TheSideMenu from './components/TheSideMenu'

export default {
  name: 'App',
  components: {
    TheSideMenu
  },
  data: () => ({
  }),
  created: function() {
    this.$store.dispatch("device/FETCH_DEVICE")
    this.$store.dispatch("data/FETCH_DATA")
  }
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>
