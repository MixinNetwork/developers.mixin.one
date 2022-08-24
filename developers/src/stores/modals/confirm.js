import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useConfirmModalStore = defineStore('confirm', () => {
  const showConfirm = ref(false);
  const confirmContent = ref('');
  const confirmCallback = ref(undefined);

  const useInitConfirm = (status, content, cb) => {
    showConfirm.value = status;
    confirmContent.value = content;
    confirmCallback.value = cb;
  };

  const useClearConfirm = () => {
    showConfirm.value = false;
    confirmContent.value = '';
    confirmCallback.value = undefined;
  };

  return {
    showConfirm,
    confirmContent,
    confirmCallback,
    useInitConfirm,
    useClearConfirm,
  };
});
