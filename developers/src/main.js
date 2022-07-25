import { createApp } from 'vue'
import { ElMessage, ElLoading, ElMenu, ElSubMenu, ElMenuItem } from 'element-plus'
import VueClipboard from 'vue-clipboard2'
import VueCroppie from 'vue-croppie'

import App from '@/App.vue'
import router from '@/router'
import i18n from '@/i18n'
import ls from '@/assets/js/localStorage'
import _const from '@/assets/js/const'

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
   .use(VueClipboard)
// .use(VueCroppie) // todo: vue2 only

app.config.globalProperties.$message = ElMessage
app.config.globalProperties.$ls = ls
app.config.globalProperties._const = _const

app.mount('#app');
