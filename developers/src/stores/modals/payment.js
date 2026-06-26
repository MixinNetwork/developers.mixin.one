import { inject, ref } from 'vue';
import { defineStore } from 'pinia';
import { useI18n } from 'vue-i18n';

export const usePaymentModalStore = defineStore('payment', () => {
  const $message = inject('$message');
  const { t } = useI18n();

  const show = ref(false);
  const title = ref('');
  const description = ref('');
  const mixpayUrl = ref('');
  const mixinOneUrl = ref('');

  const useInitPaymentModal = ({
    title: nextTitle = '',
    description: nextDescription = '',
    mixpayUrl: nextMixpayUrl = '',
    mixinOneUrl: nextMixinOneUrl = '',
  }) => {
    title.value = nextTitle;
    description.value = nextDescription;
    mixpayUrl.value = nextMixpayUrl;
    mixinOneUrl.value = nextMixinOneUrl;
    show.value = true;
  };

  const useClearPaymentModal = () => {
    show.value = false;
    title.value = '';
    description.value = '';
    mixpayUrl.value = '';
    mixinOneUrl.value = '';
  };

  const useClosePaymentModal = () => {
    useClearPaymentModal();
  };

  const useSelectPaymentChannel = (channel) => {
    const isMixPay = channel === 'mixpay';
    const url = isMixPay ? mixpayUrl.value : mixinOneUrl.value;
    window.location.href = url;
  };

  return {
    show,
    title,
    description,
    mixpayUrl,
    mixinOneUrl,
    useInitPaymentModal,
    useClosePaymentModal,
    useSelectPaymentChannel,
  };
});
