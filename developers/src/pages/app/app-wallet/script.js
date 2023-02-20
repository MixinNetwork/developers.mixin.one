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
import { storeToRefs } from 'pinia';
import { 
  useLoadStore, 
  useUpdateTokenModalStore, 
  useWithdrawalModalStore,
  useLayoutStore
} from '@/stores';
import { assetSortCompare, ls } from '@/utils';
import { useBotClient } from '@/api';

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
    const dataStore = useLayoutStore();
    const { chainList } = storeToRefs(dataStore);

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

      const appClient = useBotClient($message, t, tokenInfo, (err) => {
        if (err.code === 401) {
          modifyLocalLoadingStatus(false);
          useInitUpdateToken(props.appId, useFetchAssetList);
          ls.rm(props.appId);
        }
      });

      modifyLocalLoadingStatus(true);
      const res = await appClient.asset.fetchList();
      modifyLocalLoadingStatus(false);

      if (res instanceof Array) {
        state.assetList = res.sort(assetSortCompare);
      } else {
        state.assetList = [];
      }

      const useGetAssetWithChainInfo = async (asset) => {
        let cachedChainAsset = chainList.value[asset.chain_id];
        if (!cachedChainAsset) {
          try {
            cachedChainAsset = await appClient.request(`/network/chains/${asset.chain_id}`);
            chainList.value[asset.chain_id] = cachedChainAsset;
          } catch(e) {
            cachedChainAsset = {
              name: undefined,
              icon_url: undefined
            };
          }
        }

        return {
          ...asset,
          chain_name: cachedChainAsset.name,
          chain_icon_url: cachedChainAsset.icon_url
        };
      };
      state.assetList = await Promise.all(state.assetList.map(asset => useGetAssetWithChainInfo(asset)));
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
