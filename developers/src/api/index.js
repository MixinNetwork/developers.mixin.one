import api from './config'

const getHeader = token => ({ headers: { 'Authorization': 'Bearer ' + token } })
export default {
  authenticate: (code) => api.post('/oauth/token', { client_id: process.env.VUE_APP_CLIENT_ID, code }),
  get_apps_property: () => api.get('/apps/property'),
  get_me: () => api.get('/me'),
  get_apps: () => api.get('/apps'),
  set_app: (app_id, data) => api.post(app_id ? '/apps/' + app_id : '/apps', data),
  app_new_secret: app_id => api.post('/apps/' + app_id + '/secret'),
  app_new_session: (app_id, pin, session_secret) => api.post(`/apps/${app_id}/session`, { pin, session_secret }),
  get_assets: token => api.get('/assets', getHeader(token)),
  app_show_qrcode: token => api.get('/me', getHeader(token)),
  app_rotate_qrcode: token => api.get('/me/code', getHeader(token)),
  transfers: (data, token) => api.post('/transfers', data, getHeader(token)),
  transactions: (data, token) => api.post('/transactions', data, getHeader(token)),
  search: (identity_number, token) => api.get('/search/' + identity_number, getHeader(token)),
  check_user: (user_id, token) => api.get('/users/' + user_id, getHeader(token)),
}

