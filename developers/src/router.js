import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from './views/Dashboard'
import Home from './views/Home'

import News from './views/Home/News.vue'
import Detail from './views/Home/Detail.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/news',
    name: 'news',
    // component: () => import('./views/Home/News.vue')
    component: News
  },
  {
    path: '/cases',
    name: 'cases',
    component: () => import('./views/Home/Cases.vue')
  },
  {
    path: '/news/:id',
    name: 'news_detail',
    // component: () => import('./views/Home/Detail.vue')
    component: Detail
  },
  {
    path: '/cases/:id',
    name: 'cases_detail',
    component: () => import('./views/Home/Detail.vue')
  },
  {
    path: '/api',
    name: 'api',
    component: () => import('./views/Api'),
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
  },
  {
    path: '/apps/:app_number',
    name: 'information',
    component: Dashboard
  },
  {
    path: '/apps/new',
    name: 'new_app',
    component: Dashboard
  }
]

const router = new VueRouter({ routes, mode: 'history' })

export default router
