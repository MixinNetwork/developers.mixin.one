import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useRegisterModalStore = defineStore('Register', () => {
  const showRegister = ref(false);
  const client = ref(undefined);
  const appId = ref('');

  const useInitRegister = (c, id) => {
    showRegister.value = true;
    client.value = c;
    appId.value = id;
  };

  const useClearRegister = () => {
    showRegister.value = false;
    client.value = undefined;
    appId.value = '';
  };

  const useCloseModal = () => {
    useClearRegister();
  };

  return {
    showRegister,
    client,
    appId,
    useInitRegister,
    useClearRegister,
    useCloseModal,
  };
});
