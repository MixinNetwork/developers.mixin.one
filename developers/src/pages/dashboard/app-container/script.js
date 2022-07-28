import { computed } from "vue";
import DHeader from '@/components/DHeader'
import DModal from '@/components/DModal'
import Information from "@/pages/dashboard/app-information";
import Secret from "@/pages/dashboard/app-secret";
import Wallet from "@/pages/dashboard/app-wallet";

export default {
  name: "app-container",
  components: { Information, Secret, Wallet, DModal, DHeader },
  props: ['isMobile', 'client', 'appId'],
  data() {
    return {
      loadingApp: false,
      showWelcome: false,
      isNewApp: false,
      currentNavIndex: 0,
      currentNav: computed(() => this.navList[this.currentNavIndex]),
      navList: ['information', 'wallet', 'secret'],
      appInfo: {}
    }
  },
  watch: {
    async appId(val) {
      if (val) {
        this.loadingApp = true
        this.appInfo = await this.client.app.fetch(this.appId)
        this.currentNavIndex = 0
        this.loadingApp = false
      }
    },
    '$route.name'(val) {
      this.loadStatus(val)
    }
  },
  methods: {
    loadStatus(val) {
      switch (val) {
        case 'dashboard':
          this.showWelcome = true
          this.isNewApp = false
          break
        case 'new_app':
          this.showWelcome = false
          this.isNewApp = true
          break
        default:
          const { app_number } = this.$route.params
          // this.currentAppId = this.appList.find(app => app.app_number === app_number).app_id
          this.showWelcome = false
          this.isNewApp = false
      }
    },
    newAppSubmitted(app_number) {
      this.$emit('add-new-app', app_number)
    },
    newAppClickHandler() {
      this.$emit('check-app-credit')
    },
    navItemClickHandler(index) {
      this.currentNavIndex = index
    },
    changeAppLoadingState(state) {
      this.loadingApp = state
    },
    backward() {
      this.$router.go(-1)
    },
  },
  mounted() {
    this.loadStatus(this.$route.name)
  }
}