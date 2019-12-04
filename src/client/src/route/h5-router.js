import Dashboard from '../views/dashboard-app'
import App from '../views/dashboard-app/components'
export default [
    {
        path: '/',
        component: Dashboard,
        meta: { tree: 0 }
    },
    {
        path: '/app',
        component: App,
        meta: { tree: 1 },
        children: [
            {
                path: 'information/:app_number',
                name: 'information',
                meta: { tree: 6 },
                component: () => import('../views/dashboard-app/components/app-information')
            },
            {
                path: 'new',
                name: 'new_app',
                meta: { tree: 6 },
                component: () => import('../views/dashboard-app/components/app-information')
            },
            {
                path: 'wallet/:app_number',
                name: 'wallet',
                meta: { tree: 7 },
                component: () => import('../views/dashboard-app/components/app-wallet')
            },
            {
                path: 'secret/:app_number',
                name: 'secret',
                meta: { tree: 8 },
                component: () => import('../views/dashboard-app/components/app-secret')
            }
        ]
    }
]