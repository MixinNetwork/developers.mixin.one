import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useSecretModalStore = defineStore('secret', () => {
  const showSecret = ref(false);
  const secretTitle = ref('');
  const secretContent = ref('');
  const type = ref('');

  const useInitSecret = (status, title, content, action) => {
    showSecret.value = status;
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

  return {
    showSecret,
    secretTitle,
    secretContent,
    type,
    useInitSecret,
    useClearSecret,
  };
});
