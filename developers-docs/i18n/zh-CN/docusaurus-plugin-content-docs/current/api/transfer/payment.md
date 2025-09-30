---
title: 生成支付请求
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

import RespTransfer from "@site/docs/_partials/_resp.transfer.md";

## POST /payments

该接口有两个用途：

1. 创建多签支付码：  
   a. 需要携带授权 token  
   b. 如果 `trace_id` 不正确会返回 403  
   c. 若支付已存在，state 为 `paid`，否则为 `pending`

2. 校验支付参数：  
   a. 公共接口，无需授权 token  
   b. 若支付已存在，state 为 `paid`，否则为 `pending`

<APIEndpoint url="/payments" />

<APIMetaPanel scope="Authorized" scopeNote="" />

<APIPayload>{`{
  "asset_id":     "转出的资产 ID",
  "amount":       "例如 \"0.01\"，支持小数点后最多 8 位",
  "trace_id":     "用于防止重复支付，可选",
  "memo":         "备注，可选，最多 200 个字符",
  "opponent_multisig": {
    "receivers":    "成员 ID 数组，最多 256 人",
    "threshold":    "数字，不得大于 receivers 数量"
  }
}
`}</APIPayload>

<APIRequest
  title="Generate a multisig payment"
  method="POST"
  url="/payments --data PAYLOAD"
/>

<APIResponse name="payment" />

### 校验支付参数

<APIPayload>{`{
  "asset_id":     "转出的资产 ID",
  "amount":       "例如 \"0.01\"，支持小数点后最多 8 位",
  "trace_id":     "用于防止重复支付，可选",
  "opponent_id":  "可选，接收方 uuid",
  "address_id":   "可选，提现地址 uuid",
  "destination":  "可选，提现地址",
  "tag":          "可选，提现备注"
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
