<template>
  <d-modal :show="showSecret">
    <div class="secret-modal">
      <h3 class="title">{{secretTitle}}</h3>
      <span
        :class="[
          'content',
          type === 'UpdateSession' ? 'session' : ''
        ]"
      >{{secretContent}}</span>
      <div class="button-container">
        <button v-if="type==='UpdateSecret'" @click="useCloseModal" class="cancel">{{t('button.cancel')}}</button>
        <button v-if="type==='UpdateSession'" @click="useClickDownload" class="cancel">{{t('button.download')}}</button>
        <button
          @click="useClickCopy"
          class="btn-copy primary"
        >{{t('button.copy')}}
        </button>
      </div>
      <img @click="useCloseModal" class="close-modal-button" src="@/assets/img/svg/close.svg" alt="modal-close-icon"/>
    </div>
  </d-modal>
</template>

<script>
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import DModal from '@/components/Modals/DModal';
import { useSecretModalStore } from '@/stores';

export default {
  name: 'secret-modal',
  components: { DModal },
  setup() {
    const { t } = useI18n();

    const secretStore = useSecretModalStore();
    const {
      showSecret,
      secretTitle,
      secretContent,
      type,
    } = storeToRefs(secretStore);
    const { useClickCopy, useClickDownload, useCloseModal } = secretStore;

    return {
      showSecret,
      secretTitle,
      secretContent,
      type,
      useClickCopy,
      useClickDownload,
      useCloseModal,
      t,
    };
  },
};
</script>

<style lang="scss" scoped>
.secret-modal {
  text-align: center;
  padding: 3.125rem 3.75rem;
  max-width: 38.5rem;

  .title {
    margin-bottom: 1.3125rem;
    font-size: 1rem;
  }

  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 5.125rem;
    padding: 1.625rem 1.25rem;
    text-align: left;
    line-height: 1rem;
    word-break: break-all;
    background-color: #f6f9ff;

    &.session {
      height: 12rem;
      overflow: auto;
    }
  }

  .button-container {
    display: flex;
    justify-content: flex-end;

    button {
      width: 8.75rem;
      height: 2.5rem;
      margin: 2rem 0.5625rem 0 0;
      font-size: 0.9375rem;
    }
  }
}

@media screen and (max-width: 48rem) {
  .secret-modal {
    padding: 2.5rem 1.25rem;
    max-width: 18.75rem;

    .title {
      margin-bottom: 1rem;
    }

    .content {
      padding: 0.625rem;
      font-weight: 500;
    }

    .close-modal-button {
      top: 1rem;
      right: 1rem;
    }
  }
}
</style>
