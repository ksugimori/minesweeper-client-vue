import Vue from 'vue'
import Router from 'vue-router'
import Play from '@/components/pages/Play.vue'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/play',
      component: Play
    }
  ]
})
