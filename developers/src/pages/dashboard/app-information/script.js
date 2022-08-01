import {computed, ref, reactive, toRefs, onMounted, watch, inject, onActivated} from "vue";
import { useI18n } from "vue-i18n";
import MInput from './input.vue'
import Croppie from './croppie.vue'
import CategorySelect from './select.vue'
import Confirm from '@/components/Confirm'
import { useClient, useCreateApp, useUpdateApp } from "@/api";

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
    }
  },
  emits: ['loading', 'add-new-app', 'update-app'],
  setup(props, ctx) {
    const { t } = useI18n()
    const $message = inject('$message')
    const croppie = ref(null)

    const state = reactive({
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
    })

    const isValidUrl = (url) => {
      return /^http(s)?\:\/\//.test(url)
    }
    const isValidAppName = computed(() => state.name && state.name.length >= 2 && state.name.length <= 64)
    const isValidHomeUri = computed(() => state.home_uri && isValidUrl(state.home_uri))
    const isValidRedirectUri = computed(() => state.redirect_uri && isValidUrl(state.redirect_uri))
    const isValidDescription = computed(() => state.description && state.description.length >= 16 && state.description.length <= 128)
    const allowSubmit = computed(() => isValidAppName && isValidHomeUri && isValidRedirectUri && isValidDescription)

    const notice = () => {
      if (!state.name) return noticeMessage('no_app_name')
      if (state.name.length < 2 || state.name.length > 64) return noticeMessage('app_name_length')
      if (!state.home_uri) return noticeMessage('no_home_uri')
      if (!isValidUrl(state.home_uri)) return noticeMessage('home_uri_illegal')
      if (!state.redirect_uri) return noticeMessage('no_redirect_uri')
      if (!isValidUrl(state.redirect_uri)) return noticeMessage('redirect_uri_illegal')
      if (!state.description) return noticeMessage('no_description')
      if (state.description.length < 16 || state.description.length > 128) return noticeMessage('description_length')
    }
    const noticeMessage = (message) => {
      return $message.error({ message: t('information.errors.' + message), showClose: true })
    }

    const useClickEncryption = () => {
      if (props.app.capabilities.includes('ENCRYPTED')) return
      if (state.isEncrypted) return state.isEncrypted = false
      state.showConfirmModal = true
    }
    const useConfirmEncryption = () => {
      state.isEncrypted = true
      closeModal()
    }
    const useClickSubmit = async () => {
      if (!allowSubmit) return notice()
      if (state.submitting) return $message.error({ message: 'message.errors.saving' })

      await submit()
    }
    const submit = async () => {
      const capabilities = ['CONTACT', 'GROUP']
      state.isImmersive && capabilities.push('IMMERSIVE')
      state.isEncrypted && capabilities.push('ENCRYPTED')

      let icon_base64 = await croppie.value.crop()
      icon_base64 = icon_base64 ? icon_base64.substring(icon_base64.indexOf(',') + 1) : ''

      let resource_patterns = state.resource_patterns
      resource_patterns = resource_patterns || '';
      resource_patterns = resource_patterns.replace(/\r\n/g, '\n');
      resource_patterns = resource_patterns.split('\n').map((r) => {
        return r.trim();
      }).filter((r) => {
        return !!r;
      });

      const params = {
        icon_base64,
        name: state.name,
        category: state.category,
        home_uri: state.home_uri,
        redirect_uri: state.redirect_uri,
        description: state.description,
        resource_patterns,
        capabilities
      }

      state.submitting = true
      ctx.emit('loading', true)
      try {
        const client = useClient()
        const res = props.app.app_id
          ? await useUpdateApp(client, props.app.app_id, params)
          : await useCreateApp(client, params)
        if (res && res.type === 'app') {
          $message.success({ message: t('message.success.save'), showClose: true })
          ctx.emit('add-new-app', res.app_number)
        }
      } finally {
        state.submitting = false
        ctx.emit('loading', false)
      }
    }
    const closeModal = () => {
      state.showConfirmModal = false
    }

    const initApp = (app) => {
      state.toggle_app++

      state.name = app.name
      state.icon_url = app.icon_url
      state.category = app.category || state.category
      state.home_uri = app.home_uri
      state.redirect_uri = app.redirect_uri
      state.description = app.description
      state.resource_patterns = app.resource_patterns ? app.resource_patterns.join('\n') : ''
      state.isImmersive = app.capabilities ? app.capabilities.includes('IMMERSIVE') : false
      state.isEncrypted = app.capabilities ? app.capabilities.includes('ENCRYPTED') : false
      state.hasEncrypted = app.session_secret ? Buffer.from(app.session_secret, 'base64').length === 32 : false
    }

    onMounted(() => {
      initApp(props.app)
    })
    onActivated(() => {
      ctx.emit('update-app')
    })
    watch(() => props.app, (app) => {
      initApp(app)
    })

    return {
      t,
      croppie,
      ...toRefs(state),
      allowSubmit,
      useClickEncryption,
      useConfirmEncryption,
      useClickSubmit,
      closeModal
    }
  },

}