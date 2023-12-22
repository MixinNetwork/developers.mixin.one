<template>
  <d-modal :show="show" :loading="loading">
    <div :class="['main', showSnapshot ? 'snap-main' : '']">
        <d-header class="header">
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
            <header :style="{opacity: asset.icon_url ? '1':'0'}">
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
            <footer>
              <div class="btns">
                <button @click="useClickSubmit" class="btns-copy primary">{{ t('button.withdrawal') }}</button>
                <button @click="useClickCancel" class="btns-cancel primary">{{ t('button.cancel') }}</button>
              </div>
            </footer>
          </template>
          <template v-else>
            <h3>{{ t('wallet.snapshot_info') }}</h3>
            <div>
              <label>{{ t('wallet.snapshot.snapshot_id') }}</label>
              <p>{{ transactionInfo.snapshot_id }}</p>
            </div>
            <div>
              <label>{{ t('wallet.snapshot.trace_id') }}</label>
              <p>{{ transactionInfo.trace_id }}</p>
            </div>
            <div>
              <label>{{ t('wallet.snapshot.account') }}</label>
              <p>{{ transactionInfo.opponent_key || transactionInfo.opponent_id }}</p>
            </div>
            <div>
              <label>{{ t('wallet.snapshot.amount') }}</label>
              <p>{{ transactionInfo.amount }}</p>
            </div>
            <div v-if="transactionInfo.transaction_hash" >
              <label>{{ t('wallet.snapshot.transaction_hash') }}</label>
              <p>{{ transactionInfo.transaction_hash }}</p>
            </div>
          </template>
          <img @click="useClickCancel" class="close" src="@/assets/img/svg/close.svg" alt="close-icon"/>
        </div>
      </div>
  </d-modal>
</template>

<script>
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import DModal from '@/components/Modals/DModal.vue';
import DHeader from '@/components/DHeader.vue';
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
.main {
  border-radius: 0.75rem;
  background-color: #fff;
  overflow: hidden;
}

.snap-main {
  width: 45rem;
}

.content {
  padding: 3rem;
}

.header {
  display: none;
}

.close {
  position: absolute;
  top: 1.5625rem;
  right: 1.5625rem;
  color: #b8bdc7;
  cursor: pointer;
  padding: 0.3125rem;
}

header {
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
    font-weight: 700;
    text-align: left;
    margin-right: 1.25rem;
  }

  input {
    font-size: 1rem;
    width: 30.75rem;
    background: #f6f9ff;
    padding: 1.25rem .8rem;
    border-radius: 0.25rem;
  }
}

.btns {
  text-align: right;
  margin-top: 4rem;

  button {
    font-size: 0.875rem;
    width: 8.75rem;
    margin-left: 0.625rem;
  }

  .btns-cancel {
    background: #e5e7ec;
    color: #333;

    &:hover {
      opacity: 0.8;
    }
  }
}

.fade-up-enter-active,
.fade-up-leave-active {
  transition: margin 0.3s, opacity 0.3s;
}

.fade-up-enter {
  margin-top: -1.25rem;
  opacity: 0;
}

.snapshot {
  padding: 1.5rem;
  width: 100%;
  height: 100%;
  overflow: auto;

  h3 {
    text-align: center;
    margin: 0.75rem 0 1rem 0;
  }

  div {
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

  .btns {
    display: none;
  }
}

@media screen and (max-width: 48rem) {
  .main {
    background-color: #f6f7f9;
    border-radius: 0;
    height: 100%;
    width: 100%;
  }

  .header-back {
    width: 3.125rem;
    transform: translate(-1.5625rem);
    padding-left: 1.5625rem;

    img {
      height: 1.5rem;
      width: 1.5rem;
      transform: translate(0, 0.3125rem);
    }
  }

  .header {
    display: block;
  }

  .content {
    padding: 1.25rem;

    header p {
      color: #000;
      margin-bottom: 1rem;
    }

    .close {
      display: none;
    }
  }

  .mask {
    .close {
      display: none;
    }
  }

  li {
    flex-direction: column;

    label {
      width: initial;
      line-height: 1rem;
      margin-bottom: 1rem;
      margin-right: 0;
      text-align: center;
    }

    input {
      width: 100%;
      background-color: #fff;
      box-shadow: 0 0.0625rem 0.25rem 0 rgba(28, 77, 174, 0.1);
      height: 3.125rem;
      padding: 0 1.25rem;
      font-weight: 500;
      font-size: 1rem;
    }
  }

  .btns {
    margin-top: 0;

    .btns-copy {
      display: block;
      float: none;
      margin: 0 auto;
      width: 7.875rem;
      height: 2.625rem;
      border-radius: 2.5rem;
      background: #3277ff;
      font-size: 1rem;
    }
  }

  .btns-cancel {
    display: none;
  }

  .snapshot {
    h3 {
      display: none;
    }
  }

  .fade-up-enter-active,
  .fade-up-leave-active {
    transition: none;
  }

  .fade-up-enter {
    margin-top: 0;
    opacity: 1;
  }
}
</style>
