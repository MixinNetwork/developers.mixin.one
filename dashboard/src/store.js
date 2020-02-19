import Vue from 'vue'
import Vuex from 'vuex'
import apis from './api'

Vue.use(Vuex)

let state = {
  transition_name: '',
  can_transition: false,
  active_app: {},
  user_info: {},
  apps_property: {},
  app_list: []
}

let mutations = {
  change_state(state, obj) {
    for (let key in obj) {
      if (key === 'active_app' && !obj[key]) state[key] = {}
      else state[key] = obj[key]
    }
  }
}

let actions = {
  async init_app(context, force_reload) {
    if (!context.state.user_info.full_name) {
      let status = await axios_get_me.call(context)
      if (status) status = await axios_get_app_list.call(context)
      if (status) status = await axios_get_apps_property.call(context)
      return
    }
    if (force_reload || context.state.app_list.length === 0) {
      return await axios_get_app_list.call(context)
    }
  },
  async init_apps_property(context) {
    return await axios_get_apps_property.call(context)
  },
  async get_apps_property(context) {
    let { state } = context
    let { app_list, apps_property } = state
    let app_nums = app_list.length
    let { count, price } = apps_property
    let buy_one_app_price = (app_nums + 1 - Number(count)) * Number(price)
    if (buy_one_app_price > 0) {
      let res = await axios_get_apps_property.call(context)
      let { count, price } = res
      let buy_one_app_price = (app_nums + 1 - Number(count)) * Number(price)
      return buy_one_app_price
    } else return buy_one_app_price
  }
}


async function axios_get_me() {
  let res = await apis.get_me()
  this.commit('change_state', { user_info: res })
  return true
}

async function axios_get_apps_property() {
  let res = await apis.get_apps_property()
  this.commit('change_state', { apps_property: res })
  return res
}

async function axios_get_app_list() {
  let res = await apis.get_apps()
  this.commit('change_state', { app_list: res })
  return true
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
