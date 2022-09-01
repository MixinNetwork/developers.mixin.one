<template>
  <d-modal :show="show" :loading="loading">
    <div class="buy-modal">
      <img
        @click="useCloseBuyModal"
        src="@/assets/img/app-svg/close.svg"
        alt="close-modal-btn"
      />
      <h3 class="edit-modal-title">{{ t('dashboard.buy.title') }}</h3>
      <div>{{ t('dashboard.buy.desc1') }}</div>
      <p>{{ t('dashboard.buy.desc2') }}</p>
      <button
        @click="useClickBuyButton(1)"
        class="btns-save primary"
      >{{ t('dashboard.buy.btn', {count: 1}) }}
      </button>
      <button
        @click="useClickBuyButton(2)"
        class="btns-save primary"
      >{{ t('dashboard.buy.btns', {count: 2}) }}
      </button>
      <button
        @click="useClickBuyButton(5)"
        class="btns-save primary"
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

  img {
    position: absolute;
    top: 1rem;
    right: 1rem;
    padding: 0.3125rem;
    box-sizing: initial;
    width: 0.875rem;
    height: 0.875rem;
  }

  h3 {
    font-weight: 900;
    margin-bottom: 1.875rem;
  }

  p {
    margin: 0.625rem 0 1.125rem 0;
    background-color: #f6f9ff;
    padding: 0.625rem;
    font-size: 0.875rem;
  }

  button {
    margin-top: 0.75rem;
    margin-right: 1.25rem;
    width: 8.75rem;
    height: 2.5rem;

    &:last-child {
      margin-right: 0;
    }
  }
}

@media screen and (max-width: 48rem) {
  .buy-modal {
    padding: 2.5rem 1.25rem;
    min-width: 18.75rem;
    max-width: 18.75rem;

    button {
      margin-right: 0;
    }
  }
}
</style>
