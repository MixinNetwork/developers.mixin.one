import { ref } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useLayoutStore } from '../layout';

export const useBuyModalStore = defineStore('buy-app', () => {
  const showBuyModal = ref(false);
  const modalLoading = ref(false);

  const useModifyBuyModalStatus = (status) => {
    showBuyModal.value = status;
  };
  const useModifyBuyModalLoadingStatus = (status) => {
    modalLoading.value = status;
  };

  const layoutStore = useLayoutStore();
  const { appList, appProperty } = storeToRefs(layoutStore);

  const router = useRouter();
  const useCheckCredit = () => {
    if (appList.value.length >= appProperty.value.count) {
      showBuyModal.value = true;
      return;
    }

    router.push('/apps/new');
  };

  return {
    modalLoading,
    showBuyModal,
    useModifyBuyModalStatus,
    useModifyBuyModalLoadingStatus,
    useCheckCredit,
  };
});
