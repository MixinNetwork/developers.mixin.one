import {
  reactive,
  toRefs,
  onActivated,
  inject,
} from 'vue';
import { useI18n } from 'vue-i18n';
import UpdateToken from '@/components/UpdateToken';
import { useLoadStore } from '@/store';
import { assetSortCompare, ls } from '@/utils';
import { useAssetList, useClient } from '@/api';
import { useRoute } from 'vue-router';
import WithdrawalModal from './withdrawal';

export default {
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
      needUpdate: true,
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
      if (!useHasAppToken(tokenInfo)) return false;

      modifyLocalLoadingStatus(true);
      ls.set('ignoreError', 'true');
      try {
        const client = useClient($message, t, tokenInfo);
        const res = await useAssetList(client);
        if (res) {
          state.assetList = res.sort(assetSortCompare);
          state.needUpdate = false;
          state.showSessionUpdateModal = false;
        } else {
          state.needUpdate = true;
          state.showSessionUpdateModal = true;
          ls.rm(props.appId);
        }
      } catch (e) {
        state.needUpdate = true;
        state.showSessionUpdateModal = true;
        ls.rm(props.appId);
      } finally {
        modifyLocalLoadingStatus(false);
        ls.set('ignoreError', 'false');
      }
      return true;
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
      const flag = await fetchAssetList();
      if (!flag) {
        state.assetList = [];
        state.needUpdate = true;
      }
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
