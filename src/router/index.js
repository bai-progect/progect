import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
  {
    path: '/',
    redirect: '/businesstravel'
  },
  {
    path: '/businesstravel',
    name: 'businesstravel',
    component: () => import('@/components/businesstravel')
  },
  {
    path: '/HistoryList',
    name: 'HistoryList',
    component: () => import('@/components/HistoryList')
  },
  {
    path: '/HistoryListdetails',
    name: 'HistoryListdetails',
    component: () => import('@/components/HistoryListdetails')
  },
 //增删改查
  {
    path: '/zengshan',
    name: 'zengshan',
    component: () => import('@/components/zengshan')
  },
 
  ]
})
