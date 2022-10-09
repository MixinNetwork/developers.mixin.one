import { computed, inject, ref } from 'vue';
import { defineStore } from 'pinia';
import { useI18n } from 'vue-i18n';
import { v4 as uuid, validate } from 'uuid';
import { useConfirmModalStore } from '@/stores/modals/confirm';
import { ls } from '@/utils';
import { useBotClient } from '@/api';

export const useWithdrawalModalStore = defineStore('withdrawal', () => {
  const $message = inject('$message');
  const { t } = useI18n();
  const { useInitConfirm } = useConfirmModalStore();

  const loading = ref(false);
  const show = ref(false);
  const asset = ref({});
  const appId = ref('');
  const onSuccess = ref(undefined);

  const amount = ref('');
  const pin = ref('');
  const opponent_id = ref('');
  const transactionInfo = ref({});

  const confirmContent = computed(() => t('wallet.withdrawal_confirm', {
    amount: amount.value,
    token: asset.value.symbol,
    opponent: opponent_id.value,
  }));
  const showSnapshot = computed(() => JSON.stringify(transactionInfo.value) !== '{}');

  const useInitWithdrawal = (item, id, success) => {
    show.value = true;
    asset.value = item;
    appId.value = id;
    onSuccess.value = success;
  };
  const useClearWithdrawal = () => {
    loading.value = false;
    show.value = false;
    asset.value = {};
    appId.value = '';

    amount.value = '';
    pin.value = '';
    opponent_id.value = '';
    transactionInfo.value = {};
    onSuccess.value = undefined;
  };

  const useCheckPin = () => !!pin.value && pin.value.length === 6 && parseInt(pin.value, 10) > 100000;
  const useSearchUserId = async (client) => {
    const is_uuid = validate(opponent_id.value);
    try {
      const res = is_uuid
        ? { user_id: opponent_id.value }
        : await client.user.search(opponent_id.value);
      return res;
    } catch (e) {
      $message.error({ message: t('message.errors.mixin_id'), showClose: true });
      return e;
    }
  };
  const useSubmitWithdrawal = async () => {
    const clientInfo = ls.get(appId.value);
    const client = useBotClient($message, t, clientInfo, () => {
      loading.value = false;
    });
    const is_transfers = !opponent_id.value.startsWith('XIN');
    const type = is_transfers ? 'transfer' : 'raw';

    loading.value = true;
    let opponent = { opponent_key: opponent_id.value };
    if (is_transfers) {
      const res = await useSearchUserId(client);
      if (!res || !res.user_id) return;
      opponent = { opponent_id: res.user_id };
    }

    const params = {
      amount: amount.value,
      asset_id: asset.value.asset_id,
      pin: pin.value,
      trace_id: uuid(),
      ...opponent,
    };

    const res = is_transfers
      ? await client.transfer.toUser(params.pin, params)
      : await client.transfer.toAddress(params.pin, params);
    loading.value = false;

    if (res && res.type === type) {
      $message.success({
        message: t('message.success.withdrawal'),
        showClose: true,
      });
      transactionInfo.value = res;
    }
  };

  const useClickSubmit = async () => {
    if (!useCheckPin()) {
      $message.error({
        message: t('message.errors.pin_token_format'),
        showClose: true,
      });
      return;
    }
    if (!opponent_id.value) {
      $message.error({
        message: t('message.errors.mixin_id'),
        showClose: true,
      });
      return;
    }

    useInitConfirm(confirmContent.value, useSubmitWithdrawal);
  };
  const useClickCancel = () => {
    if (showSnapshot.value) onSuccess.value();
    useClearWithdrawal();
  };

  return {
    loading,
    show,
    asset,
    amount,
    pin,
    opponent_id,
    transactionInfo,
    showSnapshot,
    useInitWithdrawal,
    useClickSubmit,
    useClickCancel,
  };
});
