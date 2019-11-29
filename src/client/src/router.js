import Vue from 'vue'

import VueRouter from 'vue-router'
import Dashboard from './views/dashboard'

Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        component: Dashboard,
        children: [
            {
                path: 'information',
                name: 'information',
                component: () => import('./views/dashboard/components/app-information')
            },
            {
                path: 'wallet',
                name: 'wallet',
                component: () => import('./views/dashboard/components/app-wallet')
            },
            {
                path: 'secret',
                name: 'secret',
                component: () => import('./views/dashboard/components/app-secret')
            }
        ]
    }
]

const router = new VueRouter({ routes })

export default router
