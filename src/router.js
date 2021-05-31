import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/pages/Home.vue'
import Play from '@/components/pages/Play.vue'
import store from '@/states/state.js'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/play',
      component: Play,
      beforeEnter: (to, from, next) => {
        if (store.game.id) {
          next()
        } else {
          next('/')
        }
      }
    }
  ]
})
