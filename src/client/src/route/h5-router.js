import Dashboard from '../views/dashboard-app'
import App from '../views/dashboard-app/components'
export default [
    {
        path: '/',
        component: Dashboard,
        meta: { tree: 0 }
    },
    {
        path: '/apps/:app_number',
        component: App,
        meta: { tree: 1 },
        children: [
        ]
    },
    {
        path: '/apps/new',
        name: 'new_app',
        meta: { tree: 1 },
        component: () => import('../views/dashboard-app/components/app-information')
    },
    {
        path: '/withdrawal/:app_number',
        component: () => import('../views/dashboard-app/components/app-wallet/components/withdrawal'),
        meta: { tree: 3 }
    },
]