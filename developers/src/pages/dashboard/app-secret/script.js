import { getED25519KeyPair } from '@mixin.dev/mixin-node-sdk';
import {
  toRefs,
  reactive,
  inject,
  watch,
  onActivated,
} from 'vue';
import { useStorage, useClipboard } from '@vueuse/core';
import { useI18n } from 'vue-i18n';
import FileSaver from 'file-saver';
import DModal from '@/components/DModal';
import UpdateToken from '@/components/UpdateToken';
import Confirm from '@/components/Confirm';
import { randomPin } from '@/utils';
import { useClient } from '@/api';

export default {
  name: 'app-information',
  components: {
    DModal, UpdateToken, Confirm,
  },
  props: {
    app: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  setup(props) {
    const $message = inject('$message');
    const { t } = useI18n();

    const state = reactive({
      loading: false,
      submitting: false,
      confirmContent: '',
      modalTitle: '',
      modalContent: '',
      showUpdateToken: false,
      action: '',
    });

    const tokenInfo = useStorage('token', {});
    const userClient = useClient(tokenInfo.value);
    const useCheckKeystore = (keystore) => keystore && keystore.user_id && keystore.pin_token && keystore.private_key && keystore.session_id;

    const useUpdateSecret = async () => {
      if (state.submitting) {
        $message.error({ message: t('message.errors.reset'), showClose: true });
        return;
      }
      state.loading = true;
      state.submitting = true;

      try {
        const res = await userClient.app.updateSecret(props.app.app_id);
        $message.success({ message: t('message.success.reset'), showClose: true });
        state.modalTitle = t('secret.secret_title');
        state.modalContent = res.app_secret;
      } finally {
        state.submitting = false;
        state.loading = false;
      }
    };
    const useUpdateSession = async () => {
      if (state.submitting) {
        $message.error({ message: t('message.errors.reset'), showClose: true });
        return;
      }
      state.submitting = true;
      state.loading = true;

      try {
        const pin = randomPin();
        const { publicKey: session_secret, privateKey } = getED25519KeyPair();
        const res = await userClient.app.updateSession(props.app.app_id, pin, session_secret);
        $message.success({ message: t('message.success.reset'), showClose: true });

        state.modalTitle = t('secret.session_title');
        state.modalContent = JSON.stringify({
          pin,
          client_id: props.app.app_id,
          session_id: res.session_id,
          pin_token: res.pin_token_base64,
          private_key: privateKey,
        }, null, ' ');
        const clientInfo = useStorage(props.app.app_id, {});
        clientInfo.value = null;
      } finally {
        state.submitting = false;
        state.loading = false;
      }
    };
    const useRequestQRCode = async (isShow) => {
      const clientInfo = useStorage(props.app.app_id, {}).value;
      if (!useCheckKeystore(clientInfo)) {
        state.showUpdateToken = true;
        return;
      }

      if (state.submitting) {
        $message.error({ message: t('message.errors.reset'), showClose: true });
        return;
      }

      const appClient = useClient(clientInfo);

      state.loading = true;
      state.submitting = true;
      _vm.skipInterceptor = true;
      try {
        const res = isShow ? await appClient.user.profile() : await appClient.user.rotateCode();

        if (!res) {
          clientInfo.value = null;
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
        state.loading = false;
        _vm.skipInterceptor = false;
      }
    };
    const useDownloadKeystore = () => {
      const { app_number } = props.app;

      const blob = new Blob(
        [state.modalContent],
        { type: 'text/plain;charset=utf-8' },
      );
      FileSaver.saveAs(blob, `keystore-${app_number}.json`);
    };

    const useDoubleCheck = async (type) => {
      switch (type) {
        case 'ShowQRCode':
          state.action = 'ShowQRCode';
          await useRequestQRCode(true);
          break;
        case 'RotateQRCode':
          state.confirmContent = t('secret.rotate_qrcode_question');
          state.action = 'RotateQRCode';
          break;
        case 'UpdateSecret':
          state.confirmContent = t('secret.secret_question');
          state.action = 'UpdateSecret';
          break;
        case 'UpdateSession':
          state.confirmContent = t('secret.session_question');
          state.action = 'UpdateSession';
          break;
        default:
          break;
      }
    };
    const useConfirm = async () => {
      switch (state.action) {
        case 'RotateQRCode':
          await useRequestQRCode(false);
          break;
        case 'UpdateSecret':
          await useUpdateSecret();
          break;
        case 'UpdateSession':
          await useUpdateSession();
          break;
        default:
          break;
      }
    };

    const useInitStatus = () => {
      state.modalTitle = '';
      state.modalContent = '';
      state.confirmContent = '';
      state.action = '';
    };
    const useCloseModal = () => {
      useInitStatus();
    };
    const useCloseConfirmModal = () => {
      state.confirmContent = '';
    };

    const { copy, copied, isSupported } = useClipboard();
    const useClickCopy = async () => {
      if (!isSupported) {
        $message.error({ message: t('message.errors.copy'), showClose: true });
        return;
      }
      await copy(state.modalContent);
    };

    watch(copied, () => {
      if (copied.value) $message.success({ message: t('message.success.copy'), showClose: true });
    });
    onActivated(() => {
      useInitStatus();
    });

    return {
      ...toRefs(state),
      useRequestQRCode,
      useDoubleCheck,
      useConfirm,
      useDownloadKeystore,
      useCloseModal,
      useCloseConfirmModal,
      useClickCopy,
      t,
    };
  },
};
