import tools from '@/assets/js/tools'
import validator from 'validator'

function _check_date() {
  if (!validator.isUUID(this.submit_form.session_id, 4)) {
    this.$message.error({ message: this.$t('message.errors.session_id_format'), showClose: true })
    return false
  }
  if (!validator.isBase64(this.submit_form.pin_token)) {
    this.$message.error({ message: this.$t('message.errors.pin_token_format'), showClose: true })
    return false
  }
  return true
}

function _get_assets_list(force_status) {
  if (!force_status) {
    let { asset_list } = this.$store.state
    if (asset_list && asset_list.length > 0) {
      this.assets_list = asset_list
      this.is_edited = true
      return
    }
  }
  this.whole_loading = true
  let _client_info_str = window.localStorage.getItem(this.active_app.app_id)
  try {
    let assets_token = _get_assets_token.call(this, _client_info_str)
    _vm._not_through_interceptor = true
    this.apis.get_assets(assets_token).then(res => {
      if (res) {
        this.assets_list = res
        this.$store.commit('change_state', { asset_list: res })
        this.is_edited = true
        this.open_edit_modal = false
        this.whole_loading = false
      } else {
        this.is_edited = false
        this.open_edit_modal = true
        this.whole_loading = false
        window.localStorage.removeItem(this.active_app.app_id)
      }
      _vm._not_through_interceptor = false
    })
  } catch (e) {
    window.localStorage.removeItem(this.active_app.app_id)
    this.open_edit_modal = true
    this.whole_loading = false
    this.is_edited = false
  }

}

function _get_assets_token(_client_info_str) {
  let _client_info = JSON.parse(_client_info_str)
  let get_token_obj = {
    uid: this.active_app.app_id,
    sid: _client_info.sid,
    privateKey: _client_info.privateKey
  }
  return tools.getJwtToken(get_token_obj, 'get', 'https://api.mixin.one/assets')
}


function _set_token_obj() {
  let get_token_obj = {
    sid: this.submit_form.session_id,
    pinToken: this.submit_form.pin_token,
    privateKey: this.submit_form.private_key.replace(/\\r\\n/g, '\r\n')
  }
  window.localStorage.setItem(this.active_app.app_id, JSON.stringify(get_token_obj))
}

export { _check_date, _get_assets_list, _set_token_obj }
