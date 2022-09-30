import { ref, inject, watch } from 'vue';
import { useRoute } from 'vue-router';
import { defineStore } from 'pinia';
import { useI18n } from 'vue-i18n';
import { useClipboard } from '@vueuse/core';
import FileSaver from 'file-saver';

export const useSecretModalStore = defineStore('secret', () => {
  const $message = inject('$message');
  const { t } = useI18n();
  const route = useRoute();

  const showSecret = ref(false);
  const secretTitle = ref('');
  const secretContent = ref('');
  const type = ref('');

  const useInitSecret = (title, content, action) => {
    showSecret.value = true;
    secretTitle.value = title;
    secretContent.value = content;
    type.value = action;
  };

  const useClearSecret = () => {
    showSecret.value = false;
    secretTitle.value = '';
    secretContent.value = '';
    type.value = undefined;
  };

  const { copy, copied, isSupported } = useClipboard();
  const useClickCopy = async () => {
    if (!isSupported.value) {
      $message.error({ message: t('message.errors.copy'), showClose: true });
      return;
    }
    await copy(secretContent.value);
  };
  watch(copied, (newValue, oldValue) => {
    if (newValue && !oldValue) $message.success({ message: t('message.success.copy'), showClose: true });
  }, {
    flush: 'post'
  });

  const useClickDownload = () => {
    const { app_number } = route.params;

    const blob = new Blob(
      [secretContent.value],
      { type: 'text/plain;charset=utf-8' },
    );
    FileSaver.saveAs(blob, `keystore-${app_number}.json`);
  };

  const useCloseModal = () => {
    useClearSecret();
  };

  return {
    showSecret,
    secretTitle,
    secretContent,
    type,
    useInitSecret,
    useClearSecret,
    useClickCopy,
    useClickDownload,
    useCloseModal,
  };
});
