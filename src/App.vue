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

export default {
  name: 'App',
  components: {
  },
};
</script>