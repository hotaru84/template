<template>
  <v-app>
    <navigation-side-bar />
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
import NavigationSideBar from './components/NavigationSideBar'

export default {
  name: 'App',
  components: {
    NavigationSideBar
  },
  methods:{

  }
};
</script>