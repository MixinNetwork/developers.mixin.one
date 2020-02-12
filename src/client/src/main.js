import Vue from 'vue'
import App from './App.vue'
import router from './route/router'
import apis from './api'
import './assets/iconfont/iconfont.css'
// import elementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import _const from './assets/js/const'
import $bus from './assets/js/bus'
import VueTouch from 'vue-touch'
import store from './store'
import VueClipboard from 'vue-clipboard2'
import i18n from './assets/i18n'
Vue.use(VueClipboard)

// Vue.use(elementUI)
Vue.use(VueTouch, { name: 'v-touch' })
VueTouch.config.swipe = {
  threshold: 100 //手指左右滑动距离
}
Vue.config.productionTip = false
Vue.config.devtools = true


Vue.prototype.apis = apis
Vue.prototype._const = _const
Vue.prototype.$bus = $bus

window.localStorage.setItem('token', 'Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJhaWQiOiJmOTRiYjY0Yi1lOGQ1LTRhMGEtOGQ0NS04NzE0ZTAwYzM3ZDIiLCJleHAiOjE2MTMwMTQxNjksImlhdCI6MTU4MTQ3ODE2OSwiaXNzIjoiZmJkMjZiYzYtM2QwNC00OTY0LWE3ZmUtYTU0MDQzMmIxNmUyIn0.tYqrgyxNVou2r0mK6qOna6Zs8lYto_J4fqJdlqG2-k3PQoLR6x8ShM0y_KOZyk4Cq2AqdMQDBoj2Im_3waB_pwokmTImPtMCAshOtiVFKiaPRo8hMDZlPlARxr09SmSC-v5ME9LizvsIxzxTzJGEW9IuT6A3IHE3OHK7kcyjk5c')
new Vue({
  render: h => h(App),
  router,
  store,
  i18n
}).$mount('#app')
