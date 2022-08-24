<template>
  <d-modal :show="showUpdate">
    <div class="main modal">
      <h3>{{ t('wallet.update_token') }}</h3>
      <div class="edit-item">
        <label>Session ID</label>
        <input v-model="session_id" />
      </div>
      <div class="edit-item">
        <label>Pin Token</label>
        <input v-model="pin_token" />
      </div>
      <div class="edit-item">
        <label>Private Key</label>
        <textarea v-model="private_key"></textarea>
      </div>
      <div class="edit-item intro-container">
        <label></label>
        <div class="intro">{{ t('wallet.secret_intro') }}</div>
      </div>
      <div class="btns">
        <button
          @click="useClickSubmit"
          class="btns-save primary"
        >
          {{ t('button.save') }}
        </button>
        <button
          @click="useClickCancel"
          class="btns-cancel primary"
        >
          {{ t('button.cancel') }}
        </button>
      </div>
      <img
        class="iconguanbi"
        src="@/assets/img/svg/close.svg"
        alt="close-icon"
        @click="useClickCancel" />
    </div>
  </d-modal>
</template>

<script>
import { reactive, toRefs } from 'vue';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import DModal from '@/components/Modals/DModal';
import { useUpdateTokenModalStore } from '@/stores';

export default {
  name: 'UpdateTokenModal',
  components: { DModal },
  setup() {
    const { t } = useI18n();
    const updateTokenStore = useUpdateTokenModalStore();
    const { showUpdate, onSubmit } = storeToRefs(updateTokenStore);
    const { useClearUpdateToken } = updateTokenStore;

    const state = reactive({
      session_id: '',
      pin_token: '',
      private_key: '',
    });

    const useClickCancel = () => {
      useClearUpdateToken();
    };
    const useClickSubmit = () => {
      onSubmit.value();
    };

    return {
      ...toRefs(state),
      showUpdate,
      useClickSubmit,
      useClickCancel,
      t,
    };
  },
};
</script>

<style scoped>

</style>
