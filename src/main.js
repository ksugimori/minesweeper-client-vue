import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import store from './states/store'
import router from './router'

Vue.config.productionTip = false

Vue.use(Vuex)

new Vue({
  store: new Vuex.Store(store),
  router,
  render: h => h(App)
}).$mount('#app')
