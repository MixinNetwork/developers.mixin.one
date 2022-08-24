import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('./pages/home'),
    meta: { type: 'document' },
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('./components/Auth'),
    meta: { type: 'document' },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('./pages/dashboard'),
    meta: { type: 'dashboard' },
  },
  {
    path: '/apps/new',
    name: 'new_app',
    component: () => import('./pages/app-creation'),
    meta: { type: 'dashboard' },
  },
  {
    path: '/apps/:app_number',
    name: 'app_info',
    component: () => import('./pages/app'),
    meta: { type: 'dashboard' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('./404'),
    meta: { type: 'document' },
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
