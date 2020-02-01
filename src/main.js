import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueI18n from 'vue-i18n'

Vue.config.productionTip = false
Vue.use(VueI18n)
const i18n = new VueI18n({
    locale: navigator.language.split('-')[0],
    fallbackLocale: 'ja',
    messages: {
      'ja': require('./locales/ja.json'),
      'en': require('./locales/en.json'),
    }
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  i18n
}).$mount('#app')
