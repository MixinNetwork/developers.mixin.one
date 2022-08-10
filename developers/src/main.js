import { createApp } from 'vue';
import {
  ElMessage,
  ElLoading,
  ElMenu,
  ElSubMenu,
  ElMenuItem,
} from 'element-plus';
import VueCroppie from 'vue-croppie';

import App from '@/App.vue';
import store from '@/store'
import router from '@/router';
import i18n from '@/i18n';
import DashboardLayout from '@/layout/DashboardLayout';
import DocumentLayout from '@/layout/DocumentLayout';

import '@/assets/font/dashboard.css';
import '@/assets/font/home.css';

const app = createApp(App);
app.use(store)
  .use(router)
  .use(i18n)
  .use(ElMenu)
  .use(ElLoading)
  .use(ElSubMenu)
  .use(ElMenuItem)
  .use(VueCroppie)
  .provide('$message', ElMessage);

app.component('dashboard-layout', DashboardLayout);
app.component('document-layout', DocumentLayout);

app.config.globalProperties.$message = ElMessage;

app.mount('#app');
