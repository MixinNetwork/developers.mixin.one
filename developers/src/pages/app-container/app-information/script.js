import {
  computed,
  ref,
  reactive,
  toRefs,
  watch,
  inject,
  onActivated,
} from 'vue';
import { useI18n } from 'vue-i18n';
import Confirm from '@/components/Confirm';
import {
  useApp,
  useClient,
  useCreateApp,
  useUpdateApp,
} from '@/api';
import MInput from './input.vue';
import Croppie from './croppie.vue';
import CategorySelect from './select.vue';

export default {
  name: 'app-information',
  components: {
    MInput, Croppie, CategorySelect, Confirm,
  },
  props: {
    appId: String,
  },
  emits: ['loading', 'add-new-app', 'set-app-name'],
  async setup(props, ctx) {
    const { t } = useI18n();
    const $message = inject('$message');
    const croppie = ref(null);

    const state = reactive({
      toggle_app: 0,
      submitting: false,
      showConfirmModal: false,
      app: {},
      resource_patterns: '',
      isImmersive: false,
      isEncrypted: false,
      hasEncrypted: false,
    });

    const initApp = (app) => {
      state.toggle_app++;
      state.app = app;
      state.resource_patterns = app.resource_patterns ? app.resource_patterns.join('\n') : '';
      state.isImmersive = app.capabilities ? app.capabilities.includes('IMMERSIVE') : false;
      state.isEncrypted = app.capabilities ? app.capabilities.includes('ENCRYPTED') : false;
      state.hasEncrypted = app.session_secret ? Buffer.from(app.session_secret, 'base64').length === 32 : false;
    };

    const client = useClient($message, t);
    const useFetchApp = async (appId) => {
      appId = appId || props.appId;
      if (appId) {
        ctx.emit('loading', true);
        const app = await useApp(client, appId);
        ctx.emit('set-app-name', app.name);
        ctx.emit('loading', false);
        return app;
      }
      return {};
    };

    onActivated(async () => {
      const app = await useFetchApp();
      initApp(app);
    });

    const isValidUrl = (url) => /^http(s)?:\/\//.test(url);
    const isValidAppName = computed(() => state.app.name && state.app.name.length >= 2 && state.app.name.length <= 64);
    const isValidHomeUri = computed(() => state.app.home_uri && isValidUrl(state.app.home_uri));
    const isValidRedirectUri = computed(() => state.app.redirect_uri && isValidUrl(state.app.redirect_uri));
    const isValidDescription = computed(() => state.app.description && state.app.description.length >= 16 && state.app.description.length <= 128);
    const allowSubmit = computed(() => isValidAppName && isValidHomeUri && isValidRedirectUri && isValidDescription);

    const noticeMessage = (message) => $message.error({ message: t(`information.errors.${message}`), showClose: true });
    // eslint-disable-next-line consistent-return
    const notice = () => {
      if (!state.app.name) return noticeMessage('no_app_name');
      if (state.app.name.length < 2 || state.app.name.length > 64) return noticeMessage('app_name_length');
      if (!state.app.home_uri) return noticeMessage('no_home_uri');
      if (!isValidUrl(state.app.home_uri)) return noticeMessage('home_uri_illegal');
      if (!state.app.redirect_uri) return noticeMessage('no_redirect_uri');
      if (!isValidUrl(state.app.redirect_uri)) return noticeMessage('redirect_uri_illegal');
      if (!state.app.description) return noticeMessage('no_description');
      if (state.app.description.length < 16 || state.app.description.length > 128) return noticeMessage('description_length');
    };

    const submit = async () => {
      const capabilities = ['CONTACT', 'GROUP'];
      if (state.isImmersive) capabilities.push('IMMERSIVE');
      if (state.isEncrypted) capabilities.push('ENCRYPTED');

      let icon_base64 = await croppie.value.crop();
      icon_base64 = icon_base64 ? icon_base64.substring(icon_base64.indexOf(',') + 1) : '';

      let { resource_patterns } = state;
      resource_patterns = resource_patterns || '';
      resource_patterns = resource_patterns.replace(/\r\n/g, '\n');
      resource_patterns = resource_patterns.split('\n').map((r) => r.trim()).filter((r) => !!r);

      const params = {
        icon_base64,
        name: state.app.name,
        category: state.app.category,
        home_uri: state.app.home_uri,
        redirect_uri: state.app.redirect_uri,
        description: state.app.description,
        resource_patterns,
        capabilities,
      };

      state.submitting = true;
      ctx.emit('loading', true);
      try {
        const res = props.appId
          ? await useUpdateApp(client, props.appId, params)
          : await useCreateApp(client, params);
        if (res && res.type === 'app') {
          $message.success({ message: t('message.success.save'), showClose: true });
          ctx.emit('add-new-app', res.app_number);
          initApp(res);
        }
      } finally {
        state.submitting = false;
        ctx.emit('loading', false);
      }
    };
    const closeModal = () => {
      state.showConfirmModal = false;
    };
    const useClickEncryption = () => {
      if (state.app.capabilities.includes('ENCRYPTED')) return;
      if (state.isEncrypted) {
        state.isEncrypted = false;
        return;
      }
      state.showConfirmModal = true;
    };
    const useConfirmEncryption = () => {
      state.isEncrypted = true;
      closeModal();
    };
    const useClickSubmit = async () => {
      if (!allowSubmit) {
        notice();
        return;
      }
      if (state.submitting) {
        $message.error({ message: 'message.errors.saving' });
        return;
      }

      await submit();
    };

    watch(() => props.appId, async (appId) => {
      const app = await useFetchApp(appId);
      initApp(app);
    });

    return {
      croppie,
      ...toRefs(state),
      allowSubmit,
      useClickEncryption,
      useConfirmEncryption,
      useClickSubmit,
      closeModal,
      t,
    };
  },

};
