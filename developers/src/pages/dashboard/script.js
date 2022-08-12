import { useI18n } from 'vue-i18n';
import { useLayoutStore } from '@/stores';

export default {
  name: 'dashboard-container',
  async setup() {
    const { t } = useI18n();
    const { modifyClickedNewApp } = useLayoutStore();

    const useClickNewApp = async () => {
      modifyClickedNewApp(true);
    };

    return {
      useClickNewApp,
      t,
    };
  },
};
