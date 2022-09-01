import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useConfirmModalStore = defineStore('confirm', () => {
  const show = ref(false);
  const content = ref('');
  const onConfirm = ref(undefined);

  const useInitConfirm = (text, cb) => {
    show.value = true;
    content.value = text;
    onConfirm.value = cb;
  };
  const useClearConfirm = () => {
    show.value = false;
    content.value = '';
    onConfirm.value = undefined;
  };

  const useClickCancel = () => {
    useClearConfirm();
  };
  const useClickConfirm = () => {
    onConfirm.value();
    useClearConfirm();
  };

  return {
    show,
    content,
    onConfirm,
    useInitConfirm,
    useClickCancel,
    useClickConfirm,
  };
});
