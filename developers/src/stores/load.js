import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useLoadStore = defineStore('load', () => {
  const globalLoading = ref(false);
  const localLoading = ref(false);

  const modifyGlobalLoadingStatus = (status) => {
    globalLoading.value = status;
  };

  const modifyLocalLoadingStatus = (status) => {
    localLoading.value = status;
  };

  return {
    globalLoading,
    localLoading,
    modifyGlobalLoadingStatus,
    modifyLocalLoadingStatus,
  };
});
