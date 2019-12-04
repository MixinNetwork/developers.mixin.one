import Vue from 'vue'
import Vuex from 'vuex'
import axios from './assets/js/api/index'

Vue.use(Vuex)

let state = {
    transition_name: '',
    can_transition: false,
    active_app: {},
    user_info: {},
    app_list: [],
    active_asset: {}
}

let mutations = {
    change_state(state, obj) {
        for (let key in obj) {
            state[key] = obj[key]
        }
    }
}

let actions = {
    init_app(context, force_reload) {
        if (force_reload || !context.state.user_info.full_name) {
            return new Promise((resolve, reject) => {
                Promise.all([axios_get_me.call(context), axios_get_app_list.call(context)]).then(_ => {
                    resolve()
                })
            })
        }
        return new Promise(res => res())
    }
}

export default new Vuex.Store({
    state,
    mutations,
    actions
})

function axios_get_me() {
    return new Promise(resolve => {
        axios.get('/me').then(res => {
            this.commit('change_state', { user_info: res })
            resolve()
        })
    })

}
function axios_get_app_list() {
    return new Promise(resolve => {
        axios.get('/apps').then(res => {
            this.commit('change_state', { app_list: res })
            resolve()
        })
    })

}