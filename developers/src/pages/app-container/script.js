import {
  computed,
  defineAsyncComponent,
  reactive,
  toRefs,
  watch,
} from 'vue';
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
  props: ['appId'],
  emits: ['click-new-app', 'add-new-app', 'set-local-loading'],
  async setup(props, ctx) {
    const { t } = useI18n();

    const state = reactive({
      currentNavIndex: 0,
      navList: ['information', 'wallet', 'secret'],
      name: 'Mixin App',
    });
    const currentNav = computed(() => `app-${state.navList[state.currentNavIndex]}`);

    const route = useRoute();
    if (route.hash) state.currentNavIndex = state.navList.indexOf(route.hash.slice(1));

    const router = useRouter();
    const backward = () => {
      router.push({
        path: '/dashboard',
      });
    };

    const useClickNewApp = () => {
      ctx.emit('check-app-credit');
    };
    const useNewAppSubmitted = (app_number) => {
      ctx.emit('add-new-app', app_number);
    };
    const useClickNav = (index) => {
      router.push({ path: `/apps/${route.params.app_number}`, hash: `#${state.navList[index]}` });
      state.currentNavIndex = index;
    };
    const useModifyLoading = (isLoading) => {
      ctx.emit('set-local-loading', isLoading);
    };
    const useSetAppName = (name) => {
      state.name = name;
    };

    watch(() => route.path, () => {
      state.currentNavIndex = 0;
    });

    return {
      ...toRefs(state),
      currentNav,
      useSetAppName,
      useClickNewApp,
      useNewAppSubmitted,
      useClickNav,
      useModifyLoading,
      backward,
      t,
    };
  },
};
