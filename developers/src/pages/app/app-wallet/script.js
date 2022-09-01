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
import { useLoadStore, useUpdateTokenModalStore, useWithdrawalModalStore } from '@/stores';
import { assetSortCompare, ls } from '@/utils';
import { useAssetList, useClient } from '@/api';

export default {
  name: 'app-wallet',
  props: {
    appId: String,
  },
  setup(props) {
    const $message = inject('$message');
    const { t } = useI18n();
    const route = useRoute();

    const { modifyLocalLoadingStatus } = useLoadStore();
    const { useInitWithdrawal } = useWithdrawalModalStore();
    const { useInitUpdateToken } = useUpdateTokenModalStore();

    const state = reactive({
      assetList: [],
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
        useInitUpdateToken(props.appId, useFetchAssetList);
        ls.rm(props.appId);
      };
      const appClient = useClient($message, t, tokenInfo, true, unauthorizedCb);

      modifyLocalLoadingStatus(true);
      const res = await useAssetList(appClient);
      modifyLocalLoadingStatus(false);

      if (res instanceof Array) {
        state.assetList = res.sort(assetSortCompare);
      } else {
        state.assetList = [];
      }
    };

    const useClickWithdrawal = (item) => {
      useInitWithdrawal(item, props.appId, useFetchAssetList);
    };
    const useShowUpdateToken = () => {
      useInitUpdateToken(props.appId, useFetchAssetList);
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
      ...toRefs(state),
      useShowUpdateToken,
      useFetchAssetList,
      useClickWithdrawal,
      route,
      t,
    };
  },
};
