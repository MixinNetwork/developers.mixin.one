<template>
  <d-modal :show="show" :loading="loading">
    <div class="deposit-modal">
      <img @click="useCloseDepositModal" src="@/assets/img/app-svg/close.svg" alt="close-modal-btn" class="close-btn" />

      <h3 class="modal-title">{{ t("billing.pay_label") }}</h3>

      <div class="input-container">
        <input v-model="customAmount" type="number" step="0.01" min="0" placeholder="Credit Amount" class="amount-input" @input="onCustomAmountChange" />
      </div>

      <div class="radio-container">
        <label v-for="option in amountOptions" :key="option" class="radio-option" :class="{ active: selectedAmount === option }">
          <input type="radio" :value="option" v-model="selectedAmount" @change="onAmountSelect(option)" />
          <span class="radio-label">${{ option }}</span>
        </label>
      </div>

      <div class="button-container">
        <button @click="useCloseDepositModal" class="btn-cancel">
          {{ t("button.cancel") }}
        </button>
        <button @click="useClickDepositButton" class="btn-deposit primary">
          {{ t("billing.pay_btn") }}
        </button>
      </div>
    </div>
  </d-modal>
</template>

<script>
import { ref, watch } from "vue"
import { storeToRefs } from "pinia"
import { useI18n } from "vue-i18n"
import DModal from "@/components/Modals/DModal.vue"
import { useDepositModalStore } from "@/stores"

export default {
  name: "deposit-modal",
  components: { DModal },
  setup() {
    const { t } = useI18n()

    const modalStore = useDepositModalStore()
    const { show, loading, amount } = storeToRefs(modalStore)
    const { useClickDepositButton, useCloseDepositModal } = modalStore

    const customAmount = ref("")
    const selectedAmount = ref("")
    const amountOptions = [20, 100, 500, 1000, 10000]

    const onAmountSelect = (option) => {
      selectedAmount.value = option
      customAmount.value = option.toString()
      amount.value = option.toString()
    }

    const onCustomAmountChange = () => {
      if (customAmount.value) {
        selectedAmount.value = ""
        amount.value = customAmount.value
      }
    }

    watch(show, (newValue) => {
      if (newValue) {
        customAmount.value = ""
        selectedAmount.value = ""
        amount.value = ""
      }
    })

    return {
      show,
      loading,
      amount,
      customAmount,
      selectedAmount,
      amountOptions,
      useClickDepositButton,
      useCloseDepositModal,
      onAmountSelect,
      onCustomAmountChange,
      t,
    }
  },
}
</script>

<style lang="scss" scoped>
.deposit-modal {
  max-height: 50.75rem;
  min-width: calc(100vw - 4.75rem);
  max-width: calc(100vw - 7.5rem);
  padding: 0 1.25rem;
  box-sizing: border-box;

  .close-btn {
    position: absolute;
    top: 1.25rem;
    right: 1.25rem;
    padding: 0.3125rem;
    box-sizing: initial;
    width: 0.875rem;
    height: 0.875rem;
    cursor: pointer;
    z-index: 10;
    display: none;
  }

  .modal-title {
    margin-top: 3.125rem;
    margin-bottom: 1.5rem;
    font-weight: 700;
    text-align: center;
    color: #333;
  }

  .input-container {
    margin-bottom: 0.75rem;

    .amount-input {
      width: 100%;
      height: 3.75rem;
      padding: 0 1.25rem;
      font-size: 1rem;
      background: #f6f9ff;
      border: none;
      border-radius: 0.25rem;
      box-sizing: border-box;

      &:focus {
        outline: none;
        box-shadow: 0 0 0 0.125rem rgba(61, 117, 227, 0.1);
      }

      &::placeholder {
        color: #a9b0bf;
      }
    }
  }

  .radio-container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-bottom: 2.5rem;
    justify-items: center;
    justify-content: center;
    align-items: center;

    .radio-option {
      position: relative;
      cursor: pointer;

      input[type="radio"] {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
      }

      .radio-label {
        display: inline-block;
        padding: 0.375rem 1.25rem;
        background: #f6f9ff;
        border: 0.0625rem solid #d7dde7;
        border-radius: 1.25rem;
        font-size: 0.875rem;
        font-weight: 500;
        color: #333;
        transition: all 0.2s ease;
        min-width: 5rem;
        text-align: center;
        height: 2rem;
        box-sizing: border-box;
        line-height: 1.125rem;
      }

      &:hover .radio-label {
        border-color: #3277ff;
        background: rgba(50, 119, 255, 0.05);
      }

      &.active .radio-label {
        background: rgba(50, 119, 255, 0.12);
        border-color: #3277ff;
        color: #333;
      }
    }
  }

  .button-container {
    display: flex;
    gap: 0.75rem;
    justify-content: center;
    margin-bottom: 3.125rem;

    button {
      width: 8.75rem;
      height: 2.5rem;
      font-size: 0.9375rem;
      border-radius: 0.25rem;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        opacity: 0.8;
      }
    }

    .btn-cancel {
      background-color: #e5e7ec;
      color: #333;
      border: none;
    }

    .btn-deposit {
      background: #3d75e3;
      border: none;
      color: white;

      &:disabled {
        background: #a9b0bf;
        cursor: not-allowed;
        opacity: 1;
      }
    }
  }
}

@media screen and (max-width: 37.5rem) {
  .deposit-modal {
    min-width: calc(100vw - 4.75rem);

    .close-btn {
      display: block;
    }

    .modal-title {
      margin-top: 2.5rem;
    }

    .button-container {
      margin-bottom: 2.5rem;

      .btn-cancel {
        display: none;
      }

      .btn-deposit {
        flex: 1;
        width: auto;
      }
    }
  }
}

@media screen and (min-width: 37.5rem) and (max-width: 48rem) {
  .deposit-modal {
    min-width: 31.25rem;
    max-width: 37.5rem;
    padding: 0 2.5rem;
  }
}

@media screen and (min-width: 48rem) {
  .deposit-modal {
    min-width: 31.25rem;
    max-width: 37.5rem;
    padding: 0 3.75rem;
  }
}
</style>
