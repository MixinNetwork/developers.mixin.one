import { v4 as uuid } from 'uuid'
import { computed } from "vue";
import { MixinApi } from "@mixin.dev/mixin-node-sdk";
import DHeader from '@/components/DHeader'
import DModal from '@/components/DModal'
import Container from './app-container'
import defaultApiConfig from "@/api";
import tools from "@/assets/js/tools";

export default {
  name: 'dashboard-container',
  components: { DModal, DHeader, Container },
  data() {
    return {
      isMobile: false,
      isNewApp: false,
      isImmersive: false,
      mobileTitlePosition: computed(() => !this.isImmersive? 'left': 'center'),
      mobileUserPosition: computed(() => !this.isImmersive? 'right': 'left'),
      showWelcome: true,
      showLogoutPanel: false,
      showBuyPanel: false,
      loadingAll: false,
      userInfo: {},
      appList: [],
      appsProperty: {},
      currentAppId: '',
      client: MixinApi(defaultApiConfig)
    }
  },
  watch: {
    '$route.path'(val) {
      this.mountRouterStatus(val)
    }
  },
  async created() {

    console.log('mount', this.currentAppId)
    this.isImmersive = tools.isImmersive()

    this.isMobile = document.documentElement.clientWidth < 769
    window.onresize = () => {
      this.isMobile = document.documentElement.clientWidth < 769
    }

    this.updateClient()
    await this.fetchAll()

    this.mountRouterStatus(this.$route.path)
  },
  methods: {
    mountRouterStatus(route) {
      console.log(route)
      switch (route) {
        case '/dashboard':
          this.showWelcome = true
          this.isNewApp = false
          break
        case '/apps/new':
          const hasCredit = this.checkAppCredit()
          if (!hasCredit) {
            this.showBuyPanel = true
            this.jump('/dashboard')
          }
          this.showWelcome = false
          this.isNewApp = true
          break
        default:
          const { app_number } = this.$route.params
          this.currentAppId = this.appList.find(app => app.app_number === app_number).app_id
          console.log('dashboard', app_number, this.currentAppId)
          this.showWelcome = false
          this.isNewApp = false
      }
    },
    updateClient() {
      const keystore = this.$ls.get('token');
      if (
        keystore &&
        keystore.scope &&
        keystore.authorization_id &&
        keystore.private_key
      ) {
        this.client = MixinApi({
          ...defaultApiConfig,
          keystore
        });
      }
    },
    jump(uri) {
      if (uri === this.$route.path) return
      if (uri === '/dashboard' || uri === '/apps/new') this.currentAppId = ''
      this.$router.push(uri)
    },
    add_new_app(app_number) {
      this.fetchAppList()
      app_number = app_number || this.$route.params.app_number
      if (app_number) {
        this.jump('/apps/' + app_number)
      }
    },
    checkAppCredit() {
      let { count } = this.appsProperty
      return this.appList.length < count;
    },
    async newAppHandler(){
      const hasCredit = this.checkAppCredit()
      if (hasCredit) {
        this.jump('/apps/new')
      } else {
        this.loadingAll = true
        const { price } = await this.client.app.properties()
        this.loadingAll = false
        this.showBuyPanel = true
        this.appCreditPrice = Number(price)
      }
    },
    async appItemClickHandler(item) {
      this.currentAppId = item.app_id
      this.jump(`/apps/${item.app_number}`)
    },
    userClickHandler() {
      this.showLogoutPanel = !this.showLogoutPanel
      if (this.showLogoutPanel) {
        document.onclick = () => this.showLogoutPanel = false
      }
    },
    signOut() {
      window.localStorage.clear()
      this.showLogoutPanel = false
      setTimeout(() => {
        window.location.href = window.location.origin
      }, 100)
    },
    buyAppClickHandler(count) {
      let trace = uuid()
      let amount = this.appCreditPrice * count
      window.location.href = `https://mixin.one/pay?recipient=fbd26bc6-3d04-4964-a7fe-a540432b16e2&asset=c94ac88f-4671-3976-b60a-09064f1811e8&amount=${amount}&trace=${trace}&memo=PAY_FOR_APP`
    },
    async fetchAll() {
      this.loadingAll = true
      this.userInfo = await this.client.user.profile()
      await this.fetchAppList()
      this.appsProperty = await this.client.app.properties()
    },
    async fetchAppList() {
      this.loadingAll = true
      this.appList = await this.client.app.fetchList()
      this.loadingAll = false
    },
  }
}
