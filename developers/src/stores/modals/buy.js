import { base64RawURLEncode } from '@mixin.dev/mixin-node-sdk';
import { ref, inject } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { v4 as uuid } from 'uuid';
import qs from 'qs';
import { useUserClient } from '@/api';
import { useLayoutStore } from '../layout';

export const useBuyModalStore = defineStore('buy-app', () => {
  const $message = inject('$message');
  const { t } = useI18n();
  const router = useRouter();

  const dataStore = useLayoutStore();
  const { appProperty, appList, userInfo } = storeToRefs(dataStore);
  const { fetchAppProperty } = dataStore;

  const show = ref(false);
  const loading = ref(false);

  const useCheckCredit = () => {
    if (appList.value.length >= appProperty.value.count) {
      show.value = true;
      return;
    }

    router.push('/apps/new');
  };
  const useCloseBuyModal = () => {
    show.value = false;
  };

  const generateMixPayUrl = (asset, amount, memo, returnTo) => {
    const baseUrl = 'https://mixpay.me/pay';
    const params = {
      payeeId: "fbd26bc6-3d04-4964-a7fe-a540432b16e2",
      settlementAssetId: asset,
      quoteAssetId: asset,
      quoteAmount: amount,
      traceId: uuid(),
      settlementMemo: memo,
      returnTo
    };
  
    const query = qs.stringify(params);
    return `${baseUrl}?${query}`;
  }
  const useClickBuyButton = async (count) => {
    const client = useUserClient($message, t);
    loading.value = true;
    await fetchAppProperty(client);

    const amount = 10 * count;
    // const amount = Number(appProperty.value.price) * count;
    const memo = base64RawURLEncode(JSON.stringify({
      u: userInfo.value.user_id,
      a: "APP"
    }));
    const pUSD_ASSET_ID = "31d2ea9c-95eb-3355-b65b-ba096853bc18";
    window.location.href = generateMixPayUrl(pUSD_ASSET_ID, amount, memo, window.location.href);
    // window.location.href = generateMixPayUrl(appProperty.value.asset_id, amount, memo, window.location.href);
  };

  return {
    show,
    loading,
    useClickBuyButton,
    useCloseBuyModal,
    useCheckCredit,
  };
});
