import { ref, inject } from 'vue';
import { useRoute } from 'vue-router';
import { defineStore } from 'pinia';
import { useI18n } from 'vue-i18n';
import ClipboardJS from 'clipboard';
import FileSaver from 'file-saver';
import { getMixinEnvironment } from '@/utils/tools';

export const useSecretModalStore = defineStore('secret', () => {
  const $message = inject('$message');
  const { t } = useI18n();
  const route = useRoute();

  const showSecret = ref(false);
  const secretTitle = ref('');
  const secretContent = ref('');
  const type = ref('');
  const clipboard = ref(undefined);

  const initCopyBtn = () => {
    clipboard.value = new ClipboardJS(
      '.btn-copy',
      {
        text: () => secretContent.value,
      },
    );
    clipboard.value.on('success', (e) => {
      e.clearSelection();
      return $message.success({ message: t('message.success.copy'), showClose: true });
    });
    clipboard.value.on('error', () => $message.error({ message: t('message.errors.copy'), showClose: true }));
  };

  const useInitSecret = (title, content, action) => {
    showSecret.value = true;
    secretTitle.value = title;
    secretContent.value = content;
    type.value = action;
    initCopyBtn();
  };

  const useClearSecret = () => {
    showSecret.value = false;
    secretTitle.value = '';
    secretContent.value = '';
    type.value = undefined;
    clipboard.value = undefined;
  };

  const useClickDownload = () => {
    const os = getMixinEnvironment();
    if (!!os) {
      $message.error({ message: t('message.errors.download'), showClose: true });
      return;
    }

    const { app_number } = route.params;

    const blob = new Blob(
      [secretContent.value],
      { type: 'text/plain;charset=utf-8' },
    );
    FileSaver.saveAs(blob, `keystore-${app_number}.json`);
  };

  const useCloseModal = () => {
    clipboard.value.destroy();
    useClearSecret();
  };

  return {
    showSecret,
    secretTitle,
    secretContent,
    type,
    useInitSecret,
    useClearSecret,
    useClickDownload,
    useCloseModal,
  };
});
