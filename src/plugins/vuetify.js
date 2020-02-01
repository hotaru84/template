import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

import zhHans from 'vuetify/es5/locale/zh-Hans'
import ja from 'vuetify/es5/locale/ja'
import en from 'vuetify/es5/locale/en'

export default new Vuetify({
  lang:{
    locales: {zhHans,ja,en},
    current: 'ja'
  },
  icons: {
    iconfont: 'mdi',
    values: {
      sort:'expand_more',
      complete:'done',
      next:'navigate_next',
      prev:'navigate_before',
      checkboxOff:'check_box_outline_blank',
      checkboxOn:'check_box',
      dropdown:'arrow_drop_down',
      search:'search',
      menu:'menu'
    }
  },
  theme: {
    themes: {
      light: {
        primary: '#607d8b',
        secondary: '#ff9800',
        accent: '#2196f3',
        error: '#f44336',
        warning: '#ffc107',
        info: '#03a9f4',
        success: '#4caf50'
      }
    },
  },
});
