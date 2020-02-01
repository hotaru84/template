<template>
  <v-app>
    <the-header color="grey"/>
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
import TheHeader from './components/TheHeader';

export default {
  name: 'App',
  components: {
    TheHeader
  },

  data: () => ({
    //
  }),
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
