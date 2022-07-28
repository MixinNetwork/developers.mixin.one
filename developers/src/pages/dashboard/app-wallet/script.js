import { MixinApi } from "@mixin.dev/mixin-node-sdk";
import UpdateToken from '@/components/UpdateToken'
import tools from '@/assets/js/tools'
import defaultApiConfig from "@/api";
import WithdrawalModal from './withdrawal'

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
  data() {
    return {
      loadingAll: false,
      showWithdrawalModal: false,
      showSessionUpdateModal: false,
      needUpdate: true,
      tokenInfo: {},
      assetList: [],
      withdrawalAsset: {}
    }
  },
  computed: {
    hasSession() {
      return this.tokenInfo
        && this.tokenInfo.user_id
        && this.tokenInfo.pin_token
        && this.tokenInfo.session_id
        && this.tokenInfo.private_key
    },
    client() {
      if (this.hasSession) {
        const config = {
          ...defaultApiConfig,
          keystore: { ...this.tokenInfo }
        }
        return MixinApi(config)
      }
    }
  },
  async mounted() {
    await this.fetchAssetList()
  },
  methods: {
    hasAppSession() {
      const appSession = this.$ls.get(this.app.app_id)
      if (appSession) {
        this.tokenInfo = appSession
        return true
      }
      return false
    },
    closeModal() {
      this.showSessionUpdateModal = false
    },
    withdrawalClickHandler(item) {
      this.withdrawalAsset = item
      setTimeout(() => {
        this.showWithdrawalModal = true
      }, 200)
    },
    async fetchAssetList() {
      if (!this.hasAppSession()) return

      this.loadingAll = true
      if (this.app.app_id !== this.tokenInfo.user_id || !this.client) {
        this.needUpdate = true
        this.showSessionUpdateModal = true
        this.loadingAll = false
        return
      }

      try {
        _vm.skipInterceptor = true
        let res = await this.client.asset.fetchList()
        if (res) {
          this.assetList = res.sort(tools.assetSortCompare)
          this.needUpdate = false
          this.showSessionUpdateModal = false
        } else {
          this.needUpdate = true
          this.showSessionUpdateModal = true
          this.$ls.rm(this.app.app_id)
        }
      } catch (e) {
        if (e.code) this.$message.error({ message: this.$t(`message.errors.${e.code}`), showClose: true })

        this.needUpdate = true
        this.showSessionUpdateModal = true
        this.$ls.rm(this.app.app_id)
      } finally {
        this.loadingAll = false
        _vm.skipInterceptor = false
      }
    },
  },
}
