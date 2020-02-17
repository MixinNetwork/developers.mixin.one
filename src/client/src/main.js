import Vue from 'vue'
import App from './App.vue'
import router from './route/router'
import apis from './api'
import './assets/iconfont/iconfont.css'
import _const from './assets/js/const'
import $bus from './assets/js/bus'
import store from './store'
import VueClipboard from 'vue-clipboard2'
import i18n from './assets/i18n'
import { Message, MessageBox, Loading } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;

Vue.use(Loading.directive);
Vue.use(VueClipboard)
Vue.config.productionTip = false
Vue.config.devtools = true


Vue.prototype.apis = apis
Vue.prototype._const = _const
Vue.prototype.$bus = $bus

window.localStorage.setItem('token', 'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJhaWQiOiI5MzhkMGMwOC1kMTBhLTRkYTItYTlmMy03NGNmZDVhODA3YjciLCJleHAiOjE2MTM0MzgwNjEsImlhdCI6MTU4MTkwMjA2MSwiaXNzIjoiZmJkMjZiYzYtM2QwNC00OTY0LWE3ZmUtYTU0MDQzMmIxNmUyIn0.W_Xq_V3KJ0N2wHUJGq1OJ6Fj8t4phEe65zD0gpbQ6-KqPf7Ex6t7YAlvEheGQu0ieOqYExtCxqq4sC6_d69ItxfLqp2_u6hovYNwzLz1koHu5laMa0arBM4i-t05JnlRjctPq_7XkmfOs0_xf90I_Q62tbLH7rbuOGZyCxCnXWY')

new Vue({
  render: h => h(App),
  router,
  store,
  i18n
}).$mount('#app')
