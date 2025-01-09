import { toRefs, reactive, inject, watch, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import forge from 'node-forge';
import {
  useLoadStore,
  useConfirmModalStore,
  useSecretModalStore,
  useUpdateTokenModalStore,
  useRegisterModalStore,
} from '@/stores';
import { ls } from '@/utils';
import { useUserClient, useBotClient } from '@/api';

export default {
  name: 'app-secret',
  props: {
    appId: String,
  },
  setup(props) {
    const $message = inject('$message');
    const { t } = useI18n();

    const { modifyLocalLoadingStatus } = useLoadStore();
    const { useInitConfirm } = useConfirmModalStore();
    const { useInitRegister } = useRegisterModalStore();
    const { useInitSecret } = useSecretModalStore();
    const { useInitUpdateToken } = useUpdateTokenModalStore();

    const state = reactive({
      submitting: false,
      app: undefined,
      bill: undefined,
    });
    const keyConfig = computed(() => ({
      showBtn: state.app && !state.app.has_safe,
      text: state.app && state.app.has_safe ? t('secret.key_registered_content') : t('secret.key_content')
    }));

    const userClient = useUserClient($message, t);
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
        useInitSecret(t('secret.secret_title'), res.app_secret, 'UpdateSecret');
      }
    };
    const useUpdateSafeSession = async () => {
      if (state.submitting) {
        $message.error({ message: t('message.errors.reset'), showClose: true });
        return;
      }

      state.submitting = true;
      modifyLocalLoadingStatus(true);
      const seed = Buffer.from(forge.random.getBytesSync(32), 'binary');
      const keypair = forge.pki.ed25519.generateKeyPair({ seed });
      const res = await userClient.app.updateSafeSession(props.appId, {
        session_public_key: keypair.publicKey.toString('hex'),
      });
      state.submitting = false;
      modifyLocalLoadingStatus(false);

      if (res && res.session_id && res.server_public_key) {
        $message.success({ message: t('message.success.reset'), showClose: true });
        ls.rm(props.appId);

        const session = JSON.stringify({
          app_id: props.appId,
          session_id: res.session_id,
          server_public_key: res.server_public_key,
          session_private_key: seed.toString('hex'),
        }, null, 2);
        useInitSecret(t('secret.session_title'), session, 'UpdateSession');
      }
    };
    const useRotateCode = async () => {
      const clientInfo = ls.get(props.appId);
      if (!useCheckKeystore(clientInfo)) {
        useInitUpdateToken(props.appId, () => {
          useRotateCode();
        });
        return;
      }

      if (state.submitting) {
        $message.error({ message: t('message.errors.reset'), showClose: true });
        return;
      }

      const appClient = useBotClient($message, t, clientInfo);

      modifyLocalLoadingStatus(true);
      state.submitting = true;
      const res = await appClient.user.rotateCode();
      state.submitting = false;
      modifyLocalLoadingStatus(false);

      if (!res.code_url) return;
      useInitSecret(t('secret.qrcode_title'), res.code_url, '');
    };

    const useDoubleCheck = async (type) => {
      switch (type) {
        case 'RotateQRCode':
          useInitConfirm(
            t('secret.rotate_qrcode_question'),
            useRotateCode,
          );
          break;
        case 'UpdateSecret':
          useInitConfirm(
            t('secret.secret_question'),
            useUpdateSecret,
          );
          break;
        case 'UpdateSafeSession':
          useInitConfirm(
            t('secret.session_question'),
            useUpdateSafeSession,
          );
          break;
        case 'RegisterSafe':
          if (state.submitting) {
            $message.error({ message: t('message.errors.reset'), showClose: true });
            return;
          }
          useInitRegister(userClient, state.app.user_id);
        default:
          break;
      }
    };
    const useShowCodeUrl = async () => {
      modifyLocalLoadingStatus(true);
      state.submitting = true;
      const user = await userClient.user.fetch(props.appId);
      state.submitting = false;
      modifyLocalLoadingStatus(false);

      if (!user.code_url) return;
      useInitSecret(t('secret.qrcode_title'), user.code_url, '');
    }

    const useFetchApp = async (appId) => {
      appId = appId || props.appId;
      if (appId) {
        modifyLocalLoadingStatus(true);
        const app = await userClient.user.fetch(appId);
        modifyLocalLoadingStatus(false);
        return app;
      }
      return {};
    };
    watch(() => props.appId, async (appId) => {
      state.app = await useFetchApp(appId);
    }, { immediate: true });


    const useFetchAppBilling = async (appId) => {
      appId = appId || props.appId;
      if (appId) {
        const bill = await userClient.app.billing(appId);
        return bill;
      }
      return {};
    };
    watch(() => props.appId, async (appId) => {
      state.bill = await useFetchAppBilling(appId);
    }, { immediate: true });

    return {
      ...toRefs(state),
      keyConfig,
      useDoubleCheck,
      useShowCodeUrl,
      t,
    };
  },
};
