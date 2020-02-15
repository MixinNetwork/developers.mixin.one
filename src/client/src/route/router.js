import Vue from 'vue'
import VueRouter from 'vue-router'
import pc_router from './pc-router'
import h5_router from './h5-router'
import store from '../store'

Vue.use(VueRouter)

const routes = navigator.appVersion.includes('Mobile') ? h5_router : pc_router

const router = new VueRouter({ routes, mode: 'history' })

router.beforeEach((to, from, next) => {
    let can_transition = store.state.can_transition
    store.commit('change_state', { transition_name: 'slide-none' })
    if (can_transition) {
        if (from.meta.tree > to.meta.tree) {
            store.commit('change_state', { transition_name: 'slide-right' })
        } else if (from.meta.tree < to.meta.tree) {
            store.commit('change_state', { transition_name: 'slide-left' })
        } else {
            store.commit('change_state', { transition_name: 'slide-none' })
        }
        store.commit('change_state', { can_transition: false })
    }
    next()
})
export default router
