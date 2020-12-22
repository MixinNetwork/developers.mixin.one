import DModal from '@/components/DModal'
import UpdateToken from '@/components/UpdateToken'
import Confirm from '@/components/Confirm'
import forge from 'node-forge'
import tools from '@/assets/js/tools'

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
    }
  },
  data() {
    return {
      modal_title: '',
      modal_content: '',
      loading: false,
      open_edit_modal: false,
      confirm_modal: false,
      confirm_content: '',
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
    click_download_session() {
      _download_app_json.call(this)
    },
    request_rotate_qrcode() {
      this.tmp_action = 'rotate'
      let client_info = this.$ls.get(this.active_app.app_id)
      if (!client_info) return this.open_edit_modal = true
      this.confirm_content = this.$t('secret.rotate_qrcode_question')
      this.confirm_modal = true
    },
    click_copy_success() {
      this.$message.success({ message: this.$t('message.success.copy'), showClose: true })
    },
    click_copy_error() {
      this.$message.error({ message: this.$t('message.errors.copy'), showClose: true })
    },
    click_close_new_secret() {
      this.modal_content = ''
    }
  },
  mounted() {
    !(this.active_app.app_id || this.$route.params.app_number) && this.$router.push('/dashboard')
  },
}
let once_submit = false

async function _request_new_secret() {
  if (once_submit) return this.$message.error({ message: this.$t('message.errors.reset'), showClose: true })
  this.loading = true
  once_submit = true
  try {
    const res = await this.apis.app_new_secret(this.active_app.app_id)
    this.$message.success({ message: this.$t('message.success.reset'), showClose: true })
    this.modal_title = this.$t('secret.secret_title')
    this.modal_content = res.app_secret
  } finally {
    once_submit = false
    this.loading = false
  }
}

async function _request_new_session(algo = 'rsa') {
  if (once_submit) return this.$message.error({ message: this.$t('message.errors.reset'), showClose: true })
  let pin = _get_pin()
  let key = algo === 'ed25519' ? _get_ed25519_private_key() : _get_private_key()
  let { session_secret, private_key } = key
  once_submit = true
  this.loading = true
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
    this.loading = false
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
  this.loading = true
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
    this.loading = false
    _vm._not_through_interceptor = false
  }
}
