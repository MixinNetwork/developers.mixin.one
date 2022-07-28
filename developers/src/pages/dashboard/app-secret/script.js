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
    app: {
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
      loading: false,
      submitting: false,
      confirmContent: '',
      modalTitle: '',
      modalContent: '',
      showUpdateToken: false,
      action: '',
    }
  },
  methods: {
    async dispatch(type) {
      await this.reducer(type)
    },
    async reducer(type) {
      const client_info = this.$ls.get(this.app.app_id)
      if (!type) type = this.action

      switch (type) {
        case 'showQRCode':
          if (!client_info) return this.showUpdateToken = true
          await this.requestQRCode(true, client_info)
          break
        case 'openQRCodeRotateConfirm':
          this.confirmContent = this.$t('secret.rotate_qrcode_question')
          this.action = 'rotateQRCode'
          break
        case 'openNewSecretConfirm':
          this.confirmContent = this.$t('secret.secret_question')
          this.action = 'updateSecret'
          break
        case 'openNewSessionConfirm':
          this.confirmContent = this.$t('secret.session_question')
          this.action = 'updateSession'
          break
        case 'rotateQRCode':
          if (!client_info) return this.showUpdateToken = true
          await this.requestQRCode(false, client_info)
          break
        case 'updateSecret':
          await this.updateSecret()
          break
        case 'updateSession':
          await this.updateSession()
          break
        default:
          break
      }
    },
    async updateSecret() {
      if (this.submitting) return this.$message.error({ message: this.$t('message.errors.reset'), showClose: true })
      this.loading = true
      this.submitting = true

      try {
        const res = await this.client.app.updateSecret(this.app.app_id)
        this.$message.success({ message: this.$t('message.success.reset'), showClose: true })
        this.modalTitle = this.$t('secret.secret_title')
        this.modalContent = res.app_secret
      } finally {
        this.submitting = false
        this.loading = false
      }
    },
    async updateSession() {
      if (this.submitting) return this.$message.error({ message: this.$t('message.errors.reset'), showClose: true })
      this.submitting = true
      this.loading = true

      try {
        const pin = tools.randomPin()
        const { publicKey: session_secret, privateKey } = getED25519KeyPair()
        const res = await this.client.app.updateSession(this.app.app_id, pin, session_secret)
        this.$message.success({ message: this.$t('message.success.reset'), showClose: true })

        this.modalTitle = this.$t('secret.session_title')
        this.modalContent = JSON.stringify({
          pin,
          client_id: this.app.app_id,
          session_id: res.session_id,
          pin_token: res.pin_token_base64,
          private_key: privateKey
        }, null, ' ')
        this.$ls.rm(this.app.app_id)

      } finally {
        this.submitting = false
        this.loading = false
      }
    },
    async requestQRCode(is_show, client_info) {
      if (this.submitting) return this.$message.error({ message: this.$t('message.errors.reset'), showClose: true })

      const appClient = MixinApi({
        ...defaultApiConfig,
        keystore: {
          user_id: this.app.app_id,
          ...client_info
        }
      })

      this.loading = true
      this.submitting = true
      _vm.skipInterceptor = true
      try {
        let res = is_show ? await this.client.user.profile() : await appClient.user.rotateCode()

        if (!res) {
          this.$ls.rm(this.app.app_id)
          this.showUpdateToken = true
          return
        }
        if (!res.code_url) {
          return is_show && this.requestQRCode(false, client_info)
        }

        this.modalTitle = this.$t('secret.qrcode_title')
        this.modalContent = res.code_url
      } finally {
        this.submitting = false
        this.loading = false
        _vm.skipInterceptor = false
      }
    },
    downloadKeystoreJson() {
      const { app_number } = this.app

      const blob = new Blob(
        [this.modalContent],
        { type: 'text/plain;charset=utf-8' }
      )
      FileSaver.saveAs(blob, `keystore-${app_number}.json`)
    },
    onCopySuccess() {
      this.$message.success({ message: this.$t('message.success.copy'), showClose: true })
    },
    onCopyError() {
      this.$message.error({ message: this.$t('message.errors.copy'), showClose: true })
    },
    closeModal() {
      this.modalContent = ''
    },
    closeConfirmModal() {
      this.confirmContent = ''
    }
  },
  mounted() {
    !(this.app.app_id || this.$route.params.app_number) && this.$router.push('/dashboard')
  },
}