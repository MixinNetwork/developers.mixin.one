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
    AppInformation: defineAsyncComponent(() => import('../app-information')),
    AppSecret: defineAsyncComponent(() => import('../app-secret')),
    AppWallet: defineAsyncComponent(() => import('../app-wallet')),
  },
  props: ['appId', 'isNewApp', 'showWelcome'],
  emits: ['check-app-credit', 'add-new-app'],
  async setup(props, ctx) {
    const { t } = useI18n();

    const state = reactive({
      loadingApp: false,
      currentNavIndex: 0,
      navList: ['information', 'wallet', 'secret'],
      name: 'Mixin App',
    });
    const currentNav = computed(() => `app-${state.navList[state.currentNavIndex]}`);

    const router = useRouter();
    const backward = () => {
      router.back();
    };

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
    const useSetAppName = (name) => {
      state.name = name;
    };

    const route = useRoute();
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
