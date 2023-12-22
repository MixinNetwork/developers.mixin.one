import { createApp } from 'vue';
import { createPinia } from 'pinia';
import {
  ElMessage,
  ElLoading,
  ElMenu,
  ElSubMenu,
  ElMenuItem,
} from 'element-plus';
import VueCroppie from 'vue-croppie';

import App from '@/App.vue';
import router from '@/router';
import i18n from '@/i18n';
import DashboardLayout from '@/layout/DashboardLayout.vue';
import DocumentLayout from '@/layout/DocumentLayout.vue';

import '@/assets/font/dashboard.css';
import '@/assets/font/home.css';

const pinia = createPinia();
const app = createApp(App);
app.use(pinia)
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
