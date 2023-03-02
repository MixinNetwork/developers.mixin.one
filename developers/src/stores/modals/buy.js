import { ref, inject, computed } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { v4 as uuid } from 'uuid';
import { useUserClient } from '@/api';
import { useLayoutStore } from '../layout';

export const useBuyModalStore = defineStore('buy-app', () => {
  const $message = inject('$message');
  const { t } = useI18n();
  const router = useRouter();

  const dataStore = useLayoutStore();
  const { appProperty, appList } = storeToRefs(dataStore);
  const { fetchAppProperty } = dataStore;

  const show = ref(false);
  const loading = ref(false);
  const showDebtTip = computed(() => appList.value.length > appProperty.value.count);

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
  const useClickBuyButton = async (count) => {
    const client = useUserClient($message, t);
    loading.value = true;
    await fetchAppProperty(client);

    const debtCount = Math.max(0, appList.value.length - appProperty.value.count);
    const amount = Number(appProperty.value.price) * (count + debtCount);

    const trace = uuid();
    // eslint-disable-next-line max-len
    window.location.href = `https://mixin.one/pay?recipient=fbd26bc6-3d04-4964-a7fe-a540432b16e2&asset=c94ac88f-4671-3976-b60a-09064f1811e8&amount=${amount}&trace=${trace}&memo=PAY_FOR_APP`;
  };

  return {
    show,
    loading,
    showDebtTip,
    useClickBuyButton,
    useCloseBuyModal,
    useCheckCredit,
  };
});
