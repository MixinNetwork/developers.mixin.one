import { v4 as uuid } from 'uuid'
import { reactive, toRefs, computed, onMounted, onUpdated } from "vue";
import { useRoute, useRouter } from "vue-router";
import DHeader from '@/components/DHeader'
import DModal from '@/components/DModal'
import AppContainer from './app-container'
import { useAppList, useAppProperty, useUserInfo, useClient } from "@/api";
import { useCheckMobile, defaultConst, isImmersive } from '@/utils'

export default {
  name: 'dashboard-container',
  components: { DModal, DHeader, AppContainer },
  setup() {
    const state = reactive({
      isMobile: false,
      isImmersive: isImmersive(),
      loadingAll: false,
      showLogoutModal: false,
      showBuyModal: false,
      userInfo: {},
      appList: [],
      appsProperty: {},
      currentAppId: '',
    })
    const mobileTitlePosition = computed(() => !state.isImmersive? 'left': 'center')
    const mobileUserPosition = computed(() => !state.isImmersive? 'right': 'left')

    useCheckMobile(state)

    const route = useRoute()
    const router = useRouter()
    const jump = (uri) => {
      if (uri === route.path) return
      if (uri === '/apps/new') state.currentAppId = ''
      router.push({path: uri})
    }

    const client = useClient()
    const useFetchAll = async () => {
      state.loadingAll = true
      state.appList = await useAppList(client)
      state.userInfo = await useUserInfo(client)
      state.loadingAll = false
      state.appsProperty = await useAppProperty(client)
    }
    const useFetchAppList = async () => {
      state.loadingAll = true
      state.appList = await useAppList(client)
      state.loadingAll = false
    }
    const useAppId = () => {
      const { app_number } = route.params
      if (!app_number) return ''

      state.currentAppId = state.appList.find(app => app.app_number === app_number).app_id
    }
    const useHasCredit = () => {
      let { count } = state.appsProperty
      return state.appList.length < count;
    }

    const useClickApp = async (item) => {
      state.currentAppId = item.app_id
      jump(`/apps/${item.app_number}`)
    }
    const useClickUser = () => {
      state.showLogoutModal = !state.showLogoutModal
      if (state.showLogoutModal) {
        document.onclick = () => state.showLogoutModal = false
      }
    }
    const useClickSignOut = () => {
      window.localStorage.clear()
      state.showLogoutModal = false
      setTimeout(() => {
        window.location.href = window.location.origin
      }, 100)
    }
    const useClickNewApp = async () => {
      const hasCredit = useHasCredit()
      if (hasCredit) {
        jump('/apps/new')
      } else {
        state.showBuyModal = true
      }
    }
    const useClickBuyApp = async (count) => {
      state.loadingAll = true
      const { price } = await useAppProperty(client)
      state.loadingAll = false

      const trace = uuid()
      const amount = Number(price) * count
      window.location.href = `https://mixin.one/pay?recipient=fbd26bc6-3d04-4964-a7fe-a540432b16e2&asset=c94ac88f-4671-3976-b60a-09064f1811e8&amount=${amount}&trace=${trace}&memo=PAY_FOR_APP`
    }
    const useNewAppSubmitted = async (app_number) => {
      await useFetchAppList()
      jump(`/apps/${app_number}`)
    }

    onMounted(async () => {
      await useFetchAll()

      useAppId()
      if (route.name === 'new_app' && !useHasCredit()) state.showBuyModal = true
    })
    onUpdated(() => {
      state.isImmersive = isImmersive()
    })

    return {
      ...toRefs(state),
      mobileTitlePosition,
      mobileUserPosition,
      useClickApp,
      useClickUser,
      useClickSignOut,
      useClickNewApp,
      useClickBuyApp,
      useNewAppSubmitted,
      defaultConst,
      route,
    }
  },
}
