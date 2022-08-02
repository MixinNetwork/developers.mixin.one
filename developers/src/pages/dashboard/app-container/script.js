import {
  computed,
  defineAsyncComponent,
  onMounted,
  reactive,
  toRefs,
  watch,
} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import DHeader from '@/components/DHeader';
import DModal from '@/components/DModal';
import { useApp, useClient } from '@/api';

export default {
  name: 'app-container',
  components: {
    DModal,
    DHeader,
    AppInformation: defineAsyncComponent(() => import('../app-information')),
    AppSecret: defineAsyncComponent(() => import('../app-secret')),
    AppWallet: defineAsyncComponent(() => import('../app-wallet')),
  },
  props: ['appList'],
  emits: ['check-app-credit', 'add-new-app'],
  setup(props, ctx) {
    const { t } = useI18n();

    const state = reactive({
      loadingApp: false,
      showWelcome: false,
      isNewApp: false,
      currentNavIndex: 0,
      navList: ['information', 'wallet', 'secret'],
      appInfo: {},
    });
    const currentNav = computed(() => `app-${state.navList[state.currentNavIndex]}`);

    const route = useRoute();
    const client = useClient();
    const useFetchApp = async () => {
      const { app_number } = route.params;
      if (app_number && props.appList.length) {
        state.loadingApp = true;
        state.currentNavIndex = 0;
        const appId = props.appList.find((app) => app.app_number === app_number).app_id;
        state.appInfo = await useApp(client, appId);
        state.loadingApp = false;
      }
    };

    const router = useRouter();
    const backward = () => {
      router.back();
    };
    const useLoadRouteStatus = async (val) => {
      switch (val) {
        case '/dashboard':
          state.showWelcome = true;
          state.isNewApp = false;
          break;
        case '/apps/new':
          state.showWelcome = false;
          state.isNewApp = true;
          break;
        default:
          state.showWelcome = false;
          state.isNewApp = false;
          await useFetchApp();
      }
    };
    watch(() => route.path, async (name) => {
      await useLoadRouteStatus(name);
    });

    const useClickNewApp = () => {
      ctx.emit('check-app-credit');
    };
    const useNewAppSubmitted = (app_number) => {
      ctx.emit('add-new-app', app_number);
    };
    const useClickNav = (index) => {
      state.currentNavIndex = index;
    };
    const useModifyLoading = (isLoading) => {
      state.loadingApp = isLoading;
    };

    onMounted(async () => {
      await useLoadRouteStatus(route.path);
    });

    return {
      ...toRefs(state),
      currentNav,
      useFetchApp,
      useClickNewApp,
      useNewAppSubmitted,
      useClickNav,
      useModifyLoading,
      backward,
      t,
    };
  },
};
