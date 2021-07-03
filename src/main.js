import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router/router'
import vuetify from '@/plugins/vuetify' 
import store from './store'

Vue.use(Vuelidate)
Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
}).$mount('#app')
