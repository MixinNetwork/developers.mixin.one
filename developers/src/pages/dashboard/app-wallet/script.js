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
      if (this.$ls.get(val.app_id)) {
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
    if (this.$ls.get(this.active_app.app_id)) {
      _get_assets_list.call(this)
    }
  },
}

async function _get_assets_list() {
  this.whole_loading = true
  let client_info = this.$ls.get(this.active_app.app_id)
  if (!client_info) {
    this.is_edited = false
    this.open_edit_modal = true
    this.whole_loading = false
    return
  }
  try {
    let assets_token = tools.getJwtToken(client_info, 'get', '/assets')
    _vm._not_through_interceptor = true
    let res = await this.apis.get_assets(assets_token)
    if (res) {
      this.assets_list = res.sort(compare)
      this.is_edited = true
      this.open_edit_modal = false
    } else {
      this.is_edited = false
      this.open_edit_modal = true
      this.$ls.rm(this.active_app.app_id)
    }
  } catch (e) {
    this.$message.error({ message: this.$t("message.errors.401"), showClose: true })
    this.is_edited = false
    this.open_edit_modal = true
    this.$ls.rm(this.active_app.app_id)
  } finally {
    this.whole_loading = false
    _vm._not_through_interceptor = false
  }
}

function compare(a, b) {
  let cmp = 0
  let ap = new BigNumber(a.balance).times(a.price_usd)
  let bp = new BigNumber(b.balance).times(b.price_usd)
  cmp = calc_cmp(ap, bp)
  if (cmp === 0) cmp = calc_cmp(a.balance, b.balance)
  if (cmp === 0) cmp = calc_cmp(a.price_usd, b.price_usd)
  return cmp

  function calc_cmp(a, b) {
    a = new BigNumber(a)
    b = new BigNumber(b)
    if (a.gt(b)) return -1
    if (a.lt(b)) return 1
    return 0
  }
}
