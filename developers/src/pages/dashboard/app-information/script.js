import MInput from './input.vue'
import Croppie from './croppie.vue'
import CategorySelect from './select.vue'
import Confirm from '@/components/Confirm'

export default {
  name: 'app-information',
  components: {
    MInput, Croppie, CategorySelect, Confirm
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
      toggle_app: 0,
      submitting: false,
      showConfirmModal: false,

      name: '',
      icon_url: '',
      category: 'OTHER',
      home_uri: '',
      redirect_uri: '',
      description: '',
      resource_patterns: '',
      isImmersive: false,
      isEncrypted: false,
      hasEncrypted: false,
    }
  },
  computed: {
    isValidAppName() {
      return this.name && this.name.length >= 2 && this.name.length <= 64
    },
    isValidHomeUri() {
      return this.home_uri && this.isValidUrl(this.home_uri)
    },
    isValidRedirectUri() {
      return this.redirect_uri && this.isValidUrl(this.redirect_uri)
    },
    isValidDescription() {
      return this.description && this.description.length >= 16 && this.description.length <= 128
    },
    allowSubmit() {
      return this.isValidAppName && this.isValidHomeUri && this.isValidRedirectUri && this.isValidDescription
    }
  },
  mounted() {
    this.initApp(this.app)
  },
  watch: {
    app(val, old) {
      if (JSON.stringify(val) !== JSON.stringify(old)) this.initApp(val)
    }
  },
  methods: {
    initApp(app) {
      this.toggle_app++

      this.name = app.name
      this.icon_url = app.icon_url
      this.category = app.category || this.category
      this.home_uri = app.home_uri
      this.redirect_uri = app.redirect_uri
      this.description = app.description
      this.resource_patterns = app.resource_patterns ? app.resource_patterns.join('\n') : ''
      this.isImmersive = app.capabilities ? app.capabilities.includes('IMMERSIVE') : false
      this.isEncrypted = app.capabilities ? app.capabilities.includes('ENCRYPTED') : false
      this.hasEncrypted = app.session_secret ? Buffer.from(app.session_secret, 'base64').length === 32 : false
    },
    encryptClickHandler() {
      if (this.app.capabilities.includes('ENCRYPTED')) return
      if (this.isEncrypted) return this.isEncrypted = false
      this.showConfirmModal = true
    },
    confirmEncryption() {
      this.isEncrypted = true
      this.closeModal()
    },
    closeModal() {
      this.showConfirmModal = false
    },
    isValidUrl(url) {
      return /^http(s)?\:\/\//.test(url)
    },
    notice() {
      if (!this.name) return this.notice_message('no_app_name')
      if (this.name.length < 2 || this.name.length > 64) return this.notice_message('app_name_length')
      if (!this.home_uri) return this.notice_message('no_home_uri')
      if (!this.isValidUrl(this.home_uri)) return this.notice_message('home_uri_illegal')
      if (!this.redirect_uri) return this.notice_message('no_redirect_uri')
      if (!this.isValidUrl(this.redirect_uri)) return this.notice_message('redirect_uri_illegal')
      if (!this.description) return this.notice_message('no_description')
      if (this.description.length < 16 || this.description.length > 128) return this.notice_message('description_length')
    },
    async submitClickHandler() {
      if (!this.allowSubmit) return this.notice()
      if (this.submitting) return this.$message.error({ message: 'message.errors.saving' })

      await this.submit()
    },
    async submit() {
      const capabilities = ['CONTACT', 'GROUP']
      this.isImmersive && capabilities.push('IMMERSIVE')
      this.isEncrypted && capabilities.push('ENCRYPTED')

      let icon_base64 = await this.$refs.croppie.crop()
      icon_base64 = icon_base64 ? icon_base64.substring(icon_base64.indexOf(',') + 1) : ''

      let resource_patterns = this.resource_patterns
      resource_patterns = resource_patterns || '';
      resource_patterns = resource_patterns.replace(/\r\n/g, '\n');
      resource_patterns = resource_patterns.split('\n').map((r) => {
        return r.trim();
      }).filter((r) => {
        return !!r;
      });

      const params = {
        icon_base64,
        name: this.name,
        category: this.category,
        home_uri: this.home_uri,
        redirect_uri: this.redirect_uri,
        description: this.description,
        resource_patterns,
        capabilities
      }

      this.submitting = true
      this.$emit('loading', true)
      try {
        const res = this.app.app_id
          ? await this.client.app.update(this.app.app_id, params)
          : await this.client.app.create(params)
        if (res && res.type === 'app') {
          this.$message.success({ message: this.$t('message.success.save'), showClose: true })
          this.$emit('add-new-app', res.app_number)
        }
      } finally {
        this.submitting = false
        this.$emit('loading', false)
      }
    },
  },
  notice_message(message) {
    return this.$message.error({ message: this.$t('information.errors.' + message), showClose: true })
  },
}