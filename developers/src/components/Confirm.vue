<template>
  <div v-if="show" class="modal-mask">
    <div class="confirm-content">
      <img @click="useClickCancel" src="@/assets/img/svg/close.svg" alt="confirm-close-icon"/>
      <h3>{{content}}</h3>
      <div class="btns">
        <button @click="useClickCancel">{{t('button.cancel')}}</button>
        <button @click="useClickConfirm">{{t('button.ok')}}</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n';

export default {
  props: {
    content: {
      type: String,
      default: '',
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['confirm', 'close-modal'],
  setup(props, ctx) {
    const { t } = useI18n();

    const useClickConfirm = () => {
      ctx.emit('confirm');
      ctx.emit('close-modal');
    };
    const useClickCancel = () => {
      ctx.emit('close-modal');
    };

    return {
      t,
      useClickCancel,
      useClickConfirm,
    };
  },
};
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.34);
  z-index: 1000;
}

.confirm-content {
  padding: 3.125rem 2rem;
  width: 26.125rem;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 4px;
}

h3 {
  font-size: 1rem;
  text-align: center;
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
  &:first-child {
    background-color: #e5e7ec;
    color: #333;
    font-size: 1rem;
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
