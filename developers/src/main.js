import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import apis from '@/api'
import '@/assets/font/dashboard.css'
import '@/assets/font/home.css'
import _const from '@/assets/js/const'
import VueClipboard from 'vue-clipboard2'
import i18n from '@/i18n'
import { Message, Loading } from 'element-ui'

import VueCroppie from 'vue-croppie'
import 'croppie/croppie.css'

Vue.prototype.$message = Message
Vue.use(Loading.directive)
Vue.use(VueClipboard)
Vue.use(VueCroppie)
Vue.config.productionTip = false

Vue.prototype.apis = apis
Vue.prototype._const = _const

new Vue({
  render: h => h(App),
  router,
  i18n
}).$mount('#app')
