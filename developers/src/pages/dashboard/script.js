import { useI18n } from 'vue-i18n';
import {useStore} from "vuex";

export default {
  name: 'dashboard-container',
  async setup(props, ctx) {
    const { t } = useI18n();
    const store = useStore();

    const useClickNewApp = async () => {
      store.commit('modifyClickedNewApp', true);
    };

    return {
      useClickNewApp,
      t,
    };
  },
};
