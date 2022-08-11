import {
  computed,
  defineAsyncComponent,
  reactive,
  toRefs,
  watch,
} from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import DHeader from '@/components/DHeader';
import DModal from '@/components/DModal';

export default {
  name: 'app-container',
  components: {
    DModal,
    DHeader,
    AppInformation: defineAsyncComponent(() => import('./app-information')),
    AppSecret: defineAsyncComponent(() => import('./app-secret')),
    AppWallet: defineAsyncComponent(() => import('./app-wallet')),
  },
  async setup() {
    const { t } = useI18n();
    const route = useRoute();

    const store = useStore();
    const state = reactive({
      currentNavIndex: 0,
      navList: ['information', 'wallet', 'secret'],
      currentAppName: '',
      currentAppId: '',
    });
    state.currentNavIndex = route.hash ? state.navList.indexOf(route.hash.slice(1)) : 0;
    const currentNav = computed(() => `app-${state.navList[state.currentNavIndex]}`);

    const useSelectApp = () => {
      const { app_number } = route.params;
      const app = store.state.appList.find((app) => app.app_number === app_number);
      if (app) {
        state.currentAppId = app.app_id;
        state.currentAppName = app.name;
      }
    };
    useSelectApp();

    const router = useRouter();
    const backward = () => {
      router.push({
        path: '/dashboard',
      });
    };

    const useClickNewApp = () => {
      store.commit('modifyClickedNewApp');
    };
    const useClickNav = (index) => {
      router.push({ path: `/apps/${route.params.app_number}`, hash: `#${state.navList[index]}` });
    };

    watch(() => store.state.appList, () => {
      useSelectApp();
    });
    watch(() => route.path, () => {
      useSelectApp();
    });
    watch(() => route.hash, (hash) => {
      state.currentNavIndex = hash ? state.navList.indexOf(route.hash.slice(1)) : 0;
    });

    return {
      ...toRefs(state),
      currentNav,
      useClickNewApp,
      useClickNav,
      backward,
      t,
    };
  },
};
