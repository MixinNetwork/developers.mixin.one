import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useUpdateTokenModalStore = defineStore('update-token', () => {
  const showUpdate = ref(false);
  const onSubmit = ref(undefined);

  const useInitUpdateToken = (status, cb) => {
    showUpdate.value = status;
    onSubmit.value = cb;
  };

  const useClearUpdateToken = () => {
    showUpdate.value = false;
    onSubmit.value = undefined;
  };

  return {
    showUpdate,
    onSubmit,
    useInitUpdateToken,
    useClearUpdateToken,
  };
});
