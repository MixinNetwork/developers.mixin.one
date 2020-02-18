import Vue from 'vue'
import Vuex from 'vuex'
import apis from './api'

Vue.use(Vuex)

let state = {
  transition_name: '',
  can_transition: false,
  active_app: {},
  app_name: '',
  resource_patterns: '',
  immersive_status: false,
  tmp_app_name: '',
  tmp_resource_patterns: '',
  tmp_immersive_status: false,
  user_info: {},
  apps_property: {},
  app_list: [],
  asset_list: [],
  active_asset: {},
  back_to_wallet: false,
  nav_header_index: 0
}

let mutations = {
  change_state(state, obj) {
    for (let key in obj) {
      if (key === 'active_app' && !obj[key]) state[key] = {}
      else state[key] = obj[key]
    }
  },
  cache_new_app(state, cache_status) {
    if (cache_status === false) {
      state.tmp_app_name = state.app_name
      state.tmp_immersive_status = state.immersive_status
      state.tmp_resource_patterns = state.resource_patterns
    } else if (cache_status === true) {
      state.app_name = state.tmp_app_name
      state.immersive_status = state.tmp_immersive_status
      state.resource_patterns = state.tmp_resource_patterns
    } else if (cache_status === null) {
      state.tmp_app_name = ''
      state.tmp_immersive_status = false
      state.tmp_resource_patterns = ''
      state.app_name = ''
      state.immersive_status = false
      state.resource_patterns = ''
      state.active_app = {
        name: "",
        home_uri: "",
        redirect_uri: "",
        icon_url: "",
        description: ""
      }
    }
  }
}

let actions = {
  init_app(context, force_reload) {
    if (!context.state.user_info.full_name) {
      return new Promise((resolve, reject) => {
        Promise.all([axios_get_me.call(context), axios_get_app_list.call(context), axios_get_apps_property.call(context)]).then(_ => {
          resolve()
        })
      })
    }
    if (force_reload || context.state.app_list.length === 0) {
      Promise.all([axios_get_app_list.call(context)]).then(_ => {
        return true
      })
    }
    return new Promise(res => res())
  },
  init_assets(context, token, force_reload) {
    if (force_reload || context.state.user_info.asset_list.length === 0) {
      Promise.all([axios_get_assets_list.call(context, token)]).then(_ => {
        return true
      }).catch(err => false)
    }
    return new Promise(res => res())
  },
  init_apps_property(context) {
    axios_get_apps_property.call(context)
  },
  get_apps_property(context) {
    return new Promise(resolve => {
      let { state } = context
      let { app_list, apps_property } = state
      let app_nums = app_list.length
      let { count, price } = apps_property
      let unit_cost = (app_nums + 1 - Number(count)) * Number(price)
      if (unit_cost > 0) {
        axios_get_apps_property.call(context).then(res => {
          let { count, price } = res
          let unit_cost = (app_nums + 1 - Number(count)) * Number(price)
          resolve(unit_cost)
        })
      } else resolve(unit_cost)
    })
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})

function axios_get_me() {
  return new Promise(resolve => {
    apis.get_me().then(res => {
      this.commit('change_state', { user_info: res })
      resolve()
    })
  })
}

function axios_get_apps_property() {
  return new Promise(resolve => {
    apis.get_apps_property().then(res => {
      this.commit('change_state', { apps_property: res })
      resolve(res)
    })
  })
}

function axios_get_app_list() {
  return new Promise(resolve => {
    apis.get_apps().then(res => {
      this.commit('change_state', { app_list: res })
      resolve()
    })
  })
}

function axios_get_assets_list(token) {
  return new Promise(resolve => {
    apis.get_assets(token).then(res => {
      this.commit('change_state', { asset_list: res })
      resolve()
    })
  })
}
