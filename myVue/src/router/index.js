import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/home'

import Emoji from '@/page/emoji/emoji'
import Event from '@/page/event/main'
import Clip from '@/page/clipImg/main'
import Calendar from '@/page/calendar/main'
import Live from '@/page/live/live'

Vue.use(Router)

export const exportRouterList = [
    {
      path: '/',
      name: 'Home',
      info: {title:'首页',show:false},
      component: Home
    },
    {
      path: '/emoji',
      name: 'Emoji',
      info: {title:'emoji表情',show:true},
      component: Emoji
    },
    {
      path: '/event',
      name: 'Event',
      info: {title:'事件修饰符',show:true},
      component: Event
    },
    {
      path: '/clip',
      name: 'Clip',
      info: {title:'裁剪图片',show:true},
      component: Clip
    },
    {
      path: '/calendar',
      name: 'Calendar',
      info: {title:'日历',show:true},
      component: Calendar
    },
    {
      path: '/live',
      name: 'Live',
      info: {title:'直播',show:true},
      component: Live
    }
  ]
export default new Router({
  routes: exportRouterList
})
