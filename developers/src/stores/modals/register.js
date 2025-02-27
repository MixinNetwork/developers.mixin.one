import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useRegisterModalStore = defineStore('Register', () => {
  const showRegister = ref(false);
  const client = ref(undefined);
  const appId = ref('');
  const step = ref(1);
  const onSuccess = ref(undefined);

  const useInitRegister = (c, id, cb) => {
    showRegister.value = true;
    client.value = c;
    appId.value = id;
    step.value = 1;
    onSuccess.value = cb;
  };

  const useClearRegister = () => {
    showRegister.value = false;
    client.value = undefined;
    appId.value = '';
    step.value = 1;
    onSuccess.value = undefined;
  };

  const useCloseModal = () => {
    useClearRegister();
  };

  return {
    showRegister,
    step,
    client,
    appId,
    onSuccess,
    useInitRegister,
    useClearRegister,
    useCloseModal,
  };
});
