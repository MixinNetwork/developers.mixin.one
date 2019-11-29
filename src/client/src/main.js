import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from './assets/js/api/index'
import './assets/iconfont/iconfont.css'
import 'element-ui/lib/theme-chalk/index.css'
import _const from './assets/js/const'
import $bus from './assets/js/bus'
import { Message, MessageBox, Loading } from 'element-ui'
Vue.config.productionTip = false

Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message

Vue.prototype.$axios = axios
Vue.prototype._const = _const
Vue.prototype.$bus = $bus
Vue.prototype.$confirm = MessageBox.confirm;

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
