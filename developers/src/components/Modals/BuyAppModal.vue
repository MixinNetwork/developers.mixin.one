<template>
  <d-modal :show="showBuyModal" :loading="modalLoading">
    <div class="edit-modal">
      <img
        @click="useCloseBuyModal"
        src="@/assets/img/app-svg/close.svg"
        alt="close-modal-btn"
      />
      <h3 class="edit-modal-title">{{ t('dashboard.buy.title') }}</h3>
      <span>{{ t('dashboard.buy.desc1') }}</span>
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
import { inject } from 'vue';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { v4 as uuid } from 'uuid';
import DModal from '@/components/Modals/DModal';
import { useClient } from '@/api';
import { useLayoutStore, useBuyModalStore } from '@/stores';

export default {
  name: 'buy-app-modal',
  components: { DModal },
  setup() {
    const $message = inject('$message');
    const { t } = useI18n();

    const dataStore = useLayoutStore();
    const { appProperty } = storeToRefs(dataStore);
    const { fetchAppProperty } = dataStore;

    const modalStore = useBuyModalStore();
    const { showBuyModal, modalLoading } = storeToRefs(modalStore);
    const { useModifyBuyModalStatus, useModifyBuyModalLoadingStatus } = modalStore;

    const useClickBuyButton = async (count) => {
      const client = useClient($message, t);
      useModifyBuyModalLoadingStatus(true);
      await fetchAppProperty(client);

      const trace = uuid();
      const amount = Number(appProperty.value.price) * count;
      // eslint-disable-next-line max-len
      window.location.href = `https://mixin.one/pay?recipient=fbd26bc6-3d04-4964-a7fe-a540432b16e2&asset=c94ac88f-4671-3976-b60a-09064f1811e8&amount=${amount}&trace=${trace}&memo=PAY_FOR_APP`;
    };
    const useCloseBuyModal = () => {
      useModifyBuyModalStatus(false);
    };

    return {
      modalLoading,
      showBuyModal,
      useClickBuyButton,
      useCloseBuyModal,
      t,
    };
  },
};
</script>

<style lang="scss" scoped>
.edit-modal {
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
    font-size: 1rem;
    font-weight: 900;
    margin-bottom: 1.875rem;
  }

  span {
    color: #333333;
    font-size: 1rem;
    line-height: 1.5rem;
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
    font-size: 1rem;
    height: 2.5rem;

    &:last-child {
      margin-right: 0;
    }
  }
}

@media screen and (max-width: 48rem) {
  .edit-modal {
    padding: 2.5rem 1.25rem;
    min-width: 18.75rem;
    max-width: 18.75rem;

    button {
      margin-right: 0;
    }
  }
}
</style>
