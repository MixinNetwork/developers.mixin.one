<template>
  <d-modal :show="show">
    <div class="payment-modal">
      <img
        @click="useClosePaymentModal"
        src="@/assets/img/app-svg/close.svg"
        alt="close-modal-btn"
      />
      <h3>{{ title || t('payment.select_channel') }}</h3>
      <p class="description">{{ description || t('payment.choose_channel') }}</p>
      <div class="actions">
        <button
          @click="useSelectPaymentChannel('mixpay')"
          class="primary"
        >{{ t('payment.mixpay') }}</button>
        <button
          @click="useSelectPaymentChannel('mixin_one')"
          class="primary"
        >{{ t('payment.mixin_one') }}</button>
      </div>
    </div>
  </d-modal>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import DModal from '@/components/Modals/DModal.vue';
import { usePaymentModalStore } from '@/stores';

const { t } = useI18n();
const paymentStore = usePaymentModalStore();
const {
  show,
  title,
  description,
} = storeToRefs(paymentStore);
const {
  useClosePaymentModal,
  useSelectPaymentChannel,
} = paymentStore;

</script>

<style lang="scss" scoped>
.payment-modal {
  position: relative;
  min-width: 26rem;
  padding: 2rem 1.5rem;
  text-align: center;

  img {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 0.875rem;
    height: 0.875rem;
    padding: 0.3125rem;
    box-sizing: initial;
  }

  h3 {
    margin-bottom: 0.75rem;
    font-weight: 900;
  }
}

.description {
  margin-bottom: 1.5rem;
  color: #5f6c88;
}

.actions {
  display: flex;
  gap: 0.75rem;

  button {
    flex: 1;
    height: 2.75rem;
  }
}

.secondary {
  background: #eef3ff;
  color: #2f5bd2;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    background: #f3f4f6;
    color: #9aa3b2;
    cursor: not-allowed;
    opacity: 1;
  }
}

.hint {
  margin-top: 0.75rem;
  font-size: 0.875rem;
  color: #8b95a7;
}

@media screen and (max-width: 48rem) {
  .payment-modal {
    min-width: 18.75rem;
    max-width: 18.75rem;
    padding: 2rem 1.25rem;
  }

  .actions {
    flex-direction: column;
  }
}
</style>
