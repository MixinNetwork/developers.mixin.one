import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useUpdateTokenModalStore = defineStore('update-token', () => {
  const showUpdate = ref(false);
  const appId = ref('');
  const onSubmit = ref(undefined);

  const useInitUpdateToken = (status, id, cb) => {
    showUpdate.value = status;
    appId.value = id;
    onSubmit.value = cb;
  };

  const useClearUpdateToken = () => {
    showUpdate.value = false;
    appId.value = '';
    onSubmit.value = undefined;
  };

  return {
    showUpdate,
    appId,
    onSubmit,
    useInitUpdateToken,
    useClearUpdateToken,
  };
});
