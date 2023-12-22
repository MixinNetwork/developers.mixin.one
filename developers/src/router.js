import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('./pages/home/index.vue'),
    meta: { type: 'document' },
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('./components/Auth.vue'),
    meta: { type: 'document' },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('./pages/dashboard/index.vue'),
    meta: { type: 'dashboard' },
  },
  {
    path: '/apps/new',
    name: 'new_app',
    component: () => import('./pages/app-creation/index.vue'),
    meta: { type: 'dashboard' },
  },
  {
    path: '/apps/:app_number',
    name: 'app_info',
    component: () => import('./pages/app/index.vue'),
    meta: { type: 'dashboard' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('./404.vue'),
    meta: { type: 'document' },
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
