import TInput from './components/t-input2'
import TModal from '@/components/t-modal'
import WithdrawalModal from './components/withdrawal-modal'
import tools from '@/assets/js/tools'
import UpdateToken from '@/components/update-token'

export default {
  components: {
    TInput, WithdrawalModal, TModal, UpdateToken
  },
  props: ['active_app'],
  data() {
    return {
      is_edited: false,
      open_edit_modal: false,
      submit_form: {
        session_id: '',
        pin_token: '',
        private_key: ''
      },
      assets_list: [],
      loading: false,
      whole_loading: false,
      show_withdrawal: false,
      active_asset: {}
    }
  },
  watch: {
    active_app(val) {
      if (window.localStorage.getItem(val.app_id)) {
        _get_assets_list.call(this)
      }
    }
  },
  methods: {
    close_modal() {
      this.open_edit_modal = false
    },
    click_withdrawal(item) {
      this.active_asset = {}
      this.active_asset = item
      setTimeout(() => {
        this.show_withdrawal = true
      }, 200)
    },
    update_list() {
      _get_assets_list.call(this, true)
    }
  },
  mounted() {
    if (window.localStorage.getItem(this.active_app.app_id)) {
      _get_assets_list.call(this)
    }
  },
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
