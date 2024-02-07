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
  const { appProperty, userInfo } = storeToRefs(dataStore);
  const { fetchAppProperty } = dataStore;

  const show = ref(false);
  const loading = ref(false);

  const useCheckCredit = () => {
    if (appProperty.value.count <= 0) {
      show.value = true;
      return;
    }

    router.push('/apps/new');
  };
  const useCloseBuyModal = () => {
    show.value = false;
  };

  const generateMixinPayUrl = (asset, amount, memo, returnTo) => {
    const baseUrl = `https://mixin.one/pay/3c2bf6e7-fa74-4764-a4f3-79a24fab814f`;
    const params = {
      asset,
      amount,
      memo,
      trace: uuid(),
      return_to: returnTo
    };
    const query = qs.stringify(params);
    return `${baseUrl}?${query}`;
  };
  const useClickBuyButton = async (count) => {
    const client = useUserClient($message, t);
    loading.value = true;
    await fetchAppProperty(client);

    const amount = Number(appProperty.value.price) * count;
    const memo = base64RawURLEncode(JSON.stringify({
      u: userInfo.value.user_id,
      e: 'buy mixin app',
    }));
    window.location.href = generateMixinPayUrl(appProperty.value.asset_id, amount, memo, window.location.href);
  };

  return {
    show,
    loading,
    useClickBuyButton,
    useCloseBuyModal,
    useCheckCredit,
  };
});
