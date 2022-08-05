import {
  defineAsyncComponent,
} from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import DHeader from '@/components/DHeader';

export default {
  name: 'app-container',
  components: {
    DHeader,
    AppInformation: defineAsyncComponent(() => import('../app-container/app-information')),
  },
  emits: ['add-new-app', 'set-local-loading'],
  async setup(props, ctx) {
    const { t } = useI18n();

    const router = useRouter();
    const backward = () => {
      router.push({
        path: '/dashboard',
      });
    };

    const useNewAppSubmitted = (app_number) => {
      ctx.emit('add-new-app', app_number);
    };
    const useModifyLoading = (isLoading) => {
      ctx.emit('set-local-loading', isLoading);
    };

    return {
      useNewAppSubmitted,
      useModifyLoading,
      backward,
      t,
    };
  },
};
