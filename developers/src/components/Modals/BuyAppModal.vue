<template>
  <d-modal :show="show" :loading="loading">
    <div class="buy-modal">
      <img
        class="close-modal-button"
        @click="useCloseBuyModal"
        src="@/assets/img/app-svg/close.svg"
        alt="close-modal-btn"
      />
      <h3 class="title">{{ t('dashboard.buy.title') }}</h3>
      <div>{{ t('dashboard.buy.desc1') }}</div>
      <p class="notice">{{ t('dashboard.buy.desc2') }}</p>
      <button
        @click="useClickBuyButton(1)"
        class="buy-button primary"
      >{{ t('dashboard.buy.btn', {count: 1}) }}
      </button>
      <button
        @click="useClickBuyButton(2)"
        class="buy-button primary"
      >{{ t('dashboard.buy.btns', {count: 2}) }}
      </button>
      <button
        @click="useClickBuyButton(5)"
        class="buy-button primary"
      >{{ t('dashboard.buy.btns', {count: 5}) }}
      </button>
    </div>
  </d-modal>
</template>

<script>
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import DModal from '@/components/Modals/DModal';
import { useBuyModalStore } from '@/stores';

export default {
  name: 'buy-app-modal',
  components: { DModal },
  setup() {
    const { t } = useI18n();

    const modalStore = useBuyModalStore();
    const { show, loading } = storeToRefs(modalStore);
    const { useClickBuyButton, useCloseBuyModal } = modalStore;

    return {
      show,
      loading,
      useClickBuyButton,
      useCloseBuyModal,
      t,
    };
  },
};
</script>

<style lang="scss" scoped>
.buy-modal {
  padding: 2.5rem 1.25rem 4.75rem 1.25rem;
  min-width: 37.5rem;
  text-align: center;

  .title {
    font-weight: 900;
    margin-bottom: 1.875rem;
  }

  .notice {
    margin: 0.625rem 0 1.125rem 0;
    background-color: #f6f9ff;
    padding: 0.625rem;
    font-size: 0.875rem;
  }

  .buy-button {
    width: 8.75rem;
    height: 2.5rem;
    margin: 0.75rem 1.25rem 0 0;

    &:last-child {
      margin-right: 0;
    }
  }
}

@media screen and (max-width: 48rem) {
  .buy-modal {
    min-width: 18.75rem;
    max-width: 18.75rem;
    padding: 2.5rem 1.25rem;

    .buy-button {
      margin-right: 0;
    }
  }
}
</style>
