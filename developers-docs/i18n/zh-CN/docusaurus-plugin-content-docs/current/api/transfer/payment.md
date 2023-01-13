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

这个接口主要实现了两个功能:

1. 生成一个多签支付的 code, 相关注意事项  
  a. 需要授权才能访问  
  b. 如果 trace_id 不是自己的，会返回 403  
  c. 如果已经支持 state 值是 paid, 未支付是 pending

1. 或者检查支付参数是否正确。  
  a. 不需要授权访问  
  b. 如果已经支持 state 值是 paid, 未支付是 pending

<APIEndpoint url="/payments" />

<APIMetaPanel scope="Authorized" scopeNote="" />

### 生成多签支持的请求参数

<APIPayload>{`{
  "asset_id":     "资产的 uuid",
  "amount":       "金额, 例如: "0.01"",
  "trace_id":     "防止重复转帐或提现",
  "memo":         "可选，最大 200 字符",
  "opponent_multisig": {
    "receivers":    "接收者的数组, 最大 256",
    "threshold":    "数字，需要小于等于接收者",
  },
}
`}</APIPayload>

### 检测支付参数及状态

<APIPayload>{`{
  "asset_id":     "资产的 uuid",
  "amount":       "金额, 例如: "0.01"",
  "trace_id":     "防止重复转帐或提现",
  "opponent_id":  "可选，接收者 uuid",
  "address_id":   "可选，地址的 uuid",
  "destination":  "提现地址",
  "tag":          "可选, 提现备注"
}
`}</APIPayload>

<APIRequest
  title="Generate a multisig payment"
  method="POST"
  url='/payments --data {"asset_id":"c6d0c728-2624-429b-8e0d-d9d19b6592fa","amount":"0.01","trace_id":"c6d0c728-2624-429b-8e0d-d9d19b6592fa","memo":"","opponent_multisig":{"receivers":["c6d0c728-2624-429b-8e0d-d9d19b6592fa","c6d0c728-2624-429b-8e0d-d9d19b6592fa"],"threshold":1}}'
/>

<APIResponse name="payment" />

<APIRequest
  title="Validate payment"
  method="POST"
  url='/payments --data {"asset_id":"c6d0c728-2624-429b-8e0d-d9d19b6592fa","amount":"0.01","trace_id":"c6d0c728-2624-429b-8e0d-d9d19b6592fa","address_id":"c6d0c728-2624-429b-8e0d-d9d19b6592fa"}'
/>

<APIRequest
  title="Validate payment"
  method="POST"
  url='/payments --data {"asset_id":"c6d0c728-2624-429b-8e0d-d9d19b6592fa","amount":"0.01","trace_id":"c6d0c728-2624-429b-8e0d-d9d19b6592fa","opponent_id":"c6d0c728-2624-429b-8e0d-d9d19b6592fa"}'
/>

<APIRequest
  title="Validate payment"
  method="POST"
  url='/payments --data {"asset_id":"c6d0c728-2624-429b-8e0d-d9d19b6592fa","amount":"0.01","trace_id":"c6d0c728-2624-429b-8e0d-d9d19b6592fa","destination":"3GqjTwAwWyJ2YZ3v1vYPCkC4SzwVHLgivj","key":""}'
/>
