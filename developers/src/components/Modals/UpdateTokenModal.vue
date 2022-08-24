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
import { reactive, toRefs, inject } from 'vue';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import validator from 'validator';
import DModal from '@/components/Modals/DModal';
import { useUpdateTokenModalStore } from '@/stores';
import { ls } from '@/utils';

export default {
  name: 'UpdateTokenModal',
  components: { DModal },
  setup() {
    const { t } = useI18n();
    const $message = inject('$message');

    const updateTokenStore = useUpdateTokenModalStore();
    const { showUpdate, appId, onSubmit } = storeToRefs(updateTokenStore);
    const { useClearUpdateToken } = updateTokenStore;

    const state = reactive({
      session_id: '',
      pin_token: '',
      private_key: '',
    });

    const useCheckToken = () => {
      if (!validator.isUUID(state.session_id, 4)) {
        $message.error({
          message: t('message.errors.session_id_format'),
          showClose: true,
        });
        return false;
      }
      if (!validator.isBase64(state.pin_token) && Buffer.from(state.pin_token, 'base64').length !== 32) {
        $message.error({
          message: t('message.errors.pin_token_format'),
          showClose: true,
        });
        return false;
      }
      if (!validator.isBase64(state.private_key) && Buffer.from(state.private_key, 'base64').length !== 64) {
        $message.error({
          message: t('message.errors.private_key_format'),
          showClose: true,
        });
        return false;
      }
      return true;
    };
    const useSaveToken = () => {
      ls.set(appId.value, {
        user_id: appId.value,
        session_id: state.session_id,
        pin_token: state.pin_token,
        private_key: state.private_key.replace(/\\r\\n/g, '\r\n'),
      });
      state.pin_token = '';
      state.private_key = '';
      state.session_id = '';
    };

    const useClickCancel = () => {
      useClearUpdateToken();
    };
    const useClickSubmit = () => {
      if (!useCheckToken()) return;
      useSaveToken();
      onSubmit.value();
      useClearUpdateToken();
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

<style lang="scss" scoped>
.main {
  padding: 3.125rem 2.5rem 2.5rem 2.5rem;
  overflow: hidden;
}

h3 {
  font-size: 1rem;
  margin: 0.625rem 0 2.5rem 0;
  text-align: center;
}

label {
  font-weight: 700;
  min-width: 5.625rem;
  margin-right: 20px;
}

.edit-item {
  display: flex;
  align-items: center;
  margin-bottom: 1.25rem;

  input {
    width: 100%;
    max-width: 492px;
    height: 60px;
    font-size: 1rem;
    background: #f6f9ff;
    padding: 0 10px;
    border-radius: 4px;
    box-shadow: 0px 1px 4px 0px rgba(28, 77, 174, 0.1);
  }

  textarea {
    font-size: 1rem;
    padding: 0.625rem;
    width: 30.75rem;
    height: 5.125rem;
    background: #f6f9ff;
  }

  &.intro-container {
    margin-top: -0.5rem;

    .intro {
      color: #E04B4B;
      font-size: 0.88rem;
    }
  }
}

.iconguanbi {
  position: absolute;
  top: 1.5625rem;
  right: 1.5625rem;
  color: #b8bdc7;
  cursor: pointer;
  padding: 0.3125rem;
}

.btns {
  margin-top: 4rem;

  button {
    font-size: 0.88rem;
    width: 8.75rem;
    height: 2.5rem;
    float: right;
    margin-left: 0.625rem;
  }

  .btns-cancel {
    background: #e5e7ec;
    color: #333;

    &:hover {
      opacity: 0.8;
    }
  }
}

@media screen and (max-width: 48rem) {
  .modal {
    .iconguanbi {
      top: 1rem;
      right: 1rem;
    }

    &.main {
      padding: 2.5rem 1.5625rem;
      width: 310px;

      h3 {
        margin: 0 0 2rem 0;
      }

      label {
        font-weight: 700;
        text-align: left;
        line-height: 1rem;
        margin-bottom: 1rem;
      }

      div {
        flex-direction: column;

        input {
          height: 3.125rem;
          width: 100%;
        }
      }

      .edit-item {
        align-items: flex-start;

        textarea {
          width: 100%;
          height: 3.125rem;
        }
      }

      .intro-container {

        label {
          display: none;
        }
      }

      .btns {
        margin: 0;
      }

      .btns-save {
        display: block;
        float: none;
        margin: 1.75rem auto 0 auto;
      }

      .btns-cancel {
        display: none;
      }
    }
  }
}
</style>
