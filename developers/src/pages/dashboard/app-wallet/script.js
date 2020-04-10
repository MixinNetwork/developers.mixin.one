import WithdrawalModal from './withdrawal'
import tools from '@/assets/js/tools'
import UpdateToken from '@/components/UpdateToken'
import BigNumber from 'bignumber.js'

export default {
  components: {
    WithdrawalModal, UpdateToken
  },
  props: {
    active_app: {
      type: Object,
      default() {
        return {}
      }
    }
  },
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

function _get_assets_list() {
  this.whole_loading = true
  let _client_info_str = window.localStorage.getItem(this.active_app.app_id)
  try {
    let assets_token = _get_assets_token.call(this, _client_info_str)
    _vm._not_through_interceptor = true
    this.apis.get_assets(assets_token).then(res => {
      if (res) {
        res = res.sort(compare)
        this.assets_list = res
        this.is_edited = true
        this.open_edit_modal = false
      } else {
        this.is_edited = false
        this.open_edit_modal = true
        window.localStorage.removeItem(this.active_app.app_id)
      }
      _vm._not_through_interceptor = false
    }).finally(_ => {
      this.whole_loading = false
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

function compare(a, b) {
  let cmp = 0;
  let ap = new BigNumber(a.balance).times(a.price_usd);
  let bp = new BigNumber(b.balance).times(b.price_usd);
  if (ap.gt(bp)) {
    cmp = -1
  } else if (ap.lt(bp)) {
    cmp = 1
  }
  if (cmp === 0) {
    ap = new BigNumber(a.balance)
    bp = new BigNumber(b.balance)
    if (ap.gt(bp)) {
      cmp = -1
    } else if (ap.lt(bp)) {
      cmp = 1
    }
  }
  if (cmp === 0) {
    ap = new BigNumber(a.price_usd)
    bp = new BigNumber(b.price_usd)
    if (ap.gt(bp)) {
      cmp = -1
    } else if (ap.lt(bp)) {
      cmp = 1
    }
  }
  return cmp
}