import {
  inject,
  reactive,
  toRefs,
  onActivated,
  onMounted,
  watch,
} from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import UpdateToken from '@/components/UpdateToken';
import WithdrawalModal from '@/pages/app-container/app-wallet/withdrawal';
import { useLoadStore } from '@/stores';
import { assetSortCompare, ls } from '@/utils';
import { useAssetList, useClient } from '@/api';

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
    const route = useRoute();

    const { modifyLocalLoadingStatus } = useLoadStore();
    const state = reactive({
      showWithdrawalModal: false,
      showSessionUpdateModal: false,
      assetList: [],
      withdrawalAsset: {},
    });

    const useHasAppToken = (tokenInfo) => !!(tokenInfo
      && tokenInfo.user_id
      && tokenInfo.pin_token
      && tokenInfo.session_id
      && tokenInfo.private_key);

    const useFetchAssetList = async () => {
      const tokenInfo = ls.get(props.appId);
      if (!useHasAppToken(tokenInfo)) {
        state.assetList = [];
        return;
      }

      const unauthorizedCb = () => {
        modifyLocalLoadingStatus(false);
        state.showSessionUpdateModal = true;
        ls.rm(props.appId);
      };
      const appClient = useClient($message, t, tokenInfo, true, unauthorizedCb);

      modifyLocalLoadingStatus(true);
      const res = await useAssetList(appClient);
      modifyLocalLoadingStatus(false);

      if (
        res
        && Object.prototype.toString.call(res) === '[object Array]'
        && res.every((asset) => asset.type === 'asset')
      ) {
        state.assetList = res.sort(assetSortCompare);
      } else {
        state.assetList = [];
      }
    };

    const useClickWithdrawal = (item) => {
      state.withdrawalAsset = item;
      state.showWithdrawalModal = true;
    };

    onActivated(async () => {
      await useFetchAssetList();
    });

    onMounted(async () => {
      await useFetchAssetList();
    });

    watch(() => props.appId, async () => {
      await useFetchAssetList();
    });

    return {
      t,
      ...toRefs(state),
      useFetchAssetList,
      useClickWithdrawal,
      route,
    };
  },
};
