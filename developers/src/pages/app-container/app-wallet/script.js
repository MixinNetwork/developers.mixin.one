import {
  inject,
  reactive,
  toRefs,
  onActivated,
  watch,
} from 'vue';
import { useI18n } from 'vue-i18n';
import UpdateToken from '@/components/UpdateToken';
import { useLoadStore } from '@/stores';
import { assetSortCompare, ls } from '@/utils';
import { useAssetList, useClient } from '@/api';
import { useRoute } from 'vue-router';
import WithdrawalModal from './withdrawal';

export default {
  name: 'app-wallet',
  components: {
    WithdrawalModal, UpdateToken,
  },
  props: {
    appId: String,
  },
  setup(props) {
    const $message = inject('$message');
    const { t } = useI18n();

    const { modifyLocalLoadingStatus } = useLoadStore();
    const state = reactive({
      showWithdrawalModal: false,
      showSessionUpdateModal: false,
      assetList: [],
      withdrawalAsset: {},
    });

    const route = useRoute();

    const useHasAppToken = (tokenInfo) => !!(tokenInfo
      && tokenInfo.user_id
      && tokenInfo.pin_token
      && tokenInfo.session_id
      && tokenInfo.private_key);

    const fetchAssetList = async () => {
      const tokenInfo = ls.get(props.appId);
      if (!useHasAppToken(tokenInfo)) {
        state.assetList = [];
        return;
      }

      modifyLocalLoadingStatus(true);
      try {
        const appClient = useClient($message, t, tokenInfo, true);
        const res = await useAssetList(appClient);
        if (res) {
          state.assetList = res.sort(assetSortCompare);
          state.showSessionUpdateModal = false;
        } else {
          state.assetList = [];
          state.showSessionUpdateModal = true;
          ls.rm(props.appId);
        }
      } catch (e) {
        state.assetList = [];
        state.showSessionUpdateModal = true;
        ls.rm(props.appId);
      } finally {
        modifyLocalLoadingStatus(false);
      }
    };

    const useClickWithdrawal = (item) => {
      state.withdrawalAsset = item;
      setTimeout(() => {
        state.showWithdrawalModal = true;
      }, 200);
    };
    const closeModal = () => {
      state.showSessionUpdateModal = false;
    };

    onActivated(async () => {
      await fetchAssetList();
    });

    watch(() => props.appId, async () => {
      await fetchAssetList();
    });

    return {
      t,
      ...toRefs(state),
      fetchAssetList,
      useClickWithdrawal,
      closeModal,
      route,
    };
  },
};
