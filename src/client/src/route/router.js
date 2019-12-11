import Vue from 'vue'
import VueRouter from 'vue-router'
import pc_router from './pc-router'
import h5_router from './h5-router'
import store from '../store'

Vue.use(VueRouter)

const routes = navigator.appVersion.includes('Mobile') ? h5_router : pc_router

const router = new VueRouter({ routes, mode: 'history' })

// 路由跳转前进后退动画,Vue原型上定义transition为动画效果
router.beforeEach((to, from, next) => {
    let can_transition = store.state.can_transition
    store.commit('change_state', { transition_name: 'slide-none' })
    if (can_transition) {
        if (from.meta.tree > to.meta.tree) {
            // 后退,想右滑动
            store.commit('change_state', { transition_name: 'slide-right' })
        } else if (from.meta.tree < to.meta.tree) {
            // 前进,想左滑动
            store.commit('change_state', { transition_name: 'slide-left' })
        } else {
            // 同一层级,无动画
            store.commit('change_state', { transition_name: 'slide-none' })
        }
        store.commit('change_state', { can_transition: false })
    }
    next()
})
export default router
