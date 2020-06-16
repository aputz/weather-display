import Vue from 'vue'
import router from './router'
import store from './store'
import { Navbar, Field, Autocomplete, Notification, Button, Icon, Toast, Tabs } from 'buefy'
import 'buefy/dist/buefy.css'

import App from './App.vue'

Vue.config.productionTip = false
Vue.use(Navbar)
Vue.use(Field)
Vue.use(Autocomplete)
Vue.use(Notification)
Vue.use(Button)
Vue.use(Icon)
Vue.use(Toast)
Vue.use(Tabs)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
