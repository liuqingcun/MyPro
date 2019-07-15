import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/home'
import Emoji from '@/page/emoji/emoji'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/emoji',
      name: 'Emoji',
      component: Emoji
    }
  ]
})
