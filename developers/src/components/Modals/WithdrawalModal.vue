<template>
  <d-modal :show="show" :loading="loading">
    <div :class="['container', showSnapshot ? 'snapshot-container' : '']">
      <d-header>
        <template #left>
          <div class="header-back" @click="useClickCancel" >
            <img src="@/assets/img/app-svg/left.svg" alt="backward-icon"/>
          </div>
        </template>
        <template #center>
          <div v-if="showSnapshot">{{ t('wallet.snapshot_info') }}</div>
          <div v-else>{{ t('wallet.title') }}</div>
        </template>
      </d-header>
      <div :class="['content', showSnapshot ? 'snapshot' : '']">
        <template v-if="!showSnapshot">
          <header class="icon-header" :style="{opacity: asset.icon_url ? '1':'0'}">
            <img :src="asset.icon_url" alt="asset-icon"/>
            <p>{{ asset.balance }} {{ asset.symbol }}</p>
          </header>
          <ul>
            <li>
              <label>{{ t('wallet.amount') }}</label>
              <input v-model.trim="amount"/>
            </li>
            <li>
              <label>PIN</label>
              <input type="password" maxlength="6" v-model="pin"/>
            </li>
            <li>
              <label>Mixin ID / Mainnet Address</label>
              <input v-model.trim="opponent_id"/>
            </li>
          </ul>
          <div class="button-container">
            <button @click="useClickSubmit" class="primary">{{ t('button.withdrawal') }}</button>
            <button @click="useClickCancel" class="cancel">{{ t('button.cancel') }}</button>
          </div>
        </template>
        <template v-else>
          <h3 class="title">{{ t('wallet.snapshot_info') }}</h3>
          <div class="snapshot-item">
            <label>{{ t('wallet.snapshot.snapshot_id') }}</label>
            <p>{{ transactionInfo.snapshot_id }}</p>
          </div>
          <div class="snapshot-item">
            <label>{{ t('wallet.snapshot.trace_id') }}</label>
            <p>{{ transactionInfo.trace_id }}</p>
          </div>
          <div class="snapshot-item">
            <label>{{ t('wallet.snapshot.account') }}</label>
            <p>{{ transactionInfo.opponent_key || transactionInfo.opponent_id }}</p>
          </div>
          <div class="snapshot-item">
            <label>{{ t('wallet.snapshot.amount') }}</label>
            <p>{{ transactionInfo.amount }}</p>
          </div>
          <div v-if="transactionInfo.transaction_hash" class="snapshot-item">
            <label>{{ t('wallet.snapshot.transaction_hash') }}</label>
            <p>{{ transactionInfo.transaction_hash }}</p>
          </div>
        </template>
        <img @click="useClickCancel" class="close-modal-button" src="@/assets/img/svg/close.svg" alt="close-icon"/>
      </div>
    </div>
  </d-modal>
</template>

<script>
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import DModal from '@/components/Modals/DModal';
import DHeader from '@/components/DHeader';
import { useWithdrawalModalStore } from '@/stores';

export default {
  name: 'WithdrawalModal',
  components: { DModal, DHeader },
  setup() {
    const { t } = useI18n();

    const withdrawalStore = useWithdrawalModalStore();
    const {
      loading,
      show,
      asset,
      amount,
      pin,
      opponent_id,
      transactionInfo,
      showSnapshot,
    } = storeToRefs(withdrawalStore);
    const { useClickSubmit, useClickCancel } = withdrawalStore;

    return {
      loading,
      show,
      asset,
      amount,
      pin,
      opponent_id,
      transactionInfo,
      showSnapshot,
      useClickSubmit,
      useClickCancel,
      t,
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  border-radius: 0.75rem;
  background-color: #fff;
  overflow: hidden;

  &.snapshot-container {
    width: 45rem;
  }

  .content {
    padding: 3rem;

    .icon-header {
      text-align: center;

      img {
        width: 4.5rem;
        height: 4.5rem;
        margin-bottom: 1rem;
      }

      p {
        margin-bottom: 1.875rem;
        color: #a9b0bf;
        user-select: text;
      }
    }

    li {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;

      label {
        width: 5.625rem;
        margin-right: 1.25rem;
        font-weight: 700;
        text-align: left;
      }

      input {
        width: 30.75rem;
        padding: 1.25rem .8rem;
        background: #f6f9ff;
        border-radius: 0.25rem;
        font-size: 1rem;
      }
    }

    .button-container {
      text-align: right;
      margin-top: 4rem;

      button {
        font-size: 0.875rem;
        width: 8.75rem;
        margin-left: 0.625rem;
      }
    }
  }

  .snapshot {
    padding: 1.5rem;
    width: 100%;
    height: 100%;
    overflow: auto;

    .title {
      text-align: center;
      margin: 0.75rem 0 1rem 0;
    }

    .snapshot-item {
      margin-bottom: 1rem;
      width: 100%;

      label {
        display: block;
        margin-bottom: 1rem;
        font-weight: 500;
        font-size: 1rem;
      }

      p {
        user-select: text;
        background: #f6f9ff;
        box-shadow: 0 0.0625rem 0.25rem 0 rgba(28, 77, 174, 0.1);
        border-radius: 0.375rem;
        padding: 1rem;
        word-break: break-all;
        font-size: 1rem;
      }
    }

    .button-container {
      display: none;
    }
  }
}

.close-modal-button {
  position: absolute;
  top: 1.5625rem;
  right: 1.5625rem;
}

@media screen and (max-width: 48rem) {
  .container {
    background-color: #f6f7f9;
    border-radius: 0;
    height: 100%;
    width: 100%;

    &.snapshot-container {
      width: 24rem;
    }

    .content {
      padding: 1.25rem;

      .icon-header p {
        color: #000;
        margin-bottom: 1rem;
      }

      li {
        flex-direction: column;

        label {
          width: initial;
          margin-bottom: 1rem;
          line-height: 1rem;
          text-align: center;
        }

        input {
          width: 100%;
          height: 3.125rem;
          padding: 0 1.25rem;
          background-color: #fff;
          box-shadow: 0 0.0625rem 0.25rem 0 rgba(28, 77, 174, 0.1);
          font-weight: 500;
          font-size: 1rem;
        }
      }

      .button-container {
        margin-top: 0;

        .primary {
          display: block;
          float: none;
          margin: 0 auto;
          width: 7.875rem;
          height: 2.625rem;
          border-radius: 2.5rem;
          background: #3277ff;
          font-size: 1rem;
        }

        .cancel {
          display: none;
        }
      }
    }

    .snapshot {
      .title {
        display: none;
      }
    }
  }

  .close-modal-button {
    display: none;
  }
}
</style>
