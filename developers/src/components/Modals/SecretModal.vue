<template>
  <d-modal :show="showSecret">
    <div class="new-secret-modal">
      <h3>{{secretTitle}}</h3>
      <span :class="type==='UpdateSession' && 'session'">{{secretContent}}</span>
      <div class="btns">
        <button v-if="type==='UpdateSecret'" @click="useCloseModal" class="btn-close primary">{{t('button.cancel')}}</button>
        <button v-if="type==='UpdateSession'" @click="useDownloadKeystore" class="btn-download primary">{{t('button.download')}}</button>
        <button
          @click="useClickCopy"
          class="btn-copy primary"
        >{{t('button.copy')}}
        </button>
      </div>
      <img @click="useCloseModal" class="iconguanbi" src="@/assets/img/svg/close.svg" alt="modal-close-icon"/>
    </div>
  </d-modal>
</template>

<script>
import { watch, inject } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useClipboard } from '@vueuse/core';
import FileSaver from 'file-saver';
import DModal from '@/components/Modals/DModal';
import { useSecretModalStore } from '@/stores';

export default {
  name: 'secret-modal',
  components: { DModal },
  setup() {
    const { t } = useI18n();
    const $message = inject('$message');
    const route = useRoute();

    const secretStore = useSecretModalStore();
    const {
      showSecret,
      secretTitle,
      secretContent,
      type,
    } = storeToRefs(secretStore);
    const { useClearSecret } = secretStore;

    const { copy, copied, isSupported } = useClipboard();
    const useClickCopy = async () => {
      if (!isSupported) {
        $message.error({ message: t('message.errors.copy'), showClose: true });
        return;
      }
      await copy(secretContent.value);
    };
    watch(copied, () => {
      if (copied.value) $message.success({ message: t('message.success.copy'), showClose: true });
    });

    const useDownloadKeystore = () => {
      const { app_number } = route.params;

      const blob = new Blob(
        [secretContent.value],
        { type: 'text/plain;charset=utf-8' },
      );
      FileSaver.saveAs(blob, `keystore-${app_number}.json`);
    };

    const useCloseModal = () => {
      useClearSecret();
    };

    return {
      showSecret,
      secretTitle,
      secretContent,
      type,
      useClickCopy,
      useDownloadKeystore,
      useCloseModal,
      t,
    };
  },
};
</script>

<style lang="scss" scoped>
.new-secret-modal {
  text-align: center;
  padding: 3.125rem 3.75rem;
  max-width: 38.5rem;

  h3 {
    margin-bottom: 1.3125rem;
    font-size: 1rem;
  }

  span {
    text-align: left;
    word-wrap: break-word;
    display: block;
    padding: 1.625rem 1.25rem;
    line-height: 1rem;
    width: 100%;
    height: 5.125rem;
    background-color: #f6f9ff;

    &.session {
      height: 12rem;
      overflow: auto;
    }
  }
}

.btns {
  display: flex;
  justify-content: flex-end;

  button {
    width: 8.75rem;
    height: 2.5rem;
    margin-top: 2rem;
    font-size: 0.9375rem;

    &:hover {
      opacity: 0.8;
    }
  }

  .btn-download,
  .btn-close {
    background-color: #e5e7ec;
    color: #333;
    margin-right: 0.5625rem;
  }
}

.iconguanbi {
  position: absolute;
  top: 1.875rem;
  right: 1.875rem;
  color: #b8bdc7;
  cursor: pointer;
  padding: 0.3125rem;

  &:hover {
    color: rgba(50, 119, 255, 0.8);
  }
}

</style>
