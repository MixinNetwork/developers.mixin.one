import { useI18n } from 'vue-i18n';

export default {
  name: 'dashboard-container',
  emits: ['click-new-app'],
  async setup(props, ctx) {
    const { t } = useI18n();

    const useClickNewApp = async () => {
      ctx.emit('click-new-app');
    };

    return {
      useClickNewApp,
      t,
    };
  },
};
