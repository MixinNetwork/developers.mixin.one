import Dashboard from '../views/dashboard'

export default [
    {
        path: '/',
        component: Dashboard,
        children: [
            {
                path: 'app/:app_number',
                name: 'information',
                component: () => import('../views/dashboard/components/app-information')
            },
            {
                path: 'new',
                name: 'new_app',
                component: () => import('../views/dashboard/components/app-information')
            }
        ]
    }
]