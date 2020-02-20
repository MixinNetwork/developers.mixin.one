import TModal from '@/components/t-modal'
import UpdateToken from '@/components/update-token'
import Confirm from '@/components/confirm'
import forge from 'node-forge'
import tools from '@/assets/js/tools'
export default {
  name: 'app-information',
  components: {
    TModal, UpdateToken, Confirm
  },
  props: ['active_app'],
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
      app_str: ''
    }
  },
  methods: {
    confirm_action() {
      switch (this.tmp_action) {
        case 'show':
          this.request_show_qrcode()
          break
        case 'rotate':
          _request_rotate_qrcode.call(this)
          break
        case 'secret':
          _request_new_secret.call(this)
          break
        case 'sesson':
          _request_new_sseion.call(this)
          break
      }
    },
    close_modal() {
      this.confirm_modal = false
      this.open_edit_modal = false
    },
    request_new_secret() {
      this.confirm_content = this.$t('secret.secret_question')
      this.tmp_action = 'secret'
      this.confirm_modal = true
    },
    request_new_session() {
      if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
        return this.$message.info(this.$t('message.app.secret_tips'))
      }
      this.confirm_content = this.$t('secret.session_question')
      this.tmp_action = 'sesson'
      this.confirm_modal = true
    },
    request_show_qrcode() {
      let { app_id } = this.active_app
      let app_str = window.localStorage.getItem(app_id)
      this.tmp_action = 'show'
      if (!app_str) return this.open_edit_modal = true
      this.app_str = app_str
      _request_show_qrcode.call(this)
    },
    request_rotate_qrcode() {
      let { app_id } = this.active_app
      let app_str = window.localStorage.getItem(app_id)
      this.tmp_action = 'rotate'
      if (!app_str) return this.open_edit_modal = true
      this.app_str = app_str
      this.confirm_content = this.$t('secret.rotate_qrcode_question')
      this.confirm_modal = true
    },
    click_copy_succuess() {
      this.$message.success({ message: this.$t('message.success.copy'), showClose: true });
    },
    click_copy_error() {
      this.$message.error({ message: this.$t('message.errors.copy'), showClose: true });
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

function _request_new_sseion() {
  if (once_submit) {
    this.$message.error({ message: this.$t('message.errors.reset'), showClose: true });
    return
  }
  let pin = _get_pin()
  let { session_secret, private_key } = _get_private_key()
  once_submit = true;
  this.loading = true;
  this.apis.app_new_session(this.active_app.app_id, pin, session_secret).then(res => {
    this.$message.success({ message: this.$t('message.success.reset'), showClose: true });
    let { session_id, pin_token } = res;
    _download_app_json(this.$refs.download_ssesion_json, pin, this.active_app.app_id, session_id, pin_token, private_key, this.active_app.app_number)
    window.localStorage.removeItem(this.active_app.app_id)
  }).finally(_ => {
    once_submit = false;
    this.loading = false
  })
}

function _download_app_json(dom, pin, client_id, session_id, pin_token, private_key, app_number) {
  let data = { pin, client_id, session_id, pin_token, private_key };
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, ' '));
  dom.setAttribute("href", dataStr)
  dom.setAttribute("download", `keystore-${app_number}.json`);
  dom.click();
}

function _get_private_key() {
  let keypair = forge.pki.rsa.generateKeyPair({ bits: 1024, e: 0x10001 });
  let body = forge.asn1.toDer(forge.pki.publicKeyToAsn1(keypair.publicKey)).getBytes();
  let session_secret = forge.util.encode64(body, 64);
  let private_key = forge.pki.privateKeyToPem(keypair.privateKey);
  return { session_secret, private_key }
}

function _get_pin() {
  let pin = ''
  for (let i = 0; i < 6; i++) {
    if (i) {
      _get_pin_num(9) + 1
    }
    pin += i ? _get_pin_num(9) + 1 : _get_pin_num(10)
  }
  return pin
}

function _get_pin_num(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function _request_show_qrcode() {
  if (once_submit) {
    this.$message.error({ message: this.$t('message.errors.reset'), showClose: true });
    return
  }
  this.loading = true
  once_submit = true;
  let uid = this.active_app.app_id
  let { sid, privateKey } = JSON.parse(this.app_str)
  let token = _get_token({ sid, uid, privateKey }, 'GET', '/me', '')
  _vm._not_through_interceptor = true
  this.apis.app_show_qrcode(token).then(res => {
    if (!res) {
      window.localStorage.removeItem(uid)
      this.open_edit_modal = true
    }
    this.modal_title = 'QR Code'
    this.modal_content = res.code_url;
  }).finally(_ => {
    once_submit = false;
    this.loading = false
    _vm._not_through_interceptor = false
  })
}

function _request_rotate_qrcode() {
  if (once_submit) {
    this.$message.error({ message: this.$t('message.errors.reset'), showClose: true });
    return
  }
  this.loading = true
  once_submit = true;
  let uid = this.active_app.app_id
  let { sid, privateKey } = JSON.parse(this.app_str)
  let token = _get_token({ sid, uid, privateKey }, 'GET', '/me/code', '')
  _vm._not_through_interceptor = true
  this.apis.app_rotate_qrcode(token).then(res => {
    if (!res) {
      window.localStorage.removeItem(uid)
      this.open_edit_modal = true
    }
    this.$message.success({ message: this.$t('message.success.reset'), showClose: true });
    this.modal_title = 'QR Code'
    this.modal_content = res.code_url;
  }).finally(_ => {
    once_submit = false;
    this.loading = false
    _vm._not_through_interceptor = false
  })
}


function _request_new_secret() {
  if (once_submit) {
    this.$message.error({ message: this.$t('message.errors.reset'), showClose: true });
    return
  }
  this.loading = true
  once_submit = true;
  this.apis.app_new_secret(this.active_app.app_id).then(res => {
    this.$message.success({ message: this.$t('message.success.reset'), showClose: true });
    this.modal_title = 'App Secret'
    this.modal_content = res.app_secret;
  }).finally(_ => {
    once_submit = false;
    this.loading = false
  })
}

function _get_token({ sid, uid, privateKey }, method, url, body) {
  return tools.getJwtToken({ sid, uid, privateKey }, method, url, body)
}
