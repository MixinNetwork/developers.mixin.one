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
    path: '/auth',
    name: 'Auth',
    component: () => import('./components/Auth')
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
    path: '/news/:filename',
    name: 'news_detail',
    component: () => import('./pages/home/Detail')
  },
  {
    path: '/cases/:filename',
    name: 'cases_detail',
    component: () => import('./pages/home/Detail')
  },
  {
    path: '/document*',
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
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('./pages/home/Search'),
  },
  {
    path: '*',
    component: () => import('./404')
  }
]

const router = new VueRouter({ routes, mode: 'history' })

export default router
