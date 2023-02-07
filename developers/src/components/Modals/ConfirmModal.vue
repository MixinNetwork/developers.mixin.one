<template>
  <d-modal :show="show">
    <div class="confirm-content">
      <img @click="useClickCancel" src="@/assets/img/svg/close.svg" alt="confirm-close-icon"/>
      <h3>{{content}}</h3>
      <div class="btns">
        <button @click="useClickCancel">{{t('button.cancel')}}</button>
        <button @click="useClickConfirm">{{t('button.ok')}}</button>
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
.confirm-content {
  padding: 3.125rem 2rem;
  width: 26.125rem;
  background-color: #fff;
  border-radius: 4px;
}

h3 {
  font-size: 1rem;
  text-align: center;
  word-break: break-all;
}

img {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  width: 1.2rem;
  height: 1.2rem;
  cursor: pointer;
}

.btns {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
}
button {
  width: 8.625rem;
  height: 2.375rem;
  border-radius: 3px;
  font-size: 1rem;
  &:first-child {
    background-color: #e5e7ec;
    color: #333;
    margin-right: 0.625rem;
  }
  &:last-child {
    color: #fff;
    background-color: #3277ff;
  }
}

@media screen and (max-width: 48rem) {
  .confirm-content {
    padding: 0;
    width: 16.875rem;
    border-radius: 0.75rem;
    overflow: hidden;
  }
  img {
    display: none;
  }

  h3 {
    padding: 0.625rem;
    min-height: 4.5rem;
    font-size: 1rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #cbcbcb;
  }
  .btns {
    margin: 0;
  }

  button {
    flex: 1;
    text-align: center;
    line-height: 2.6rem;
    background-color: #fff;
    height: 100%;
    font-size: 1rem;
    border-radius: initial;

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
</style>
