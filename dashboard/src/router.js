import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from './views'
Vue.use(VueRouter)

const routes = [
  {
    name: 'dashboard',
    path: '/dashboard',
    component: Dashboard,
  },
  {
    name: 'information',
    path: '/apps/:app_number',
    component: Dashboard
  },
  {
    name: 'new_app',
    path: '/apps/new',
    component: Dashboard
  }
]

const router = new VueRouter({ routes, mode: 'history' })

export default router
