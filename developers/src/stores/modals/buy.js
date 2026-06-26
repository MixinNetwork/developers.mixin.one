import { ref, inject } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useUserClient } from '@/api';
import {
  buildPaymentMemo,
  generateMixinOnePaymentUrl,
  generateMixPayUrl,
} from '@/utils';
import { useLayoutStore } from '../layout';
import { usePaymentModalStore } from './payment';

export const useBuyModalStore = defineStore('buy-app', () => {
  const $message = inject('$message');
  const { t } = useI18n();
  const router = useRouter();
  const { useInitPaymentModal } = usePaymentModalStore();

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

  const useClickBuyButton = async (count) => {
    const client = useUserClient($message, t);
    loading.value = true;

    try {
      await fetchAppProperty(client);

      const amount = Number(appProperty.value.price) * count;
      const memo = buildPaymentMemo({
        targetId: userInfo.value.user_id,
        event: 'buy mixin app',
      });

      useInitPaymentModal({
        title: t('payment.select_channel'),
        description: count === 1
          ? t('dashboard.buy.btn', { count })
          : t('dashboard.buy.btns', { count }),
        mixpayUrl: generateMixPayUrl({
          assetId: appProperty.value.asset_id,
          amount,
          memo,
          returnTo: window.location.href,
        }),
        mixinOneUrl: generateMixinOnePaymentUrl({
          assetId: appProperty.value.asset_id,
          amount,
          memo,
          returnTo: window.location.href,
        }),
      });
    } finally {
      loading.value = false;
    }
  };

  return {
    show,
    loading,
    useClickBuyButton,
    useCloseBuyModal,
    useCheckCredit,
  };
});
