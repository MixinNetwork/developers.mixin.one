<template>
  <d-modal :show="showSecret">
    <div class="new-secret-modal">
      <h3>{{secretTitle}}</h3>
      <span :class="type==='UpdateSession' && 'session'">{{secretContent}}</span>
      <div class="btns">
        <button v-if="type==='UpdateSecret'" @click="useCloseModal" class="btn-close primary">{{t('button.cancel')}}</button>
        <button v-if="type==='UpdateSession'" @click="useClickDownload" class="btn-download primary">{{t('button.download')}}</button>
        <button
          class="btn-copy primary"
        >{{t('button.copy')}}
        </button>
      </div>
      <img @click="useCloseModal" class="close" src="@/assets/img/svg/close.svg" alt="modal-close-icon"/>
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
    const { useClickDownload, useCloseModal } = secretStore;

    return {
      showSecret,
      secretTitle,
      secretContent,
      type,
      useClickDownload,
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

.close {
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

@media screen and (max-width: 48rem) {
  .new-secret-modal {
    padding: 2.5rem 1.25rem;
    max-width: 18.75rem;

    h3 {
      margin-bottom: 1rem;
    }

    span {
      padding: 0.625rem;
      font-weight: 500;
    }

    img {
      top: 1rem;
      right: 1rem;
    }
  }
}
</style>
