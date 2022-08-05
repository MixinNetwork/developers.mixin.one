import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: 'home',
    component: () => import('@/layout/index'),
    children: [
      {
        path: '/auth',
        name: 'Auth',
        component: () => import('./components/Auth'),
        meta: { type: 'document' },
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('./pages/dashboard'),
        meta: { type: 'dashboard' },
      },
      {
        path: 'apps/new',
        name: 'new_app',
        component: () => import('./pages/app-new'),
        meta: { type: 'dashboard' },
      },
      {
        path: 'apps/:app_number',
        name: 'app_info',
        component: () => import('./pages/app-container'),
        meta: { type: 'dashboard' },
      },

      {
        path: 'home',
        name: 'home',
        component: () => import('./pages/home'),
        meta: { type: 'document' },
      },
      {
        path: 'news',
        name: 'news',
        component: () => import('./pages/home/News'),
      },
      {
        path: 'cases',
        name: 'cases',
        component: () => import('./pages/home/Cases'),
      },
      {
        path: 'news/:filename',
        name: 'news_detail',
        component: () => import('./pages/home/Detail'),
      },
      {
        path: 'cases/:filename',
        name: 'cases_detail',
        component: () => import('./pages/home/Detail'),
      },
      {
        path: 'document*',
        name: 'detail',
        component: () => import('./pages/home/Document'),
      },
      {
        path: 'search',
        name: 'search',
        component: () => import('./pages/home/Search'),
      },

      {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('./404'),
      },
    ],
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
