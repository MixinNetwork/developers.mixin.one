<template>
  <d-modal :show="showRegister" :loading="loading">
    <div class="register-safe-modal">
      <img
        class="close"
        src="@/assets/img/app-svg/close.svg"
        alt="close-modal-btn"
        @click="useCloseModal"
      />
      <div class="title-container">
        <div class="title">{{t('secret.key_btn')}}</div>
        <div class="subtitle">{{ `${step}/2` }}</div>
      </div>
      <div class="key-container">
        <div class="key-title">Spend Key</div>
        <div class="key">{{ privateKey }}</div>
      </div>
      <div class="action-container">
        <template v-if="step === 1">
          <div class="tip" v-html="t('secret.key_content')"></div>
          <div class="btn-container">
            <button class="btn spend-key-copy-btn">{{btnText}}</button>
          </div>
        </template>
        <template v-else>
          <div @click="useToggleConfirm" class="confirm-container">
            <img v-if="confirmed" src="@/assets/img/ic_v.png" alt="option-selected"/>
            <i v-else></i>
            <span class="confirm">{{ t('secret.key_confirm') }}</span>
          </div>
          <div class="btn-container">
            <button @click="useRegister" :class="['btn', !confirmed && 'disabled']">{{btnText}}</button>
          </div>
        </template>
      </div>
    </div>
  </d-modal>
</template>

<script>
import { computed, ref, inject } from 'vue';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import ClipboardJS from 'clipboard';
import forge from 'node-forge';
import { newHash, base64RawURLEncode } from '@mixin.dev/mixin-node-sdk';
import DModal from '@/components/Modals/DModal.vue';
import { useRegisterModalStore } from '@/stores';

export default {
  name: 'app-register-modal',
  components: { DModal },
  setup() {
    const { t } = useI18n();
    const $message = inject('$message');

    const registerStore = useRegisterModalStore();
    const { showRegister, appId, client, step, onSuccess } = storeToRefs(registerStore);
    const { useCloseModal } = registerStore;

    const loading = ref(false);
    const clipboard = ref(undefined);

    const confirmed = ref(false);
    const privateKey = ref('');
    const publicKey = ref('');
    const btnText = computed(() => step.value === 1 ? t('button.copyAndNext') : t('button.register'));

    const useInit = () => {
      clipboard.value = new ClipboardJS(
        '.spend-key-copy-btn',
        {
          text: () => privateKey.value
        },
      );
      clipboard.value.on('success', (e) => {
        e.clearSelection();
        step.value += 1;
        return $message.success({ message: t('message.success.copy'), showClose: true });
      });
      clipboard.value.on('error', () => $message.error({ message: t('message.errors.copy'), showClose: true }));

      const seed = Buffer.from(forge.random.getBytesSync(32), 'binary');
      const keypair = forge.pki.ed25519.generateKeyPair({ seed: seed });
      privateKey.value = seed.toString('hex');
      publicKey.value = keypair.publicKey.toString('hex');
    };
    const useToggleConfirm = () => confirmed.value = !confirmed.value;
    const useRegister = async () => {
      if (!confirmed.value) return;
      loading.value = true;
      const hash = newHash(Buffer.from(appId.value));
      let signData = forge.pki.ed25519.sign({
        message: hash,
        privateKey: Buffer.from(privateKey.value, 'hex'),
      });
      const signature_base64 = base64RawURLEncode(signData);
      const res = await client.value.app.registerSafe(appId.value, {
        signature_base64,
        spend_public_key: publicKey.value,
      });
      if (res && res.spend_public_key) {
        await onSuccess();
        $message.success({ message: t('message.success.register'), showClose: true });
        useCloseModal();
      }
      loading.value = false;
    };

    useInit();

    return {
      showRegister,
      loading,
      confirmed,
      step,
      privateKey,
      btnText,
      clipboard,
      t,
      useRegister,
      useToggleConfirm,
      useCloseModal,
    };
  },
  beforeUnmount() {
    if (this.clipboard) this.clipboard.destroy();
  }
};
</script>

<style lang="scss" scoped>
.register-safe-modal {
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 3.875rem 2.8125rem;
  width: 30rem;
  height: 32rem;

  .close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    padding: 0.3125rem;
    box-sizing: initial;
    width: 0.875rem;
    height: 0.875rem;
    cursor: pointer;
  }

  .title-container {
    flex: none;
    .title {
      margin-top: 0.1875rem;
      font-weight: 700;
      font-size: 1rem;
      line-height: 100%;
    }

    .subtitle {
      margin-top: 0.5rem;
      font-weight: 400;
      font-size: 1rem;
      line-height: 20px;
      color: rgb(51, 51, 51, 0.5);
    }
  }

  .key-container {
    flex: none;
    margin-top: 2.375rem;

    .key-title {
      font-weight: 600;
      font-size: 1rem;
      line-height: 1.5rem;
      text-align: left;
      color: #333;
    }

    .key {
      margin-top: 0.75rem;
      padding: 10px 15px;
      width: 100%;
      height: 7.5rem;
      background-color: #F6F9FF;
      border-radius: 5px;
      font-weight: 400;
      font-size: 1rem;
      line-height: 1.25rem;
      color: #404755;
      text-align: left;
      word-wrap: break-word;
    }
  }

  .action-container {
    display: flex;
    flex: 1 1 0%;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: relative;
    margin-top: 1.25rem;

    .tip {
      font-weight: 400;
      font-size: 0.9375rem;
      line-height: 1.5rem;
      text-align: left;
      color: #333;

      :deep(.warning) {
        color: #EB5757;
      }
    }

    .confirm-container {
      margin-top: 1.625rem;

      .confirm {
        margin-left: 0.625rem;
      }
    }
  }

  .btn {
    width: 8.75rem;
    height: 2.5rem;
    color: #fff;
    background-color: #3277FF;
    border-radius: 4px;
    font-weight: 500;
    font-size: 0.9375rem;
    line-height: 1.625rem;

    &.disabled {
      background-color: #979797;
      cursor: not-allowed;
    }
  }
}

i,
img {
  width: 1rem;
  height: 1rem;
  transform: translateY(0.125rem);
}

i {
  display: inline-block;
  border: 0.125rem solid #000000;
  border-radius: 0.25rem;
}

@media screen and (max-width: 48rem) {
  .register-safe-modal {
    padding: 2.5rem 1.25rem;
    max-width: 18.75rem;
  }
}
</style>
