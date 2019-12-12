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

// window.localStorage.setItem('token', 'Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJhaWQiOiI2MDljN2JlNy1iZDI5LTQ5ODAtODlkMC1kOGI2YjYxZTQwMWQiLCJleHAiOjE2MDY1NDcyOTgsImlhdCI6MTU3NTAxMTI5OCwiaXNzIjoiZmJkMjZiYzYtM2QwNC00OTY0LWE3ZmUtYTU0MDQzMmIxNmUyIn0.FnPl1dssdrvCd2b-I7xj6sBGKEYPN0ijzJRqfg7yv1iAICvdDuSdpv36TYDnz-XRANN9Mg3ubtmNzQ4MkBjL10qB_0uDc27O4IX3uhH04Cms0jWPjt8WTV4n4yoDg8iIN2PrWqlpZ7AJGU6rtbnuos2m0xYqpLxGi4d8iLLadQQ')
new Vue({
  render: h => h(App),
  router,
  store,
  i18n
}).$mount('#app')
