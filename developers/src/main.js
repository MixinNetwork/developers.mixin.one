import { createApp } from 'vue'
import { ElMessage, ElLoading, ElMenu, ElSubMenu, ElMenuItem } from 'element-plus'
import VueCroppie from 'vue-croppie'

import App from '@/App.vue'
import router from '@/router'
import i18n from '@/i18n'
import { ls } from '@/utils'

import 'croppie/croppie.css'
import '@/assets/font/dashboard.css'
import '@/assets/font/home.css'

const app = createApp(App);
app.use(router)
   .use(i18n)
   .use(ElMenu)
   .use(ElLoading)
   .use(ElSubMenu)
   .use(ElMenuItem)
   .use(VueCroppie)
   .provide('$message', ElMessage)

app.config.globalProperties.$message = ElMessage
// app.config.globalProperties.$ls = ls

app.mount('#app');
