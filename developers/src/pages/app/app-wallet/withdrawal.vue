<template>
  <d-modal :show="showWithdrawal">
    <transition name="fade-up">
      <div v-loading="loading" :class="['main', showSnapshot ? 'snap-main' : '']">
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
          <img @click="useClickCancel" class="iconguanbi" src="@/assets/img/svg/close.svg" alt="close-icon"/>
        </div>
        <confirm
          :content="confirmContent"
          :show="showWithdrawalConfirm"
          @confirm="useClickConfirm"
          @close-modal="useCloseConfirm"
        />
      </div>
    </transition>
  </d-modal>
</template>
<script>
import {
  inject,
  reactive,
  toRefs,
  computed,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { validate, v4 as uuid } from 'uuid';
import DHeader from '@/components/DHeader';
import DModal from '@/components/DModal';
import Confirm from '@/components/Confirm';
import { useClient } from '@/api';
import { ls } from '@/utils';
import {useWithdrawalModalStore} from "@/stores";
import {storeToRefs} from "pinia";

export default {
  name: 'withdrawal-modal',
  components: { DHeader, DModal },
  setup() {
    const $message = inject('$message');
    const { t } = useI18n();

    const withdrawalStore = useWithdrawalModalStore();
    const {
      loading,
      showWithdrawal,
      appId,
      asset,
      amount,
      pin,
      opponent_id,
      transactionInfo,
    } = storeToRefs(withdrawalStore);
    const { useClearWithdrawal } = withdrawalStore;
    const confirmContent = computed(() => t('wallet.withdrawal_confirm', {
      amount: amount.value,
      token: asset.value.symbol,
      opponent: opponent_id.value,
    }));
    const showSnapshot = computed(() => JSON.stringify(transactionInfo.value) !== '{}');

    const useCheckPin = () => !!pin.value && pin.length === 6 && parseInt(pin.value, 10) > 100000;
    const useSearchUserId = async (client) => {
      const is_uuid = validate(opponent_id.value);
      const res = is_uuid
        ? { user_id: opponent_id.value }
        : await client.user.search(opponent_id.value);
      return res;
    };
    const useSubmitWithdrawal = async () => {
      const clientInfo = ls.get(appId.value);
      const client = useClient($message, t, clientInfo, true);
      const is_transfers = !opponent_id.value.startsWith('XIN');
      const type = is_transfers ? 'transfer' : 'raw';

      let opponent = { opponent_key: opponent_id.value };
      if (is_transfers) {
        const res = await useSearchUserId(client);
        if (!res || !res.user_id) {
          $message.error({ message: t('message.errors.mixin_id'), showClose: true });
          return;
        }
        opponent = { opponent_id: res.user_id };
      }

      const params = {
        amount: amount.value,
        asset_id: asset.value.asset_id,
        pin: pin.value,
        trace_id: uuid(),
        ...opponent,
      };

      const res = is_transfers
        ? await client.transfer.toUser(params.pin, params)
        : await client.transfer.toAddress(params.pin, params);
      if (res && res.type === type) {
        $message.success({
          message: t('message.success.withdrawal'),
          showClose: true,
        });
        useClearWithdrawal();
        transactionInfo.value = res;
      }
    };



    return {
      loading,
      showWithdrawal,
      asset,
      amount,
      pin,
      opponent_id,
      showSnapshot,
      confirmContent,
      useClickSubmit,
      useClickCancel,
      useClickConfirm,
      useCloseConfirm,
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

.iconguanbi {
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

    .iconguanbi {
      display: none;
    }
  }

  .mask {
    .iconguanbi {
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
