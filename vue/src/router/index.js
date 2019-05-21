import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import PreImg from '@/components/preImg/main'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/preImg',
    name: 'PreImg',
    component: PreImg
  }
  ]
})
