import Vue from 'vue'
import App from './App.vue'
import router from './router'
import apis from './api'
import './assets/font/font.css'
import _const from './assets/js/const'
import VueClipboard from 'vue-clipboard2'
import i18n from './i18n'
import { Message, Loading } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueCroppie from 'vue-croppie';
import 'croppie/croppie.css'

Vue.prototype.$message = Message;

window.localStorage.setItem('token', 'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJhaWQiOiJkOWIzNGU4Mi00NjQ3LTQwZTItYWFhZC03MTdiNTdkZWViMGIiLCJleHAiOjE2MTc0NTczMzMsImlhdCI6MTU4NTkyMTMzMywiaXNzIjoiZmJkMjZiYzYtM2QwNC00OTY0LWE3ZmUtYTU0MDQzMmIxNmUyIn0.ETlvTGQReBXey4_RJAdv4N3dX_IwHGoOuLP-4sdU_WwPwIow7RMe9Sn7DydcIYYVgVNJJlNs7kG-xo0Jnw10Y4c5Fg0MDJVCjo9lahgPMOTGMv9tdHvIk_wXRT9APqvQi9Rql3nlABXtERXRo-2AZie6l8Ugcv1ynkU90YW4JmY')

Vue.use(Loading.directive);
Vue.use(VueClipboard)
Vue.use(VueCroppie);
Vue.config.productionTip = false

Vue.prototype.apis = apis
Vue.prototype._const = _const

new Vue({
  render: h => h(App),
  router,
  i18n
}).$mount('#app')
