import api from './config'
import axios from 'axios'


const apis = function () {
}

apis.prototype = {
  async authenticate(code) {
    var params = {
      client_id: process.env.VUE_APP_CLIENT_ID,
      code
    };
    let { data } = await axios.post('https://api.mixin.one/oauth/token', params);
    return data;
  },
  async get_apps_property() {
    return await api.get('/apps/property')
  },
  async get_me() {
    return await api.get('/me')
  },
  async get_apps() {
    return await api.get('/apps')
  },
  async get_assets(assets_token) {
    return await api({
      method: 'get',
      url: '/assets',
      headers: { 'Authorization': 'Bearer ' + assets_token }
    })
  },
  async set_app(app_id, data) {
    let post_url = app_id ? '/apps/' + app_id : '/apps'
    return await api.post(post_url, data)
  },
  async app_new_secret(app_id) {
    return await api.post('/apps/' + app_id + '/secret')
  },
  async app_new_session(app_id, pin, session_secret) {
    return await api.post('/apps/' + app_id + '/session', { pin, session_secret })
  },
  async app_show_qrcode(token) {
    return await api({
      method: 'get',
      url: '/me',
      headers: { 'Authorization': 'Bearer ' + token }
    })
  },
  async app_rotate_qrcode(token) {
    return await api({
      method: 'get',
      url: '/me/code',
      headers: { 'Authorization': 'Bearer ' + token }
    })
  },
  async transfers(data, token) {
    return await api({
      method: 'post',
      url: '/transfers',
      data,
      headers: { 'Authorization': 'Bearer ' + token }
    })
  },
  async transactions(data, token) {
    return await api({
      method: 'post',
      url: '/transactions',
      data,
      headers: { 'Authorization': 'Bearer ' + token }
    })
  },
  async search(user_id, token) {
    return await api({
      method: 'get',
      url: '/search/' + user_id,
      headers: { Authorization: 'Bearer ' + token }
    });
  }
}

export default new apis()
