import {computed, onMounted, reactive, toRefs, watch} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import DHeader from '@/components/DHeader'
import DModal from '@/components/DModal'
import AppInformation from "@/pages/dashboard/app-information";
import AppSecret from "@/pages/dashboard/app-secret";
import AppWallet from "@/pages/dashboard/app-wallet";
import { useApp, useClient } from "@/api";

export default {
  name: "app-container",
  components: { AppInformation, AppSecret, AppWallet, DModal, DHeader },
  props: ['isMobile', 'appId'],
  emits: ['check-app-credit', 'add-new-app'],
  setup(props, ctx) {
    const { t } = useI18n()

    const state = reactive({
      loadingApp: false,
      showWelcome: false,
      isNewApp: false,
      currentNavIndex: 0,
      navList: ['information', 'wallet', 'secret'],
      appInfo: {}
    })
    const currentNav = computed(() => `app-${state.navList[state.currentNavIndex]}`)

    const route = useRoute()
    const router = useRouter()
    const backward = () => {
      router.back()
    }
    const useLoadRouteStatus = async (val) => {
      switch (val) {
        case '/dashboard':
          state.showWelcome = true
          state.isNewApp = false
          break
        case '/apps/new':
          state.showWelcome = false
          state.isNewApp = true
          break
        default:
          state.showWelcome = false
          state.isNewApp = false
          await useFetchApp()
      }
    }
    watch(() => route.path, async (name) => {
      await useLoadRouteStatus(name)
    })

    const client = useClient()
    const useFetchApp = async () => {
      if (props.appId) {
        state.loadingApp = true
        state.appInfo = await useApp(client, props.appId)
        state.currentNavIndex = 0
        state.loadingApp = false
      }
    }

    const useClickNewApp = () => {
      ctx.emit('check-app-credit')
    }
    const useNewAppSubmitted = (app_number) => {
      ctx.emit('add-new-app', app_number)
    }
    const useClickNav = (index) => {
      state.currentNavIndex = index
    }
    const useModifyLoading = (isLoading) => {
      state.loadingApp = isLoading
    }

    onMounted(async () => {
      await useLoadRouteStatus(route.path)
    })
    watch(() => props.appId, async (appId) => {
      await useFetchApp()
    })

    return {
      t,
      ...toRefs(state),
      currentNav,
      useClickNewApp,
      useNewAppSubmitted,
      useClickNav,
      useModifyLoading,
      backward
    }
  },
}