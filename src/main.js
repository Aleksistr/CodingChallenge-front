import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import i18n from './i18n'
import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from 'moment'
import Notifications from 'vue-notification'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(Notifications)

Vue.filter('duration', function (value) {
  if (value) {
    moment.locale(i18n.locale)
    return moment.duration(value).humanize()
  }
})

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
