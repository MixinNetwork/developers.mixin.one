import {
  computed,
  ref,
  reactive,
  toRefs,
  watch,
  inject,
  onActivated,
  onMounted,
} from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { ElTooltip } from 'element-plus';
import { useConfirmModalStore, useLayoutStore, useLoadStore } from '@/stores';
import { useUserClient } from '@/api';
import MInput from './input.vue';
import Croppie from './croppie.vue';
import CategorySelect from './select.vue';

export default {
  name: 'app-form',
  components: {
    MInput, Croppie, CategorySelect, ElTooltip,
  },
  props: {
    appId: String,
  },
  setup(props) {
    const { t } = useI18n();
    const $message = inject('$message');
    const croppie = ref(null);
    const router = useRouter();

    const { fetchAppList, fetchAppProperty } = useLayoutStore();
    const { modifyLocalLoadingStatus } = useLoadStore();
    const { useInitConfirm } = useConfirmModalStore();

    const state = reactive({
      toggle_app: 0,
      submitting: false,
      showConfirmModal: false,
      app: {},
      category: 'OTHER',
      resource_patterns: '',
      isImmersive: false,
      isEncrypted: false,
      encryptionAvailable: false,
    });

    const useInitApp = (app) => {
      state.toggle_app++;
      state.app = app;
      state.category = app.category || 'OTHER';
      state.resource_patterns = app.resource_patterns ? app.resource_patterns.join('\n') : '';
      state.isImmersive = app.capabilities ? app.capabilities.includes('IMMERSIVE') : false;
      state.isEncrypted = app.capabilities ? app.capabilities.includes('ENCRYPTED') : false;
      state.encryptionAvailable = app.session_secret ? Buffer.from(app.session_secret, 'base64').length === 32 : false;
    };

    const client = useUserClient($message, t);
    const useFetchApp = async (appId) => {
      appId = appId || props.appId;
      if (appId) {
        modifyLocalLoadingStatus(true);
        const app = await client.app.fetch(appId);
        modifyLocalLoadingStatus(false);
        return app;
      }
      return {};
    };

    const isValidUrl = (url) => /^http(s)?:\/\//.test(url);
    const isValidAppName = computed(() => !!state.app.name && state.app.name.length >= 2 && state.app.name.length <= 64);
    const isValidHomeUri = computed(() => !!state.app.home_uri && isValidUrl(state.app.home_uri));
    const isValidRedirectUri = computed(() => !!state.app.redirect_uri && isValidUrl(state.app.redirect_uri));
    const isValidDescription = computed(() => !!state.app.description && state.app.description.length >= 16 && state.app.description.length <= 128);
    const allowSubmit = computed(() => isValidAppName.value && isValidHomeUri.value && isValidRedirectUri.value && isValidDescription.value);

    const useNotice = (message) => $message.error({ message: t(`information.errors.${message}`), showClose: true });
    // eslint-disable-next-line consistent-return
    const useCheckForm = () => {
      if (!state.app.name) return useNotice('no_app_name');
      if (state.app.name.length < 2 || state.app.name.length > 64) return useNotice('app_name_length');
      if (!state.app.home_uri) return useNotice('no_home_uri');
      if (!isValidUrl(state.app.home_uri)) return useNotice('home_uri_illegal');
      if (!state.app.redirect_uri) return useNotice('no_redirect_uri');
      if (!isValidUrl(state.app.redirect_uri)) return useNotice('redirect_uri_illegal');
      if (!state.app.description) return useNotice('no_description');
      if (state.app.description.length < 16 || state.app.description.length > 128) return useNotice('description_length');
    };

    const useSubmit = async () => {
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
        category: state.category,
        home_uri: state.app.home_uri,
        redirect_uri: state.app.redirect_uri,
        description: state.app.description,
        resource_patterns,
        capabilities,
      };

      state.submitting = true;
      modifyLocalLoadingStatus(true);
      const res = props.appId
        ? await client.app.update(props.appId, params)
        : await client.app.create(params);
      state.submitting = false;
      modifyLocalLoadingStatus(false);

      if (res && res.type === 'app') {
        $message.success({ message: t('message.success.save'), showClose: true });
        useInitApp(res);
        await fetchAppList(client);
        await fetchAppProperty(client);
        await router.push({
          path: `/apps/${res.app_number}`,
          hash: '#information',
        });
      }
    };

    const useClickEncryption = () => {
      if (!state.encryptionAvailable) return;
      if (state.app.capabilities.includes('ENCRYPTED')) return;
      if (state.isEncrypted) {
        state.isEncrypted = false;
        return;
      }

      useInitConfirm(
        t('information.encrypted_confirm'),
        () => { state.isEncrypted = true; },
      );
    };
    const useClickSubmit = async () => {
      if (!allowSubmit.value) {
        useCheckForm();
        return;
      }
      if (state.submitting) {
        $message.error({ message: 'message.errors.saving' });
        return;
      }

      await useSubmit();
    };

    onMounted(async () => {
      const app = await useFetchApp();
      useInitApp(app);
    });

    onActivated(async () => {
      const app = await useFetchApp();
      useInitApp(app);
    });

    watch(() => props.appId, async (appId) => {
      const app = await useFetchApp(appId);
      useInitApp(app);
    });

    return {
      croppie,
      ...toRefs(state),
      allowSubmit,
      useClickEncryption,
      useClickSubmit,
      t,
    };
  },

};
