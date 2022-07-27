import { computed } from "vue";
import DHeader from '@/components/DHeader'
import DModal from '@/components/DModal'
import Information from "@/pages/dashboard/app-information";
import Secret from "@/pages/dashboard/app-secret";
import Wallet from "@/pages/dashboard/app-wallet";

export default {
  name: "app-container",
  components: { Information, Secret, Wallet, DModal, DHeader },
  props: ['isMobile', 'isNewApp', 'showWelcome', 'client', 'appId'],
  data() {
    return {
      loadingApp: false,
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
        this.loadingApp = false
      }
    }
  },
  methods: {
    add_new_app() {},
    newAppClickHandler() {
      this.$emit('add-new-app')
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
  }
}