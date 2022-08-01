import {onMounted, reactive, toRefs, inject, onActivated} from "vue";
import { useStorage } from "@vueuse/core";
import { useI18n } from "vue-i18n";
import UpdateToken from '@/components/UpdateToken'
import WithdrawalModal from './withdrawal'
import { assetSortCompare } from '@/utils'
import { useAssetList, useClient } from "@/api";

export default {
  components: {
    WithdrawalModal, UpdateToken
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
    const { t } = useI18n()

    const state = reactive({
      loadingAll: false,
      showWithdrawalModal: false,
      showSessionUpdateModal: false,
      needUpdate: true,
      assetList: [],
      withdrawalAsset: {}
    })

    const useHasAppToken = (tokenInfo) => {
      return tokenInfo.user_id
        && tokenInfo.pin_token
        && tokenInfo.session_id
        && tokenInfo.private_key
    }

    const fetchAssetList = async () => {
      const tokenInfo = useStorage(props.app.app_id, {})
      if (!useHasAppToken(tokenInfo.value)) return false

      state.loadingAll = true
      _vm.skipInterceptor = true
      try {
        const client = useClient(tokenInfo.value)
        let res = await useAssetList(client)
        if (res) {
          state.assetList = res.sort(assetSortCompare)
          state.needUpdate = false
          state.showSessionUpdateModal = false
        } else {
          state.needUpdate = true
          state.showSessionUpdateModal = true
          tokenInfo.value = null
        }
      } catch (e) {
        state.needUpdate = true
        state.showSessionUpdateModal = true
        tokenInfo.value = null
      } finally {
        state.loadingAll = false
        _vm.skipInterceptor = false
      }
      return true
    }

    const useClickWithdrawal = (item) => {
      state.withdrawalAsset = item
      setTimeout(() => {
        state.showWithdrawalModal = true
      }, 200)
    }
    const closeModal = () => {
      state.showSessionUpdateModal = false
    }

    onMounted(async () => {
      await fetchAssetList()
    })
    onActivated(async () => {
      const flag = await fetchAssetList()
      if (!flag) {
        state.assetList = []
        state.needUpdate = true
      }
    })

    return {
      t,
      ...toRefs(state),
      fetchAssetList,
      useClickWithdrawal,
      closeModal
    }
  }
}
