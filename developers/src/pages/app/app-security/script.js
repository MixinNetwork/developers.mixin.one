import {
  computed,
  inject,
  reactive,
  toRefs,
  watch,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { useLoadStore } from '@/stores';
import { useUserClient } from '@/api';

const MAX_ENTRIES = 64;

export default {
  name: 'app-security',
  props: {
    appId: String,
  },
  setup(props) {
    const { t } = useI18n();
    const $message = inject('$message');
    const { modifyLocalLoadingStatus } = useLoadStore();
    const client = useUserClient($message, t);

    const state = reactive({
      allowed_ips: '',
      resource_patterns: '',
      submitting: false,
    });

    const splitLines = (value) => (value || '')
      .replace(/\r\n/g, '\n')
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => !!line);

    const allowedIpCount = computed(() => splitLines(state.allowed_ips).length);
    const resourcePatternCount = computed(() => splitLines(state.resource_patterns).length);

    const useInitSecurity = (app = {}) => {
      state.allowed_ips = Array.isArray(app.allowed_ips) ? app.allowed_ips.join('\n') : '';
      state.resource_patterns = Array.isArray(app.resource_patterns)
        ? app.resource_patterns.join('\n')
        : '';
    };

    const useFetchApp = async (appId) => {
      if (!appId) return {};
      modifyLocalLoadingStatus(true);
      try {
        return await client.app.fetch(appId);
      } finally {
        modifyLocalLoadingStatus(false);
      }
    };

    const useRefresh = async (appId = props.appId) => {
      const app = await useFetchApp(appId);
      useInitSecurity(app);
    };

    const useClickSubmit = async () => {
      if (state.submitting) {
        $message.error({ message: t('message.errors.saving'), showClose: true });
        return;
      }

      if (allowedIpCount.value > MAX_ENTRIES || resourcePatternCount.value > MAX_ENTRIES) {
        $message.error({ message: t('security.max_entries_error'), showClose: true });
        return;
      }

      const data = {
        allowed_ips: splitLines(state.allowed_ips),
        resource_patterns: splitLines(state.resource_patterns),
      };

      state.submitting = true;
      modifyLocalLoadingStatus(true);
      let app;
      try {
        app = await client.request({
          method: 'POST',
          url: `/apps/${props.appId}/security`,
          data,
        });
      } finally {
        state.submitting = false;
        modifyLocalLoadingStatus(false);
      }

      if (app) {
        useInitSecurity(app);
        $message.success({ message: t('message.success.save'), showClose: true });
      }
    };

    watch(() => props.appId, useRefresh, { immediate: true });

    return {
      ...toRefs(state),
      allowedIpCount,
      resourcePatternCount,
      useClickSubmit,
      t,
    };
  },
};
