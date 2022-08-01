import { getED25519KeyPair } from "@mixin.dev/mixin-node-sdk";
import {toRefs, reactive, inject, watch, onActivated} from "vue";
import {useStorage, useClipboard} from "@vueuse/core";
import {useI18n} from "vue-i18n";
import FileSaver from 'file-saver'
import DModal from '@/components/DModal'
import UpdateToken from '@/components/UpdateToken'
import Confirm from '@/components/Confirm'
import { randomPin } from '@/utils'
import { useClient } from "@/api";

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
    }
  },
  setup(props) {
    const $message = inject('$message')
    const { t } = useI18n()

    const state = reactive({
      loading: false,
      submitting: false,
      confirmContent: '',
      modalTitle: '',
      modalContent: '',
      showUpdateToken: false,
      action: '',
    })

    const tokenInfo = useStorage('token', {})
    const userClient = useClient(tokenInfo.value)
    const checkKeystore = (keystore) => {
      return keystore && keystore.user_id && keystore.pin_token && keystore.private_key && keystore.session_id
    }

    const useReducer = async (type) => {
      const clientInfo = useStorage(props.app.app_id, {}).value
      if (!type) type = state.action

      switch (type) {
        case 'showQRCode':
          if (!checkKeystore(clientInfo)) return state.showUpdateToken = true
          await useRequestQRCode(true, clientInfo)
          break
        case 'openQRCodeRotateConfirm':
          state.confirmContent = t('secret.rotate_qrcode_question')
          state.action = 'rotateQRCode'
          break
        case 'openNewSecretConfirm':
          state.confirmContent = t('secret.secret_question')
          state.action = 'updateSecret'
          break
        case 'openNewSessionConfirm':
          state.confirmContent = t('secret.session_question')
          state.action = 'updateSession'
          break
        case 'rotateQRCode':
          if (!checkKeystore(clientInfo)) return state.showUpdateToken = true
          await useRequestQRCode(false, clientInfo)
          break
        case 'updateSecret':
          await useUpdateSecret()
          break
        case 'updateSession':
          await useUpdateSession()
          break
        default:
          break
      }
    }

    const dispatch = async (type) => {
      await useReducer(type)
    }
    const useUpdateSecret = async () => {
      if (state.submitting) return $message.error({ message: t('message.errors.reset'), showClose: true })
      state.loading = true
      state.submitting = true

      try {
        const res = await userClient.app.updateSecret(props.app.app_id)
        $message.success({ message: t('message.success.reset'), showClose: true })
        state.modalTitle = t('secret.secret_title')
        state.modalContent = res.app_secret
      } finally {
        state.submitting = false
        state.loading = false
      }
    }
    const useUpdateSession = async () => {
      if (state.submitting) return $message.error({ message: t('message.errors.reset'), showClose: true })
      state.submitting = true
      state.loading = true

      try {
        const pin = randomPin()
        const { publicKey: session_secret, privateKey } = getED25519KeyPair()
        const res = await userClient.app.updateSession(props.app.app_id, pin, session_secret)
        $message.success({ message: t('message.success.reset'), showClose: true })

        state.modalTitle = t('secret.session_title')
        state.modalContent = JSON.stringify({
          pin,
          client_id: props.app.app_id,
          session_id: res.session_id,
          pin_token: res.pin_token_base64,
          private_key: privateKey
        }, null, ' ')
        const clientInfo = useStorage(props.app.app_id, {})
        clientInfo.value = null

      } finally {
        state.submitting = false
        state.loading = false
      }
    }
    const useRequestQRCode = async (is_show, clientInfo) => {
      if (state.submitting) return $message.error({ message: t('message.errors.reset'), showClose: true })

      const appClient = useClient(clientInfo)

      state.loading = true
      state.submitting = true
      _vm.skipInterceptor = true
      try {
        const res = is_show ? await appClient.user.profile() : await appClient.user.rotateCode()

        if (!res) {
          clientInfo.value = null
          state.showUpdateToken = true
          return
        }
        if (!res.code_url) {
          return is_show && useRequestQRCode(false, clientInfo)
        }

        state.modalTitle = t('secret.qrcode_title')
        state.modalContent = res.code_url
      } finally {
        state.submitting = false
        state.loading = false
        _vm.skipInterceptor = false
      }
    }
    const useDownloadKeystore = ()  =>{
      const { app_number } = props.app

      const blob = new Blob(
        [state.modalContent],
        { type: 'text/plain;charset=utf-8' }
      )
      FileSaver.saveAs(blob, `keystore-${app_number}.json`)
    }

    const useInitStatus = () => {
      state.modalTitle = ''
      state.modalContent = ''
      state.confirmContent = ''
      state.action = ''
    }
    const useCloseModal = () => {
      useInitStatus()
    }
    const useCloseConfirmModal = () => {
      state.modalTitle = ''
      state.modalContent = ''
      state.confirmContent = ''
    }

    const { copy, copied, isSupported } = useClipboard()
    const useClickCopy = async () => {
      if (!isSupported) return $message.error({ message: t("message.errors.copy"), showClose: true })
      await copy(state.modalContent)
    }
    watch(copied, () => {
      if (copied.value) $message.success({ message: t("message.success.copy"), showClose: true})
    })

    onActivated(() => {
      useInitStatus()
    })

    return {
      t,
      ...toRefs(state),
      dispatch,
      useDownloadKeystore,
      useCloseModal,
      useCloseConfirmModal,
      useClickCopy
    }
  },
}