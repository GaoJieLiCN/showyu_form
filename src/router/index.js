import Vue from 'vue'
import Router from 'vue-router'

import startPage from '@/components/startPage'
import endShare from '@/components/endShare'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/h5/dhr',
      name: 'startPage',
      component: startPage
    },
    {
      path: '/h5/dhr/endShare',
      name: 'endShare',
      component: endShare
    }
  ]
})
