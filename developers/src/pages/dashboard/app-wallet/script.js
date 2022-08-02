import {
  reactive,
  toRefs,
  onActivated,
} from 'vue';
import { useStorage } from '@vueuse/core';
import { useI18n } from 'vue-i18n';
import UpdateToken from '@/components/UpdateToken';
import { assetSortCompare } from '@/utils';
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
  emits: ['loading'],
  setup(props, ctx) {
    const { t } = useI18n();

    const state = reactive({
      showWithdrawalModal: false,
      showSessionUpdateModal: false,
      needUpdate: true,
      assetList: [],
      withdrawalAsset: {},
    });

    const route = useRoute();

    const useHasAppToken = (tokenInfo) => tokenInfo.user_id
        && tokenInfo.pin_token
        && tokenInfo.session_id
        && tokenInfo.private_key;

    const fetchAssetList = async () => {
      const tokenInfo = useStorage(props.appId, {});
      if (!useHasAppToken(tokenInfo.value)) return false;

      ctx.emit('loading', true);
      _vm.skipInterceptor = true;
      try {
        const client = useClient(tokenInfo.value);
        const res = await useAssetList(client);
        if (res) {
          state.assetList = res.sort(assetSortCompare);
          state.needUpdate = false;
          state.showSessionUpdateModal = false;
        } else {
          state.needUpdate = true;
          state.showSessionUpdateModal = true;
          tokenInfo.value = null;
        }
      } catch (e) {
        state.needUpdate = true;
        state.showSessionUpdateModal = true;
        tokenInfo.value = null;
      } finally {
        ctx.emit('loading', false);
        _vm.skipInterceptor = false;
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
