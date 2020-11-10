import MInput from './input.vue'
import Croppie from './croppie.vue'
import CategorySelect from './select.vue'

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
      if (!this.can_save) return notice.call(this)
      _submit_to_database.call(this)
    },
    check_is_finished() {
      _check_is_finished.call(this)
    },
    init_app(app) {
      this.resource_patterns = ''
      this.immersive_status = false
      this.toggle_app++
      let { name, resource_patterns, capabilities } = app
      this.app_name = name || ''
      if (resource_patterns) this.resource_patterns = resource_patterns && resource_patterns.join('\n')
      if (capabilities) this.immersive_status = capabilities && capabilities.includes('IMMERSIVE')
      _check_is_finished.call(this)
    }
  },
  mounted() {
    this.init_app(this.active_app)
  }
}

let once_submit = false

async function _submit_to_database() {
  if (once_submit) return notice.call(this, 'saving')
  let { app_id, description, home_uri, redirect_uri, category = 'OTHER' } = this.active_app
  let name = this.app_name
  let capabilities = this.immersive_status ? ['CONTACT', 'GROUP', 'IMMERSIVE'] : ['CONTACT', 'GROUP']
  let parmas = { capabilities, description, home_uri, name, redirect_uri, category }
  let { resource_patterns } = this
  let icon_base64 = await this.$refs.croppie.crop()
  if (icon_base64) {
    parmas.icon_base64 = icon_base64.substring(icon_base64.indexOf(',') + 1)
  }
  if (!resource_patterns) {
    parmas.resource_patterns = []
  } else {
    if (resource_patterns.includes('\r\n')) 
      resource_patterns = resource_patterns.replace(/\r\n/g, '\n')
    parmas.resource_patterns = resource_patterns.split('\n')
  }
  once_submit = true
  this.$emit('loading', true)
  try {
    let res = await this.apis.set_app(app_id, parmas)
    if (res && res.type === 'app') {
      this.$message.success({ message: this.$t('message.success.save'), showClose: true })
      this.$emit('add_new_app', res.app_number)
    }
  } finally {
    once_submit = false
    this.$emit('loading', false)
  }
}


function _check_is_finished() {
  let { app_name, active_app } = this
  let { home_uri, redirect_uri, description } = active_app
  if (app_name && home_uri && redirect_uri && description && app_name.length >= 2 && app_name.length <= 64 && description.length >= 16 && description.length <= 128) {
    this.can_save = true
  } else {
    this.can_save = false
  }
}

function notice() {
  let { app_name, active_app } = this
  let { home_uri, redirect_uri, description } = active_app
  if (!app_name) return notice_message.call(this, 'no_app_name')
  if (!home_uri) return notice_message.call(this, 'no_home_uri')
  if (!redirect_uri) return notice_message.call(this, 'no_redirect_uri')
  if (!description) return notice_message.call(this, 'no_description')
  if (app_name.length < 2 || app_name.length > 64) return notice_message.call(this, 'app_name_length')
  if (description.length < 16 || description.length > 128) return notice_message.call(this, 'description_length')
}

function notice_message(message) {
  return this.$message.error({ message: this.$t('information.errors.' + message), showClose: true })
}
