import { MixinApi, getED25519KeyPair } from "@mixin.dev/mixin-node-sdk";
import FileSaver from 'file-saver'
import tools from '@/assets/js/tools'
import DModal from '@/components/DModal'
import UpdateToken from '@/components/UpdateToken'
import Confirm from '@/components/Confirm'
import defaultApiConfig from "@/api";

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
    client: {
      type: Object
    }
  },
  data() {
    return {
      modal_title: '',
      modal_content: '',
      loading: false,
      submitting: false,
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
          this._request_qrcode(true)
          break
        case 'rotate':
          this._request_qrcode(false)
          break
        case 'secret':
          this._request_new_secret()
          break
        case 'session':
          this._request_new_session()
          break
        default:
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
    request_ed25519_session() {
      this.tmp_action = 'session'
      this.confirm_content = this.$t('secret.session_question')
      this.confirm_modal = true
    },
    request_show_qrcode() {
      this.tmp_action = 'show'
      let client_info = this.$ls.get(this.active_app.app_id)
      if (!client_info) return this.open_edit_modal = true
      this._request_qrcode(true, client_info)
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
    },
    async _request_new_secret() {
      if (this.submitting) return this.$message.error({ message: this.$t('message.errors.reset'), showClose: true })
      this.loading = true
      this.submitting = true
      try {
        const res = await this.client.app.updateSecret(this.active_app.app_id)
        this.$message.success({ message: this.$t('message.success.reset'), showClose: true })
        this.modal_title = this.$t('secret.secret_title')
        this.modal_content = res.app_secret
      } finally {
        this.submitting = false
        this.loading = false
      }
    },
    async _request_new_session() {
      if (this.submitting) return this.$message.error({ message: this.$t('message.errors.reset'), showClose: true })
      let pin = tools.randomPin()
      let { publicKey: session_secret, privateKey } = getED25519KeyPair()

      this.submitting = true
      this.loading = true
      try {
        const res = await this.client.app.updateSession(this.active_app.app_id, pin, session_secret)
        this.$message.success({ message: this.$t('message.success.reset'), showClose: true })
        const keystore = {
          pin,
          client_id: this.active_app.app_id,
          session_id: res.session_id,
          pin_token: res.pin_token_base64,
          private_key: privateKey
        }

        this.modal_title = this.$t('secret.session_title')
        this.modal_content = JSON.stringify(keystore, null, ' ')
        this.$ls.rm(this.active_app.app_id)
      } finally {
        this.submitting = false
        this.loading = false
      }
    },
    _download_app_json() {
      const { app_number } = this.active_app

      const blob = new Blob(
        [this.modal_content],
        { type: 'text/plain;charset=utf-8' }
      )
      FileSaver.saveAs(blob, `keystore-${app_number}.json`)
    },
    async _request_qrcode(is_show, client_info) {
      if (this.submitting) return this.$message.error({ message: this.$t('message.errors.reset'), showClose: true })
      client_info = client_info || this.$ls.get(this.active_app.app_id)
      this.loading = true
      this.submitting = true

      let { uid, sid, pinToken, privateKey } = client_info
      const keystore = {
        user_id: uid,
        session_id: sid,
        pin_token: pinToken,
        private_key: privateKey
      }
      const config = {
        ...defaultApiConfig,
        keystore
      }
      const client = MixinApi(config)

      _vm._not_through_interceptor = true
      try {
        const res = is_show ? await this.client.user.profile() : await client.user.rotateCode()
        if (!res) {
          this.$ls.rm(uid)
          this.open_edit_modal = true
        }
        if (!res.code_url) {
          this.submitting = false
          return is_show && this._request_qrcode(false, client_info)
        }
        this.modal_title = this.$t('secret.qrcode_title')
        this.modal_content = res.code_url
      } finally {
        this.submitting = false
        this.loading = false
        _vm._not_through_interceptor = false
      }
    }
  },
  mounted() {
    !(this.active_app.app_id || this.$route.params.app_number) && this.$router.push('/dashboard')
  },
}