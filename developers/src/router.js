import { createRouter, createWebHistory } from 'vue-router';
import { ls } from './utils/localStorage';
import { redirectToLogin } from './api/config';

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

router.beforeEach((to) => {
  if (to.meta.type !== 'dashboard') return true;

  const token = ls.get('token');
  if (token && token.user_id && token.private_key && token.scope && token.authorization_id) {
    return true;
  }

  redirectToLogin();
  return false;
});

export default router;
