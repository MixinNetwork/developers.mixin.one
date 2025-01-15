import {
  computed,
  defineAsyncComponent,
  reactive,
  toRefs,
  watch,
} from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import DHeader from '@/components/DHeader.vue';
import { useLayoutStore } from '@/stores';

export default {
  name: 'app-container',
  components: {
    DHeader,
    AppInformation: defineAsyncComponent(() => import('@/components/AppForm/index.vue')),
    AppSecret: defineAsyncComponent(() => import('./app-secret/index.vue')),
    AppBilling: defineAsyncComponent(() => import('./app-billing/index.vue')),
    // AppWallet: defineAsyncComponent(() => import('./app-wallet/index.vue')),
  },
  async setup() {
    const { t } = useI18n();
    const route = useRoute();

    const layoutStore = useLayoutStore();
    const { appList } = storeToRefs(layoutStore);

    const state = reactive({
      currentNavIndex: 0,
      navList: ['information', 'secret', 'billing'], // , 'wallet'
      currentAppName: '',
      currentAppId: '',
    });
    state.currentNavIndex = route.hash ? state.navList.indexOf(route.hash.slice(1)) : 0;
    const currentNav = computed(() => `app-${state.navList[state.currentNavIndex]}`);
    const includeComponents = state.navList.map((name) => `app-${name}`);

    const useSelectApp = () => {
      const { app_number } = route.params;
      const app = appList.value.find((app) => app.app_number === app_number);
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

    const useClickNav = (index) => {
      const r = { path: `/apps/${route.params.app_number}` };
      if (index !== 0) {
        r.hash = `#${state.navList[index]}`;
      }
      router.push(r);
    };

    watch(() => appList.value, () => {
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
      includeComponents,
      useClickNav,
      backward,
      t,
    };
  },
};
