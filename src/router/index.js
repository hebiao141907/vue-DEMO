import Vue from 'vue'
import Router from 'vue-router'
import Pos from '@/components/page/Pos'
import Store from '@/components/page/Store'
import Goods from '@/components/page/Goods'
import Member from '@/components/page/Member'
import Count from '@/components/page/Count'
import Set from '@/components/page/Set'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Pos',
      component: Pos
    },{
      path: '/store',
      name: 'Store',
      component: Store
    },{
      path: '/goods',
      name: 'Goods',
      component: Goods
    },{
      path: '/member',
      name: 'Member',
      component: Member
    },{
      path: '/count',
      name: 'Count',
      component: Count
    },{
      path: '/set',
      name: 'Set',
      component: Set
    }
  ]
})
