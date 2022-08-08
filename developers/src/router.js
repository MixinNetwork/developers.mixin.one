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
    component: () => import('./pages/app-new'),
    meta: { type: 'dashboard' },
  },
  {
    path: '/apps/:app_number',
    name: 'app_info',
    component: () => import('./pages/app-container'),
    meta: { type: 'dashboard' },
  },
  {
    path: '/news',
    name: 'news',
    component: () => import('./pages/home/News'),
    meta: { type: 'document' },
  },
  {
    path: '/cases',
    name: 'cases',
    component: () => import('./pages/home/Cases'),
    meta: { type: 'document' },
  },
  {
    path: '/news/:filename',
    name: 'news_detail',
    component: () => import('./pages/home/Detail'),
    meta: { type: 'document' },
  },
  {
    path: '/cases/:filename',
    name: 'cases_detail',
    component: () => import('./pages/home/Detail'),
    meta: { type: 'document' },
  },
  {
    path: '/document*',
    name: 'detail',
    component: () => import('./pages/home/Document'),
    meta: { type: 'document' },
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('./pages/home/Search'),
    meta: { type: 'document' },
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
