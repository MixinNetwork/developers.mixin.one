import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/auto-change'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
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
  },
  {
    path: '/withdrawal/:app_number',
    component: Dashboard,
    meta: { tree: 3 }
  },
]

const router = new VueRouter({ routes, mode: 'history' })

export default router
