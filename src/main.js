import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router/router'
import vuetify from '@/plugins/vuetify' 
import store from './store'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/messaging'
import 'firebase/storage'

Vue.use(Vuelidate)
Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  created(){
    var firebaseConfig = {
      apiKey: "AIzaSyAVQK77qmnD6tpASjrZ3h36pM7e3ik0Ytk",
      authDomain: "filmlibs.firebaseapp.com",
      databaseURL: "https://filmlibs-default-rtdb.firebaseio.com",
      projectId: "filmlibs",
      storageBucket: "filmlibs.appspot.com",
      messagingSenderId: "370249657286",
      appId: "1:370249657286:web:e8e02878ad63c450c7e0c7",
      measurementId: "G-L74B7CH4S8"
    };
    // Initialize Firebase
    firebase.default.initializeApp(firebaseConfig);
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.$store.dispatch('loggedUser', user)
      }
    })
    // firebase.analytics();
  },
  render: h => h(App),
}).$mount('#app')
