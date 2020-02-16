import Vue from 'vue'
import App from './App.vue'
import router from './route/router'
import apis from './api'
import './assets/iconfont/iconfont.css'
import _const from './assets/js/const'
import $bus from './assets/js/bus'
import VueTouch from 'vue-touch'
import store from './store'
import VueClipboard from 'vue-clipboard2'
import i18n from './assets/i18n'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(elementUI)


Vue.use(VueClipboard)
Vue.use(VueTouch, { name: 'v-touch' })
VueTouch.config.swipe = {
  threshold: 100
}
Vue.config.productionTip = false
Vue.config.devtools = true


Vue.prototype.apis = apis
Vue.prototype._const = _const
Vue.prototype.$bus = $bus

window.localStorage.setItem('token', 'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJhaWQiOiJiOTE5ZTAwZi0zYWQ0LTQxNjktYjk3NC1lYTRkMDVlZDI1YzQiLCJleHAiOjE2MTMzNTk1OTYsImlhdCI6MTU4MTgyMzU5NiwiaXNzIjoiZmJkMjZiYzYtM2QwNC00OTY0LWE3ZmUtYTU0MDQzMmIxNmUyIn0.IP-5Yn0_uppXhR00SPfRbC5VbbW3pvclxs-IgFpuSA7PMxmzKSc1zJFFmPulZ2obneSIO3mVs98B0cg5tT6fJvV3jbzsKSpKeWvl_96HTJhBE8odpvdVhQTs8RyrWNgjrUBTSj2Zhc842qqeeGnKc23b1lPsvRfPrC8DehCvA1w')
new Vue({
  render: h => h(App),
  router,
  store,
  i18n
}).$mount('#app')
