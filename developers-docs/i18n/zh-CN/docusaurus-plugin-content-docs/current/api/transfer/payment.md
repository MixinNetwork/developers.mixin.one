---
title: 创建或者检查支持
sidebar_position: 10
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
  APIResponse,
} from "@site/src/components/api";

import RespTransfer from "../../_partials/_resp.transfer.md";

## POST /payments

创建一个多签支付，或者检查支付是否完成。

<APIEndpoint url="/payments" />

<APIMetaPanel scope="Authorized" scopeNote="" />

<APIPayload>{`{
  "asset_id":     "资产的 uuid",
  "amount":       "金额, 例如: "0.01"",
  "trace_id":     "可选，防止重复转帐或提现",
  "memo":         "可选，最大 200 字符",
  "opponent_multisig": {
    "receivers":    "接收者的数组, 最大 256",
    "threshold":    "数字，需要小于等于接收者",
  },
}
`}</APIPayload>

<APIRequest
  title="Generate a multisig payment"
  method="POST"
  url="/payments --data PAYLOAD"
/>

<APIResponse name="payment" />
