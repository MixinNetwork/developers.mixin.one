import Vue from 'vue'
import App from './App.vue'
import router from './router'
import apis from './api'
import './assets/font/font.css'
import _const from './assets/js/const'
import store from './store'
import VueClipboard from 'vue-clipboard2'
import i18n from './assets/i18n'
import { Message, Loading } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.prototype.$message = Message;

Vue.use(Loading.directive);
Vue.use(VueClipboard)
Vue.config.productionTip = false
Vue.config.devtools = true


Vue.prototype.apis = apis
Vue.prototype._const = _const

new Vue({
  render: h => h(App),
  router,
  store,
  i18n
}).$mount('#app')
