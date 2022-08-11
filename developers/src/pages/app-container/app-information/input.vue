<template>
  <div>
    <label>{{label}}</label>
    <input
      :disabled="disabled===''"
      :placeholder="placeholder || ''"
      :value="value"
      @input="change($event)"
    />
    <img
      v-if="isCopied"
      @click="useClickCopy"
      src="@/assets/img/ic_copy.png"
      alt="copy-text-icon"
    />
  </div>
</template>

<script>
import { inject, watch } from 'vue';
import { useClipboard } from '@vueuse/core';
import { useI18n } from 'vue-i18n';

export default {
  name: 't-input',
  props: ['value', 'label', 'disabled', 'placeholder', 'isCopied'],
  emits: ['update:value'],
  setup(props, ctx) {
    const $message = inject('$message');
    const { t } = useI18n();

    const change = (event) => {
      ctx.emit('update:value', event.target.value);
    };

    const { copy, copied, isSupported } = useClipboard();
    const useClickCopy = () => {
      if (!isSupported) {
        $message.error({ message: t('message.errors.copy'), showClose: true });
        return;
      }
      copy(props.value);
    };
    watch(copied, () => {
      if (copied.value) $message.success({ message: t('message.success.copy'), showClose: true });
    });

    return {
      change,
      useClickCopy,
    };
  },
};
</script>

<style lang="scss" scoped>
  div {
    position: relative;
  }

  label {
    font-weight: 700;
    display: block;
    line-height: 1rem;
    margin-bottom: 1rem;
  }

  input {
    box-sizing: border-box;
    width: 100%;
    height: 4rem;
    font-size: 1rem;
    padding: 0 1.25rem;
    border-radius: .25rem;
    box-shadow: 0 0.0625rem 0.25rem 0 rgba(28, 77, 174, 0.1);

    &::-webkit-input-placeholder {
      color: #a9b0bf;
    }

    &::-moz-placeholder {
      color: #a9b0bf;
    }

    &::-ms-input-placeholder {
      color: #a9b0bf;
    }

    &:disabled {
      background: #eceef2;
      color: #a9b0bf;
      box-shadow: none;
    }
  }

  img {
    border-radius: 0;
    cursor: pointer;
    position: absolute;
    right: 0.625rem;
    top: 50%;
    transform: translateY(.5rem);
  }

  @media screen and (max-width: 48rem) {
    input {
      font-weight: 500;
      height: 3.125rem;
    }
  }
</style>
