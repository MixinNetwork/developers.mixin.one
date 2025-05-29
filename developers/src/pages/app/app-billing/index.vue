<template>
  <div class="container">
    <div class="billing-list flex">
      <div class="item-billing">
        <div class="billing-item">
          <div>
            <div>
              <img src="@/assets/img/svg/database.svg" alt="app-database-icon" />
              <span class="title">{{ t("billing.credit_balance") }}</span>
            </div>
            <p class="balance">$9,895.99 (TODO)</p>

            <button @click="useClickPay" :class="['primary', 'deposit', !allowSubmit ? 'not-finished' : '']">{{ t("billing.pay_btn") }}</button>
          </div>
        </div>
      </div>

      <div class="item-billing">
        <div class="billing-item">
          <div>
            <div>
              <img src="@/assets/img/svg/pie.svg" alt="app-database-icon" />
              <span class="title">{{ t("billing.total") }}</span>
            </div>

            <div class="billing-item-total">
              <span>{{ t("billing.subuser_count") }}</span>
              <span>100 (TODO)</span>
              <span>{{ t("billing.address_count") }}</span>
              <span>100 (TODO)</span>
              <span>{{ t("billing.deposit_count") }}</span>
              <span>100 (TODO)</span>
            </div>
          </div>
        </div>
      </div>

      <div class="item-billing table-item">
        <div class="billing-item">
          <div class="billing-item-service-charge">
            <span class="title">{{ t("billing.service_charge") }}</span>
            <el-date-picker type="month" v-model="date" :editable="false" :clearable="false"> </el-date-picker>
          </div>

          <table>
            <thead>
              <tr>
                <td>{{ t("billing.service") }}</td>
                <th class="quantity-col">Quantity</th>
                <th class="price-col">Unit Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ t("billing.create_subuser") }}</td>
                <td class="quantity-col">1(TODO)</td>
                <td class="price-col">$0.5(TODO)</td>
                <td>$0.5(TODO)</td>
              </tr>
              <tr>
                <td>{{ t("billing.create_ethereum_address") }}</td>
                <td class="quantity-col">1(TODO)</td>
                <td class="price-col">$0.5(TODO)</td>
                <td>$0.5(TODO)</td>
              </tr>
              <tr>
                <td>{{ t("billing.create_polygon_address") }}</td>
                <td class="quantity-col">1(TODO)</td>
                <td class="price-col">$0.5(TODO)</td>
                <td>$0.5(TODO)</td>
              </tr>
              <tr>
                <td>{{ t("billing.bitcoin_deposit") }}</td>
                <td class="quantity-col">1(TODO)</td>
                <td class="price-col">$0.5(TODO)</td>
                <td>$0.5(TODO)</td>
              </tr>
            </tbody>
          </table>
          <div class="billing-total">{{ t("billing.total") }} <span>$55.5(TODO)</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toRefs, reactive, inject, watch, computed, ref } from "vue"
import { useI18n } from "vue-i18n"
import { useUserClient } from "@/api"
import { useDepositModalStore } from "@/stores"

export default {
  name: "app-billing",
  props: {
    appId: String,
  },
  setup(props) {
    const date = ref(new Date())

    const $message = inject("$message")
    const { t } = useI18n()
    const { useInitDeposit } = useDepositModalStore()

    const state = reactive({
      bill: undefined,
    })

    const allowSubmit = computed(() => true) // Always allow deposit button click

    const userClient = useUserClient($message, t)

    const useFetchAppBilling = async (appId) => {
      appId = appId || props.appId
      if (appId) {
        const bill = await userClient.app.billing(appId)
        if (bill.cost) {
          bill.cost.total = Number(bill.cost.users) + Number(bill.cost.resources)
        }
        return bill
      }
      return { credit: 0, cost: { users: 0, resources: 0 } }
    }

    const useClickPay = () => {
      useInitDeposit(props.appId)
    }

    watch(
      () => props.appId,
      async (appId) => {
        state.bill = await useFetchAppBilling(appId)
      },
      { immediate: true }
    )

    return {
      ...toRefs(state),
      useClickPay,
      allowSubmit,
      date,
      t,
    }
  },
}
</script>

<style lang="scss" scoped>
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
  border-radius: 0.25rem;
  box-sizing: border-box;
  position: relative;
  margin-bottom: 0.5rem;

  img {
    border-radius: 0;
    margin-right: 0.875rem;
    transform: translate(0, 0.125rem);
  }

  span {
    font-weight: 700;
  }

  span.title {
    text-transform: uppercase;
  }

  .billing-item-service-charge {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 0rem;

    :deep(.el-input__prefix) {
      display: none;
    }

    :deep(.el-input__wrapper) {
      width: 100px;
      border-radius: 8px;
      background: #f6f9ff;
      box-shadow: none;
    }

    :deep(.el-date-editor.el-input, .el-date-editor.el-input__wrapper) {
      width: inherit;
    }

    :deep(.el-input__inner) {
      text-align: center;
    }
  }

  .billing-item-total {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 1.25rem;
    padding-top: 2rem;

    span:nth-child(odd) {
      color: #a9b0bf;
      font-weight: 400;
      line-height: normal;
    }

    span:nth-child(even) {
      color: #333;
      font-size: 1.125rem;
      font-weight: 500;
      line-height: 1.25rem;
    }
  }

  i {
    margin-right: 0.875rem;
    font-weight: 1000;
  }

  p.balance {
    align-self: stretch;
    color: #333;
    font-size: 2rem;
    font-style: normal;
    font-weight: 600;
    line-height: 1.5rem;
    padding-top: 2rem;
  }

  button.deposit {
    margin-top: 2rem;
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

  .billing-total {
    height: 3.75rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 2rem;

    border-radius: 0px 0px 4px 4px;
    box-shadow: 0px -1px 2px 0px rgba(28, 77, 174, 0.1);

    color: #333;
    font-size: 0.875rem;
    font-weight: 400;

    span {
      font-size: 1.25rem;
      font-weight: 500;
      margin-left: 0.5rem;
    }
  }

  table {
    margin-top: 2rem;
    border-collapse: collapse;

    thead {
      display: block;
      padding-top: 0.125rem;
      padding-bottom: 0.75rem;
    }

    tbody {
      display: block;
    }

    tr {
      display: table;
      width: 100%;
      table-layout: fixed;
    }

    th,
    td {
      display: table-cell;

      &:nth-child(1) {
        width: 40%;
        padding-left: min(1.25rem, 2.5%);
        padding-right: 2.5%;
      }

      &:nth-child(2) {
        width: 15%;
        padding-left: 2.5%;
        padding-right: 2.5%;
      }

      &:nth-child(3) {
        width: 15%;
        padding-left: 2.5%;
        padding-right: 2.5%;
      }

      &:nth-child(4) {
        width: 15%;
        padding-left: 2.5%;
      }
    }

    th {
      text-align: left;
      color: #a9b0bf;
      font-size: 0.875rem;
      font-weight: 400;
    }

    tbody tr {
      height: 3.75rem;
      transition: background-color 0.2s ease;

      &:hover,
      &:focus-within {
        background: #f6f9ff;
      }
    }

    td {
      color: #333;
      font-family: "SF Pro Text";
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      vertical-align: middle;
    }
  }
}

.item-billing {
  width: 50%;
  padding: 1rem;

  &.table-item {
    width: 100%;
  }
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

    .item-billing {
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

  .quantity-col,
  .price-col {
    display: none;
  }

  table {
    th,
    td {
      &:nth-child(1) {
        width: 60%;
        padding-left: min(1.25rem, 2.5%);
        padding-right: 2.5%;
      }

      &:nth-child(2),
      &:nth-child(3) {
        display: none;
      }

      &:nth-child(4) {
        width: 40%;
        padding-left: 2.5%;
      }
    }
  }
}
</style>
