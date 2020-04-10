import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('./pages/home')
  },
  {
    path: '/news',
    name: 'news',
    component: () => import('./pages/home/News')
  },
  {
    path: '/cases',
    name: 'cases',
    component: () => import('./pages/home/Cases')
  },
  {
    path: '/news/:id',
    name: 'news_detail',
    component: () => import('./pages/home/Detail')
  },
  {
    path: '/cases/:id',
    name: 'cases_detail',
    component: () => import('./pages/home/Detail')
  },
  {
    path: '/document',
    name: 'document',
    component: () => import('./pages/home/Document'),
  },
  {
    path: '/document/:title',
    name: 'detail',
    component: () => import('./pages/home/Document'),
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('./pages/dashboard'),
  },
  {
    path: '/apps/:app_number',
    name: 'information',
    component: () => import('./pages/dashboard'),
  },
  {
    path: '/apps/new',
    name: 'new_app',
    component: () => import('./pages/dashboard'),
  }
]

const router = new VueRouter({ routes, mode: 'history' })

export default router
