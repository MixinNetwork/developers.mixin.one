import MInput from './input.vue'
import Croppie from './croppie.vue'
import CategorySelect from './select.vue'

let once_submit = false

export default {
  name: 'app-information',
  components: {
    MInput, Croppie, CategorySelect
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
      can_save: false,
      app_name: '',
      resource_patterns: '',
      immersive_status: false,
      toggle_app: 0
    }
  },
  watch: {
    active_app(val, old) {
      if (JSON.stringify(val) !== JSON.stringify(old)) this.init_app(val)
    }
  },
  methods: {
    submit_to_database() {
      if (!this.can_save) return this.notice.call(this)
      this._submit_to_database()
    },
    check_is_finished() {
      let { app_name, active_app } = this
      let { home_uri, redirect_uri, description } = active_app
      this.can_save =
        app_name && app_name.length >= 2 && app_name.length <= 64
        && home_uri && redirect_uri
        && description && description.length >= 16 && description.length <= 128;
    },
    init_app(app) {
      this.resource_patterns = ''
      this.immersive_status = false
      this.toggle_app++
      let { name, resource_patterns, capabilities } = app
      this.app_name = name || ''
      if (resource_patterns) this.resource_patterns = resource_patterns && resource_patterns.join('\n')
      if (capabilities) this.immersive_status = capabilities && capabilities.includes('IMMERSIVE')
      this.check_is_finished()
    },
    async _submit_to_database() {
      if (once_submit) return this.notice.call(this, 'saving')
      let { app_id, description, home_uri, redirect_uri, category = 'OTHER' } = this.active_app
      let name = this.app_name
      let capabilities = this.immersive_status ? ['CONTACT', 'GROUP', 'IMMERSIVE'] : ['CONTACT', 'GROUP']
      let params = { capabilities, description, home_uri, name, redirect_uri, category }
      let { resource_patterns } = this
      let icon_base64 = await this.$refs.croppie.crop()
      params.icon_base64 = icon_base64 ? icon_base64.substring(icon_base64.indexOf(',') + 1) : ''
      if (!resource_patterns) {
        params.resource_patterns = []
      } else {
        if (resource_patterns.includes('\r\n'))
          resource_patterns = resource_patterns.replace(/\r\n/g, '\n')
        params.resource_patterns = resource_patterns.split('\n')
      }
      once_submit = true
      this.$emit('loading', true)
      try {
        let res = app_id ? await this.client.app.update(app_id, params) : await this.client.app.create(params)
        if (res && res.type === 'app') {
          this.$message.success({ message: this.$t('message.success.save'), showClose: true })
          this.$emit('add_new_app', res.app_number)
        }
      } finally {
        once_submit = false
        this.$emit('loading', false)
      }
    },
    check_url_is_legal(url) {
      return /^http(s)?\:\/\//.test(url)
    },
    notice_message(message) {
      return this.$message.error({ message: this.$t('information.errors.' + message), showClose: true })
    },
    notice() {
      let { app_name, active_app } = this
      let { home_uri, redirect_uri, description } = active_app
      if (!app_name) return this.notice_message('no_app_name')
      if (!home_uri) return this.notice_message('no_home_uri')
      if (!redirect_uri) return this.notice_message('no_redirect_uri')
      if (!this.check_url_is_legal(home_uri)) return this.notice_message('home_uri_illegal')
      if (!this.check_url_is_legal(redirect_uri)) return this.notice_message('redirect_uri_illegal')
      if (!description) return this.notice_message('no_description')
      if (app_name.length < 2 || app_name.length > 64) return this.notice_message('app_name_length')
      if (description.length < 16 || description.length > 128) return this.notice_message('description_length')
    }
  },
  mounted() {
    this.init_app(this.active_app)
  }
}



