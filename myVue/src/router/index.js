import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/home'
import Emoji from '@/page/emoji/emoji'
import Event from '@/page/event/main'
import Clip from '@/page/clipImg/main'
import Calendar from '@/page/calendar/main'

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
    },
    {
      path: '/event',
      name: 'Event',
      component: Event
    },
    {
      path: '/clip',
      name: 'Clip',
      component: Clip
    },
    {
      path: '/calendar',
      name: 'Calendar',
      component: Calendar
    }
  ]
})
