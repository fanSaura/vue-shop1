import Vue from 'vue'
import Router from 'vue-router'
import Good from '@/components/Good'
import Rate from '@/components/Rate'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Good',
      component: Good
    },
    {
    	path:'/good',
    	component:Good
    },
    {
      path:'/rate',
      component:Rate
    }
  ]
})
