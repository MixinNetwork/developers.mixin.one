<template>
  <d-modal :show="show">
    <div class="container">
      <h3 class="title">{{ t('wallet.update_token') }}</h3>
      <div class="form-item">
        <label>Session ID</label>
        <input v-model="session_id" />
      </div>
      <div class="form-item">
        <label>Pin Token</label>
        <input v-model="pin_token" />
      </div>
      <div class="form-item">
        <label>Private Key</label>
        <textarea v-model="private_key"></textarea>
      </div>
      <div class="form-item intro-container">
        <label></label>
        <div class="intro">{{ t('wallet.secret_intro') }}</div>
      </div>
      <div class="button-container">
        <button
          @click="useClickSubmit"
          class="primary"
        >
          {{ t('button.save') }}
        </button>
        <button
          @click="useClickCancel"
          class="cancel"
        >
          {{ t('button.cancel') }}
        </button>
      </div>
      <img
        class="close-modal-button"
        src="@/assets/img/svg/close.svg"
        alt="close-icon"
        @click="useClickCancel" />
    </div>
  </d-modal>
</template>

<script>
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
    const {
      show,
      session_id,
      pin_token,
      private_key,
    } = storeToRefs(updateTokenStore);
    const { useClickSubmit, useClickCancel } = updateTokenStore;

    return {
      show,
      session_id,
      pin_token,
      private_key,
      useClickSubmit,
      useClickCancel,
      t,
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 3.125rem 2.5rem 2.5rem 2.5rem;
  overflow: hidden;

  .title {
    font-size: 1rem;
    margin: 0.625rem 0 2.5rem 0;
    text-align: center;
  }

  .form-item {
    display: flex;
    align-items: center;
    margin-bottom: 1.25rem;

    label {
      margin-right: 20px;
      font-weight: 700;
      min-width: 5.625rem;
    }

    input {
      width: 100%;
      max-width: 492px;
      height: 60px;
      padding: 0 10px;
      background: #f6f9ff;
      border-radius: 4px;
      box-shadow: 0 1px 4px 0 rgba(28, 77, 174, 0.1);
      font-size: 1rem;
    }

    textarea {
      width: 30.75rem;
      height: 5.125rem;
      padding: 0.625rem;
      background: #f6f9ff;
      font-size: 1rem;
    }

    &.intro-container {
      margin-top: -0.5rem;

      .intro {
        color: #E04B4B;
        font-size: 0.88rem;
      }
    }
  }

  .button-container {
    margin-top: 4rem;

    button {
      font-size: 0.88rem;
      width: 8.75rem;
      height: 2.5rem;
      float: right;
      margin-left: 0.625rem;
    }
  }

  .close-modal-button {
    top: 1.5625rem;
    right: 1.5625rem;
  }
}

@media screen and (max-width: 48rem) {
  .container {
    width: 310px;
    padding: 2.5rem 1.5625rem;

    .close-modal-button {
      top: 1rem;
      right: 1rem;
    }

    .title {
        margin: 0 0 2rem 0;
    }

    .form-item {
      flex-direction: column;
      align-items: flex-start;

      label {
        font-weight: 700;
        text-align: left;
        line-height: 1rem;
        margin-bottom: 1rem;
      }

      input {
        height: 3.125rem;
        width: 100%;
      }

      textarea {
        width: 100%;
        height: 3.125rem;
      }

      &.intro-container {
        label {
          display: none;
        }
      }
    }

    .button-container {
      margin: 0;

      .primary {
        display: block;
        float: none;
        margin: 1.75rem auto 0 auto;
      }
      .cancel {
        display: none;
      }
    }
  }
}
</style>
