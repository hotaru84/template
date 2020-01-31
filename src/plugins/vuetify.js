import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
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
