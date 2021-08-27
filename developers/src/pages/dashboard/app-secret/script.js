import DModal from '@/components/DModal'
import UpdateToken from '@/components/UpdateToken'
import Confirm from '@/components/Confirm'
import forge from 'node-forge'
import tools from '@/assets/js/tools'
import Qrious from 'qrious'
export default {
  name: 'app-information',
  components: {
    DModal, UpdateToken, Confirm
  },
  props: {
    active_app: {
      type: Object,
      default() {
        return {}
      }
    },
    is_mobile: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      modal_title: '',
      modal_content: '',
      open_edit_modal: false,
      confirm_modal: false,
      show_transfer_step: false,
      transfer_step: 0,
      confirm_content: '',
      recipient_user: {},
      submit_form: {
        session_id: '',
        pin_token: '',
        private_key: ''
      },
      tmp_action: '',
    }
  },
  methods: {
    confirm_action() {
      switch (this.tmp_action) {
        case 'show':
          _request_qrcode.call(this, true)
          break
        case 'rotate':
          _request_qrcode.call(this, false)
          break
        case 'secret':
          _request_new_secret.call(this)
          break
        case 'session':
          _request_new_session.call(this)
        case 'session_ed25519':
          this.tmp_action = 'session'
          _request_new_session.call(this, 'ed25519')
          break
      }
    },
    close_modal() {
      this.confirm_modal = false
      this.open_edit_modal = false
    },
    request_new_secret() {
      this.tmp_action = 'secret'
      this.confirm_content = this.$t('secret.secret_question')
      this.confirm_modal = true
    },
    request_new_session() {
      this.tmp_action = 'session'
      this.confirm_content = this.$t('secret.session_question')
      this.confirm_modal = true
    },
    request_ed25519_session() {
      this.tmp_action = 'session_ed25519'
      this.confirm_content = this.$t('secret.session_question')
      this.confirm_modal = true
    },
    request_show_qrcode() {
      this.tmp_action = 'show'
      let client_info = this.$ls.get(this.active_app.app_id)
      if (!client_info) return this.open_edit_modal = true
      _request_qrcode.call(this, true, client_info)
    },
    request_rotate_qrcode() {
      this.tmp_action = 'rotate'
      let client_info = this.$ls.get(this.active_app.app_id)
      if (!client_info) return this.open_edit_modal = true
      this.confirm_content = this.$t('secret.rotate_qrcode_question')
      this.confirm_modal = true
    },
    request_show_transfer() {
      this.tmp_action = 'transfer'
      this.modal_title = this.$t('secret.transfer_title')
      this.modal_content = 'input'
    },
    async click_continue_transfer(step) {
      request_transfer_app.call(this, step)
    },
    click_close_transfer_modal() {
      this.show_transfer_step = false
      isStopCheck = true
    },
    click_download_session() {
      _download_app_json.call(this)
    },
    click_copy_success() {
      this.$message.success({ message: this.$t('message.success.copy'), showClose: true })
    },
    click_copy_error() {
      this.$message.error({ message: this.$t('message.errors.copy'), showClose: true })
    },
    click_close_new_secret() {
      this.modal_content = ''
    },
    show_loading() {
      const options = this.is_mobile ?
        { fullscreen: true } :
        { target: document.getElementsByClassName('dashboard-main')[0] }
      this.loading = this.$loading(options)
    },
    hide_loading() {
      if (this.loading) {
        this.loading.close()
        this.loading = null
      }
    }
  },
  mounted() {
    !(this.active_app.app_id || this.$route.params.app_number) && this.$router.push('/dashboard')
  },
}
let once_submit = false

async function _request_new_secret() {
  if (once_submit) return this.$message.error({ message: this.$t('message.errors.reset'), showClose: true })
  this.show_loading()
  once_submit = true
  try {
    const res = await this.apis.app_new_secret(this.active_app.app_id)
    this.$message.success({ message: this.$t('message.success.reset'), showClose: true })
    this.modal_title = this.$t('secret.secret_title')
    this.modal_content = res.app_secret
  } finally {
    once_submit = false
    this.hide_loading()
  }
}

async function _request_new_session(algo = 'rsa') {
  if (once_submit) return this.$message.error({ message: this.$t('message.errors.reset'), showClose: true })
  let pin = _get_pin()
  let key = algo === 'ed25519' ? _get_ed25519_private_key() : _get_private_key()
  let { session_secret, private_key } = key
  once_submit = true
  this.show_loading()
  try {
    const res = await this.apis.app_new_session(this.active_app.app_id, pin, session_secret)
    this.$message.success({ message: this.$t('message.success.reset'), showClose: true })
    let { session_id, pin_token, pin_token_base64 } = res
    let jsonObj = { pin, client_id: this.active_app.app_id, session_id, pin_token, private_key }
    if (algo == 'ed25519') {
      jsonObj['pin_token'] = pin_token_base64
    }
    this.modal_title = this.$t('secret.session_title')
    this.modal_content = JSON.stringify(jsonObj, null, ' ')
    this.$ls.rm(this.active_app.app_id)
  } finally {
    once_submit = false
    this.hide_loading()
  }

  function _get_ed25519_private_key() {
    let keypair = forge.pki.ed25519.generateKeyPair()
    let session_secret = keypair.publicKey.toString("base64").replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/, '')
    let private_key = keypair.privateKey.toString("base64").replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/, '')
    return { session_secret, private_key }
  }

  function _get_private_key() {
    let keypair = forge.pki.rsa.generateKeyPair({ bits: 1024, e: 0x10001 })
    let body = forge.asn1.toDer(forge.pki.publicKeyToAsn1(keypair.publicKey)).getBytes()
    let session_secret = forge.util.encode64(body, 64)
    let private_key = forge.pki.privateKeyToPem(keypair.privateKey)
    return { session_secret, private_key }
  }

  function _get_pin() {
    let pin = ''
    for (let i = 0; i < 6; i++) {
      pin += i ? _get_pin_num(9) + 1 : _get_pin_num(10)
    }
    return pin
  }

  function _get_pin_num(max) {
    return max * Math.random() | 0
  }
}

function _download_app_json() {
  const dom = this.$refs.download_session_json
  const { app_number } = this.active_app
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(this.modal_content)
  dom.setAttribute("href", dataStr)
  dom.setAttribute("download", `keystore-${app_number}.json`)
  dom.click()
}

async function _request_qrcode(is_show, client_info) {
  if (once_submit) return this.$message.error({ message: this.$t('message.errors.reset'), showClose: true })
  client_info = client_info || this.$ls.get(this.active_app.app_id)
  this.show_loading()
  once_submit = true
  const uri = is_show ? '/me' : '/me/code'
  const api = `app_${is_show ? 'show' : 'rotate'}_qrcode`
  let { uid } = client_info
  let token = tools.getJwtToken(client_info, 'GET', uri, '')
  _vm._not_through_interceptor = true
  try {
    const res = await this.apis[api](token)
    if (!res) {
      this.$ls.rm(uid)
      this.open_edit_modal = true
    }
    if (!res.code_url) {
      once_submit = false
      return is_show && _request_qrcode.call(this, false, client_info)
    }
    this.modal_title = this.$t('secret.qrcode_title')
    this.modal_content = res.code_url
  } finally {
    once_submit = false
    this.hide_loading()
    _vm._not_through_interceptor = false
  }
}

let isStopCheck = true
async function request_transfer_app(step) {
  if (step === 1) {
    const { identity_number } = this.recipient_user || {}
    if (!identity_number || identity_number.length < 5)
      return this.$message.error({ message: this.$t('message.errors.mixin_id'), showClose: true })
    this.show_loading()
    const user = await this.apis.check_user(identity_number, this.$ls.get('token'))
    this.hide_loading()
    if (user && user.user_id) this.recipient_user = user
    else return
    this.transfer_step = step
  } else if (step === 2) {
    this.transfer_step = step
    const memo = Buffer.from(JSON.stringify({
      user_id: this.recipient_user.user_id,
      app_id: this.active_app.app_id,
    })).toString('base64')
    const trace = tools.getUUID()
    const user_id = 'fbd26bc6-3d04-4964-a7fe-a540432b16e2'
    const asset = 'c94ac88f-4671-3976-b60a-09064f1811e8'
    const pay_url = `https://mixin.one/pay?recipient=${user_id}&asset=${asset}&amount=0.01&trace=${trace}&memo=${memo}`
    this.$nextTick(() => new Qrious({
      element: this.$refs.qr,
      level: 'H',
      size: 500,
      value: pay_url
    }))
    isStopCheck = false
    if (tools.environment()) location.href = pay_url
    check_is_paid.call(this, trace, asset, user_id, '0.01')
  }
  if (!this.show_transfer_step) this.show_transfer_step = true
}


async function check_is_paid(trace_id, asset_id, counter_user_id, amount) {
  if (isStopCheck) return false
  const { status } = await this.apis.check_transfer({ trace_id, asset_id, counter_user_id, amount })
  if (status === 'paid') {
    this.$message.success({ message: this.$t('message.success.op'), showClose: true })
    setTimeout(() => {
      location.href = '/dashboard'
    }, 500)
    return
  }
  else {
    await new Promise(resolve => setTimeout(resolve, 100))
    return check_is_paid.call(this, trace_id, asset_id, counter_user_id, amount)
  }
}