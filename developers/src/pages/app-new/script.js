import { defineAsyncComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import DHeader from '@/components/DHeader';

export default {
  name: 'app-container',
  components: {
    DHeader,
    AppInformation: defineAsyncComponent(() => import('../app-container/app-information')),
  },
  async setup() {
    const { t } = useI18n();

    const router = useRouter();
    const backward = () => {
      router.push({
        path: '/dashboard',
      });
    };

    return {
      backward,
      t,
    };
  },
};
