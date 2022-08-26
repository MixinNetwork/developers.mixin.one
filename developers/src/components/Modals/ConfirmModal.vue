<template>
  <d-modal :show="show">
    <div class="confirm-container">
      <img class="close-modal-button" @click="useClickCancel" src="@/assets/img/svg/close.svg" alt="confirm-close-icon"/>
      <h3 class="content">{{content}}</h3>
      <div class="button-container">
        <button class="cancel" @click="useClickCancel">{{t('button.cancel')}}</button>
        <button class="primary" @click="useClickConfirm">{{t('button.ok')}}</button>
      </div>
    </div>
  </d-modal>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import DModal from '@/components/Modals/DModal';
import { useConfirmModalStore } from '@/stores';

export default {
  components: { DModal },
  setup() {
    const { t } = useI18n();

    const confirmStore = useConfirmModalStore();
    const { show, content } = storeToRefs(confirmStore);
    const { useClickCancel, useClickConfirm } = confirmStore;

    return {
      show,
      content,
      useClickCancel,
      useClickConfirm,
      t,
    };
  },
};
</script>

<style lang="scss" scoped>
.confirm-container {
  width: 26.125rem;
  padding: 3.125rem 2rem;
  background-color: #fff;
  border-radius: 4px;

  .content {
    font-size: 1rem;
    text-align: center;
    word-break: break-all;
  }

  .button-container {
    display: flex;
    justify-content: center;
    margin-top: 2rem;

    button {
      width: 8.625rem;
      height: 2.375rem;
      border-radius: 3px;
      font-size: 1rem;

      &:first-child {
        margin-right: 0.625rem;
      }
    }
  }
}

@media screen and (max-width: 48rem) {
  .confirm-container {
    padding: 0;
    width: 16.875rem;
    border-radius: 0.75rem;
    overflow: hidden;

    .close-modal-button {
      display: none;
    }

    .content {
      min-height: 4.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.625rem;
      font-size: 1rem;
      font-weight: 500;
      border-bottom: 1px solid #cbcbcb;
    }

    .button-container {
      margin: 0;

      button {
        flex: 1;
        height: 100%;
        background-color: #fff;
        border-radius: initial;
        font-size: 1rem;
        text-align: center;
        line-height: 2.6rem;

        &:first-child {
          color: #3478f6;
          background-color: #fff;
          border-right: 1px solid #cbcbcb;
          margin: 0;
        }

        &:last-child {
          color: #3478f6;
          background-color: #fff;
        }
      }
    }
  }
}
</style>
