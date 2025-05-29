import { base64RawURLEncode } from "@mixin.dev/mixin-node-sdk"
import { ref, inject } from "vue"
import { defineStore } from "pinia"
import { useI18n } from "vue-i18n"
import { v4 as uuid, parse } from "uuid"
import qs from "qs"

export const useDepositModalStore = defineStore("deposit", () => {
  const $message = inject("$message")
  const { t } = useI18n()

  const show = ref(false)
  const loading = ref(false)
  const amount = ref("")
  const appId = ref("")

  const useInitDeposit = (id) => {
    show.value = true
    appId.value = id
    amount.value = ""
  }

  const useCloseDepositModal = () => {
    show.value = false
    appId.value = ""
    amount.value = ""
  }

  const generateMixPayUrl = (asset, amount, memo, returnTo) => {
    const baseUrl = "https://mixpay.me/pay"
    const params = {
      payeeId: "3c2bf6e7-fa74-4764-a4f3-79a24fab814f",
      settlementAssetId: asset,
      quoteAssetId: "usd",
      quoteAmount: amount,
      traceId: uuid(),
      settlementMemo: memo,
      returnTo,
    }
    const query = qs.stringify(params)
    return `${baseUrl}?${query}`
  }

  const buildPaymentMemo = (user_id) => {
    const extra = JSON.stringify({
      u: user_id,
      e: "buy app credit",
    })
    const version = Buffer.from([1])
    const payee = Buffer.from(parse("fbd26bc6-3d04-4964-a7fe-a540432b16e2"))
    const extraBuf = Buffer.from(extra)
    return base64RawURLEncode(Buffer.concat([version, payee, extraBuf]))
  }

  const useClickDepositButton = () => {
    if (!amount.value || isNaN(Number(amount.value)) || Number(amount.value) <= 0) {
      $message.error(t("Please enter a valid amount"))
      return
    }

    const url = generateMixPayUrl("4d8c508b-91c5-375b-92b0-ee702ed2dac5", amount.value, buildPaymentMemo(appId.value), window.location.href)
    window.location.href = url
  }

  return {
    show,
    loading,
    amount,
    appId,
    useInitDeposit,
    useCloseDepositModal,
    useClickDepositButton,
  }
})
