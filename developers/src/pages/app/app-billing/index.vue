<template>
  <div class="container">
    <div class="billing-list flex">
      <div class="item-billing">
        <div class="billing-item cost">
          <div>
            <div>
              <img src="@/assets/img/svg/secret.svg" alt="app-qrcode-icon" />
              <span>{{t('billing.cc_title')}}</span>
            </div>
            <p>{{t('billing.cc_content')}}</p>
          </div>
          <div v-if="bill" class="btn-container billing">
            <div class="credit">
              <span>Credit:</span>
              <span class="value">${{ bill.credit }}</span>
            </div>
            <div class="h-px"></div>
            <div class="space-y-2">
              <h2 class="title">Cost</h2>
              <div class="credit">
                <span class="text-gray-600">Users:</span>
                <span class="text-gray-800 value">${{ bill.cost.users }}</span>
              </div>
              <div class="credit">
                <span class="text-gray-600">Resources:</span>
                <span class="text-gray-800 value">${{ bill.cost.resources }}</span>
              </div>
            </div>
          </div>
          <div class="h-px"></div>
          <div class="buy-credit">
            <label>Buy Credits (USDT)</label>
            <div class="input-container">
              <input :placeholder="t('billing.amount')" v-model="amount"></input>

              <button @click="useClickPay" :class="['primary', !allowSubmit ? 'not-finished' : '']">{{
                t('billing.pay') }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { toRefs, reactive, inject, watch, computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useUserClient } from '@/api';
  import { v4 as uuid, parse } from 'uuid';
  import qs from 'qs';

  export default {
    name: 'app-billing',
    props: {
      appId: String,
    },
    setup(props) {
      const $message = inject('$message');
      const { t } = useI18n();

      const state = reactive({
        bill: undefined,
        amount: '',
      });

      const allowSubmit = computed(() => {
        const amount = Number(state.amount);
        return state.amount && !isNaN(amount) && amount > 0;
      });

      const userClient = useUserClient($message, t);

      const useFetchAppBilling = async (appId) => {
        appId = appId || props.appId;
        if (appId) {
          const bill = await userClient.app.billing(appId);
          return bill;
        }
        return {};
      };

      const generateMixPayUrl = (asset, amount, memo, returnTo) => {
        const baseUrl = 'https://mixpay.me/pay';
        const params = {
          payeeId: "3c2bf6e7-fa74-4764-a4f3-79a24fab814f",
          settlementAssetId: asset,
          quoteAssetId: 'usd',
          quoteAmount: amount,
          traceId: uuid(),
          settlementMemo: memo,
          returnTo,
        };
        const query = qs.stringify(params);
        return `${baseUrl}?${query}`;
      };

      const useClickPay = () => {
        if (!allowSubmit.value) {
          $message.error(t('Please enter a valid amount'));
          return;
        }
        const url = generateMixPayUrl(
          '4d8c508b-91c5-375b-92b0-ee702ed2dac5',
          state.amount,
          'buy app credit',
          window.location.href
        );
        window.location.href = url;
      };

      watch(() => props.appId, async (appId) => {
        state.bill = await useFetchAppBilling(appId);
      }, { immediate: true });

      return {
        ...toRefs(state),
        useClickPay,
        allowSubmit,
        t
      };
    },
  };
</script>

<style lang='scss' scoped>

.billing-list {
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  align-items: start;
  width: 62rem;
  max-width: 100%;
  margin: 0 auto;
  padding: 2rem 0 0;

  button {
    height: 2.5rem;
    min-width: 6rem;
  }

  .item {
    width: 100%;
    height: 260px;
    padding: 1rem;
  }
}

.billing-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.375rem 1.875rem;
  height: 100%;
  background: #fff;
  box-shadow: 0 0.0625rem 0.25rem 0 rgba(28, 77, 174, 0.1);
  border-radius: .25rem;
  box-sizing: border-box;
  position: relative;
  margin-bottom: .5rem;

  img {
    border-radius: 0;
    margin-right: 0.875rem;
    transform: translate(0, 0.125rem);
  }

  span {
    font-weight: 700;
  }

  i {
    margin-right: 0.875rem;
    font-weight: 1000;
  }

  p {
    padding-top: 1.75rem;
    font-weight: 500;
    font-size: 0.9375rem;
    overflow: hidden;

    :deep(.warning) {
      color: #dd4b65;
    }
  }

  .credit {
    span {
      font-weight: 500;
    }
  }

  &:nth-child(2n) {
    margin-right: 0;
  }

  &::after {
    content: "";
    width: 0.1875rem;
    height: 1.25rem;
    background-color: #3d75e3;
    position: absolute;
    top: 1.375rem;
    left: 0;
    border-radius: 0 0.5rem 0.5rem 0;
  }

  button {
    white-space: nowrap;
    font-weight: 500;
    font-size: 0.9375rem;
  }
}

.item-billing {
  width: 100%;
  padding: 1rem;
}

.h-px {
  border-top: 1px solid #e5e7ec;
  margin: 5px 0;
}

.billing {
  margin-top: 1.5rem;
  font-weight: 300;
  .credit {
    font-size: 0.9375rem;
    font-weight: 500;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 0;
  }

  .value {
    font-weight: 200;
  }

  .title {
    font-size: 18px;
    color: rgb(55 65 81);
    padding: 0.5rem 0;
  }
}

.buy-credit {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-container {
  margin-top: 0.5rem;
  display: flex;
  gap: 1.5rem;
  input {
    flex: 1;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 0.0625rem 0.25rem 0 rgba(28, 77, 174, 0.1);
    border-radius: 0.25rem;
    padding: 0.25rem 1rem;
  }
}

@media screen and (max-width: 70rem) {
  .billing-list {
    display: block;

    .item {
      width: 100%;
      padding: 1rem;
    }
  }
}

@media screen and (max-width: 48rem) {
  .billing-list {
    padding: 1.5rem 0 0;

    .billing-item {
      margin-bottom: 0;
    }
  }

  .btns {
    justify-content: center;
  }

  .btn-close {
    display: none;
  }
}

</style>
