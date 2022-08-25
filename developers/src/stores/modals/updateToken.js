import { ref, inject } from 'vue';
import { defineStore } from 'pinia';
import { useI18n } from 'vue-i18n';
import validator from 'validator';
import { ls } from '@/utils';

export const useUpdateTokenModalStore = defineStore('update-token', () => {
  const { t } = useI18n();
  const $message = inject('$message');

  const show = ref(false);
  const appId = ref('');
  const onSubmit = ref(undefined);

  const session_id = ref('');
  const pin_token = ref('');
  const private_key = ref('');

  const useInitUpdateToken = (id, cb) => {
    show.value = true;
    appId.value = id;
    onSubmit.value = cb;
  };
  const useClearUpdateToken = () => {
    show.value = false;
    appId.value = '';
    onSubmit.value = undefined;
    session_id.value = '';
    pin_token.value = '';
    private_key.value = '';
  };

  const useCheckToken = () => {
    if (!validator.isUUID(session_id.value, 4)) {
      $message.error({
        message: t('message.errors.session_id_format'),
        showClose: true,
      });
      return false;
    }
    if (!validator.isBase64(pin_token.value) && Buffer.from(pin_token.value, 'base64').length !== 32) {
      $message.error({
        message: t('message.errors.pin_token_format'),
        showClose: true,
      });
      return false;
    }
    if (!validator.isBase64(private_key.value) && Buffer.from(private_key.value, 'base64').length !== 64) {
      $message.error({
        message: t('message.errors.private_key_format'),
        showClose: true,
      });
      return false;
    }
    return true;
  };
  const useSaveToken = () => {
    ls.set(appId.value, {
      user_id: appId.value,
      session_id: session_id.value,
      pin_token: pin_token.value,
      private_key: private_key.value.replace(/\\r\\n/g, '\r\n'),
    });
  };

  const useClickCancel = () => {
    useClearUpdateToken();
  };
  const useClickSubmit = () => {
    if (!useCheckToken()) return;
    useSaveToken();
    onSubmit.value();
    useClearUpdateToken();
  };

  return {
    show,
    appId,
    session_id,
    pin_token,
    private_key,
    useInitUpdateToken,
    useClickSubmit,
    useClickCancel,
  };
});
