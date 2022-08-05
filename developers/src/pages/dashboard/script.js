import { v4 as uuid } from 'uuid';
import {
  reactive,
  toRefs,
  computed,
  onUpdated,
  watch,
} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import DHeader from '@/components/DHeader';
import DModal from '@/components/DModal';
import {
  useAppList,
  useAppProperty,
  useUserInfo,
  useClient,
} from '@/api';
import { isImmersive } from '@/utils';
import defaultAppIcon from '@/assets/img/default_robot.png';
import defaultAvatar from '@/assets/img/default_avatar.png';
import AppContainer from './app-container';

export default {
  name: 'dashboard-container',
  components: { DModal, DHeader, AppContainer },
  async setup() {
    const { t } = useI18n();

    const state = reactive({
      isImmersive: isImmersive(),
      showWelcome: true,
      isNewApp: false,
      currenAppId: '',
      loadingAll: false,
      showLogoutModal: false,
      showBuyModal: false,
      userInfo: {},
      appList: [],
      appsProperty: {},
      defaultAppIcon,
      defaultAvatar,
    });
    const mobileTitlePosition = computed(() => (!state.isImmersive ? 'left' : 'center'));
    const mobileUserPosition = computed(() => (!state.isImmersive ? 'right' : 'left'));

    onUpdated(() => {
      state.isImmersive = isImmersive();
    });

    const route = useRoute();
    const router = useRouter();
    const jump = (uri) => {
      if (uri === route.path) return;
      router.push({ path: uri });
    };

    const client = useClient();
    const useFetchAll = async () => {
      state.loadingAll = true;
      state.appList = await useAppList(client);
      state.userInfo = await useUserInfo(client);
      state.loadingAll = false;
      state.appsProperty = await useAppProperty(client);
    };
    const useFetchAppList = async () => {
      state.loadingAll = true;
      state.appList = await useAppList(client);
      state.loadingAll = false;
    };
    const useHasCredit = () => {
      const { count } = state.appsProperty;
      return state.appList.length < count;
    };

    const useClickApp = async (item) => {
      jump(`/apps/${item.app_number}`);
    };
    const useClickUser = () => {
      state.showLogoutModal = !state.showLogoutModal;
      if (state.showLogoutModal) {
        document.onclick = () => {
          state.showLogoutModal = false;
        };
      }
    };
    const useClickSignOut = () => {
      window.localStorage.clear();
      state.showLogoutModal = false;
      setTimeout(() => {
        window.location.href = window.location.origin;
      }, 100);
    };
    const useClickNewApp = async () => {
      const hasCredit = useHasCredit();
      if (hasCredit) {
        jump('/apps/new');
      } else {
        state.showBuyModal = true;
      }
    };
    const useClickBuyApp = async (count) => {
      state.loadingAll = true;
      const { price } = await useAppProperty(client);
      state.loadingAll = false;

      const trace = uuid();
      const amount = Number(price) * count;
      // eslint-disable-next-line max-len
      window.location.href = `https://mixin.one/pay?recipient=fbd26bc6-3d04-4964-a7fe-a540432b16e2&asset=c94ac88f-4671-3976-b60a-09064f1811e8&amount=${amount}&trace=${trace}&memo=PAY_FOR_APP`;
    };
    const useNewAppSubmitted = async (app_number) => {
      await useFetchAppList();
      jump(`/apps/${app_number}`);
    };

    const useLoadRouteStatus = (val) => {
      switch (val) {
        case '/dashboard':
          state.showWelcome = true;
          state.isNewApp = false;
          state.currenAppId = '';
          break;
        case '/apps/new':
          state.showWelcome = false;
          state.isNewApp = true;
          state.currenAppId = '';
          break;
        default:
          state.showWelcome = false;
          state.isNewApp = false;
          state.currenAppId = state.appList.find((app) => app.app_number === route.params.app_number).app_id;
          break;
      }
    };
    watch(() => route.path, async (name) => {
      await useLoadRouteStatus(name);
    });

    await useFetchAll();
    useLoadRouteStatus(route.path);

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
      t,
      route,
    };
  },
};
