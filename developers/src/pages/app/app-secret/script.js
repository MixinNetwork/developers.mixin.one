import { toRefs, reactive, inject, watch, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { getED25519KeyPair, newHash, base64RawURLDecode } from '@mixin.dev/mixin-node-sdk';
import forge from 'node-forge';
import {
  useLoadStore,
  useConfirmModalStore,
  useSecretModalStore,
  useUpdateTokenModalStore,
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
    const { useInitSecret } = useSecretModalStore();
    const { useInitUpdateToken } = useUpdateTokenModalStore();

    const state = reactive({
      submitting: false,
      app: undefined,
    });
    const keyAction = computed(() => {
      // if (state.app.has_safe) return 'reset';
      // if (state.app.has_pin) return 'upgrade';
      return 'upgrade';
    })
    const keyModuleTexts = computed(() => {
      const title = t('secret.key_title');
      switch(keyAction.value) {
        case 'reset':
          return {
            title,
            content: t('secret.key_content_reset'),
            btn: t('secret.key_btn_generate'),
            confirm: t('secret.key_question_reset')
          }
        case 'upgrade':
          return {
            title,
            content: t('secret.key_content_upgrade'),
            btn: t('secret.key_btn_upgrade'),
            confirm: t('secret.key_question_upgrade')
          }
        case 'new':
        default:
          return {
            title,
            content: t('secret.key_content_new'),
            btn: t('secret.key_btn_generate'),
            confirm: t('secret.key_question_new')
          }
      }
    })

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
    const useUpdateSession = async () => {
      if (state.submitting) {
        $message.error({ message: t('message.errors.reset'), showClose: true });
        return;
      }

      state.submitting = true;
      modifyLocalLoadingStatus(true);
      const { publicKey: session_secret, privateKey } = getED25519KeyPair();
      const res = await userClient.app.updateSession(props.appId, pin, session_secret);
      state.submitting = false;
      modifyLocalLoadingStatus(false);

      if (res && res.session_id && res.pin_token_base64) {
        $message.success({ message: t('message.success.reset'), showClose: true });
        ls.rm(props.appId);

        const session = JSON.stringify({
          client_id: props.appId,
          session_id: res.session_id,
          private_key: privateKey,
          pin,
          pin_token: res.pin_token_base64,
        }, null, 2);
        useInitSecret(t('secret.session_title'), session, 'UpdateSession');
      }
    };
    const useUpdateSafeSession = async () => {
      if (state.submitting) {
        $message.error({ message: t('message.errors.reset'), showClose: true });
        return;
      }

      state.submitting = true;
      modifyLocalLoadingStatus(true);
      const { publicKey: spend_public_key, privateKey: spend_private_key } = getED25519KeyPair();
      const hash = newHash(Buffer.from(props.appId));
      let signData = forge.pki.ed25519.sign({
        message: hash,
        privateKey: base64RawURLDecode(spend_private_key),
      });
      const signature = base64RawURLEncode(signData);
      const public_hex = base64RawURLDecode(spend_public_key).toString("hex");

      const { publicKey: session_secret, privateKey: session_private_key } = getED25519KeyPair();
      const res = await userClient.app.updateSafeSession(props.appId, {
        public_hex,
        signature,
        session_secret
      });
      state.submitting = false;
      modifyLocalLoadingStatus(false);

      if (res && res.session_id && res.pin_token_base64) {
        $message.success({ message: t('message.success.reset'), showClose: true });
        ls.rm(props.appId);

        const session = JSON.stringify({
          client_id: props.appId,
          session_id: res.session_id,
          server_public_key: res.pin_token_base64,
          session_private_key,
          spend_private_key,
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
        case 'UpdateSession':
          useInitConfirm(
            t('secret.session_question'),
            useUpdateSession,
          );
        case 'UpdateSafeSession':
          useInitConfirm(
            keyModuleTexts.value.confirm,
            useUpdateSafeSession,
          );
          break;
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

    return {
      ...toRefs(state),
      useDoubleCheck,
      useShowCodeUrl,
      keyModuleTexts,
      t,
    };
  },
};
