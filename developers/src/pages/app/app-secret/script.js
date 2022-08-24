import { getED25519KeyPair } from '@mixin.dev/mixin-node-sdk';
import { toRefs, reactive, inject } from 'vue';
import { useI18n } from 'vue-i18n';
import UpdateToken from '@/components/UpdateToken';
import { useConfirmModalStore, useLoadStore, useSecretModalStore } from '@/stores';
import { ls, randomPin } from '@/utils';
import { useClient } from '@/api';

export default {
  name: 'app-secret',
  components: { UpdateToken },
  props: {
    appId: String,
  },
  setup(props) {
    const $message = inject('$message');
    const { t } = useI18n();

    const { modifyLocalLoadingStatus } = useLoadStore();
    const { useInitConfirm } = useConfirmModalStore();
    const { useInitSecret } = useSecretModalStore();

    const state = reactive({
      submitting: false,
      showUpdateToken: false,
      action: '',
    });

    const userClient = useClient($message, t);
    const useCheckKeystore = (keystore) => keystore && keystore.user_id && keystore.pin_token && keystore.private_key && keystore.session_id;

    const useUpdateSecret = async () => {
      if (state.submitting) {
        $message.error({ message: t('message.errors.reset'), showClose: true });
        return;
      }

      modifyLocalLoadingStatus(true);
      state.submitting = true;
      const res = await userClient.app.updateSecret(props.appId);
      state.submitting = false;
      modifyLocalLoadingStatus(false);

      if (res && res.app_secret) {
        $message.success({ message: t('message.success.reset'), showClose: true });
        useInitSecret(true, t('secret.secret_title'), res.app_secret, 'UpdateSecret');
      }
    };
    const useUpdateSession = async () => {
      if (state.submitting) {
        $message.error({ message: t('message.errors.reset'), showClose: true });
        return;
      }

      state.submitting = true;
      modifyLocalLoadingStatus(true);
      const pin = randomPin();
      const { publicKey: session_secret, privateKey } = getED25519KeyPair();
      const res = await userClient.app.updateSession(props.appId, pin, session_secret);
      state.submitting = false;
      modifyLocalLoadingStatus(false);

      if (res && res.session_id && res.pin_token_base64) {
        $message.success({ message: t('message.success.reset'), showClose: true });
        ls.rm(props.appId);

        const session = JSON.stringify({
          pin,
          client_id: props.appId,
          session_id: res.session_id,
          pin_token: res.pin_token_base64,
          private_key: privateKey,
        }, null, 2);
        useInitSecret(true, t('secret.session_title'), session, 'UpdateSession');
      }
    };
    const useRequestQRCode = async (isShow) => {
      const clientInfo = ls.get(props.appId);
      if (!useCheckKeystore(clientInfo)) {
        state.showUpdateToken = true;
        return;
      }

      if (state.submitting) {
        $message.error({ message: t('message.errors.reset'), showClose: true });
        return;
      }

      const appClient = useClient($message, t, clientInfo, true);

      modifyLocalLoadingStatus(true);
      state.submitting = true;
      try {
        const res = isShow ? await appClient.user.profile() : await appClient.user.rotateCode();

        if (!res) {
          ls.rm(props.appId);
          state.showUpdateToken = true;
          return;
        }
        if (!res.code_url) {
          if (isShow) await useRequestQRCode(false);
          return;
        }

        state.modalTitle = t('secret.qrcode_title');
        state.modalContent = res.code_url;
      } finally {
        state.submitting = false;
        modifyLocalLoadingStatus(false);
      }
    };

    const useDoubleCheck = async (type) => {
      switch (type) {
        case 'ShowQRCode':
          state.action = 'ShowQRCode';
          await useRequestQRCode(true);
          break;
        case 'RotateQRCode':
          useInitConfirm(
            true,
            t('secret.rotate_qrcode_question'),
            async () => { await useRequestQRCode(false); },
          );
          break;
        case 'UpdateSecret':
          useInitConfirm(
            true,
            t('secret.secret_question'),
            async () => { await useUpdateSecret(); },
          );
          break;
        case 'UpdateSession':
          useInitConfirm(
            true,
            t('secret.session_question'),
            async () => { await useUpdateSession(); },
          );
          break;
        default:
          break;
      }
    };

    return {
      ...toRefs(state),
      useRequestQRCode,
      useDoubleCheck,
      t,
    };
  },
};
