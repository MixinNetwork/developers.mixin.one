import { base64RawURLEncode } from '@mixin.dev/mixin-node-sdk';
import { ref, inject } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { v4 as uuid, parse } from 'uuid';
import qs from 'qs';
import { useUserClient } from '@/api';
import { useLayoutStore } from '../layout';

export const useBuyModalStore = defineStore('buy-app', () => {
  const $message = inject('$message');
  const { t } = useI18n();
  const router = useRouter();

  const dataStore = useLayoutStore();
  const { appProperty, userInfo } = storeToRefs(dataStore);
  const { fetchAppProperty } = dataStore;

  const show = ref(false);
  const loading = ref(false);

  const useCheckCredit = () => {
    console.log('App Properties:', appProperty.value);
    if (appProperty.value.count <= 0) {
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
      payeeId: "3c2bf6e7-fa74-4764-a4f3-79a24fab814f",
      settlementAssetId: asset,
      quoteAssetId: 'usd',
      quoteAmount: amount,
      traceId: uuid(),
      settlementMemo: memo,
      returnTo,
    };
    const query = qs.stringify(params);
    return `${baseUrl}?${query}`;
  };
  const buildPaymentMemo = (user_id) => {
    const extra = JSON.stringify({
      u: user_id,
      e: 'buy mixin app'
    });
    const version = Buffer.from([1]);
    const payee = Buffer.from(parse("fbd26bc6-3d04-4964-a7fe-a540432b16e2"));
    const extraBuf = Buffer.from(extra)
    return base64RawURLEncode(Buffer.concat([version, payee, extraBuf]));
  };
  const useClickBuyButton = async (count) => {
    const client = useUserClient($message, t);
    loading.value = true;
    await fetchAppProperty(client);

    const amount = Number(appProperty.value.price) * count;
    const memo = buildPaymentMemo(userInfo.value.user_id);
    window.location.href = generateMixPayUrl(appProperty.value.asset_id, amount, memo, window.location.href);
  };

  return {
    show,
    loading,
    useClickBuyButton,
    useCloseBuyModal,
    useCheckCredit,
  };
});
