import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from './assets/js/api/index'
import './assets/iconfont/iconfont.css'
import _const from './assets/js/const'
import $bus from './assets/js/bus'
Vue.config.productionTip = false


Vue.prototype.$axios = axios
Vue.prototype._const = _const
Vue.prototype.$bus = $bus

window.localStorage.setItem('token', 'Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJhaWQiOiI2MDljN2JlNy1iZDI5LTQ5ODAtODlkMC1kOGI2YjYxZTQwMWQiLCJleHAiOjE2MDY1NDcyOTgsImlhdCI6MTU3NTAxMTI5OCwiaXNzIjoiZmJkMjZiYzYtM2QwNC00OTY0LWE3ZmUtYTU0MDQzMmIxNmUyIn0.FnPl1dssdrvCd2b-I7xj6sBGKEYPN0ijzJRqfg7yv1iAICvdDuSdpv36TYDnz-XRANN9Mg3ubtmNzQ4MkBjL10qB_0uDc27O4IX3uhH04Cms0jWPjt8WTV4n4yoDg8iIN2PrWqlpZ7AJGU6rtbnuos2m0xYqpLxGi4d8iLLadQQ')

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
