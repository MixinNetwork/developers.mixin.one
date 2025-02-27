import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useRegisterModalStore = defineStore('Register', () => {
  const showRegister = ref(false);
  const client = ref(undefined);
  const appId = ref('');
  const step = ref(1);

  const useInitRegister = (c, id) => {
    showRegister.value = true;
    client.value = c;
    appId.value = id;
    step.value = 1;
  };

  const useClearRegister = () => {
    showRegister.value = false;
    client.value = undefined;
    appId.value = '';
    step.value = 1;
  };

  const useCloseModal = () => {
    useClearRegister();
  };

  return {
    showRegister,
    step,
    client,
    appId,
    useInitRegister,
    useClearRegister,
    useCloseModal,
  };
});
