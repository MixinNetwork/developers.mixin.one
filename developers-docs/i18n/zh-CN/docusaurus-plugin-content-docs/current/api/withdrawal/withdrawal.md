---
title: 提现
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

## POST /withdrawals

创建一个提现请求

:::info
It costs fee to withdrawal. To get the fee, use [`GET /assets/{asset_id}/fee`](/zh-CN/docs/api/assets/fee).
:::

<APIEndpoint url="/withdrawals" />

<APIMetaPanel scope="Authorized" scopeNote="" />

<APIPayload>{`{
  "address_id": "提现之前创建的地址的 uuid",
  "amount":     "e.g. '100000'",
  "trace_id":   "uuid 格式, 防止重复提现",
  "pin_base64": "加密的 PIN 用 base64 格式",
  "asset_id": "可选, 提现资产的 uuid",
  "destination": "可选, 提现地址",
  "tag": "可选, 提现备注",
}
`}</APIPayload>

## TIP Pin 结构

```
"TIP:WITHDRAWAL:CREATE:" + address_id + amount + fee + trace_id + memo

pin 是上面值的 sha256-256 的结果
```

### 请求参数说明

1. address_id 是指先创建地址，然后用地址地址
2. 可选方式, 直接用 `asset_id`, `destination` 跟 `tag` 来提现

<APIRequest
  title="Request to withdrawal"
  method="POST"
  url='/withdrawals --data &apos;{"amount":"100","address_id":"43d61dcd-e413-450d-80b8-101d5e903357","pin":"xDcSiAsvsekYpnxEShqLgecvQ4GhP7o660nOodK9BG7k+xsszxO56Yg6DQLWtOek","trace_id":"ca90fd5b-e047-4a66-affa-2b40f026b165"}&apos;'
/>

```json title="Response"
{
  "data": {
    "type": "withdrawal",
    "snapshot_id": "ab56be4c-5b20-41c6-a9c3-244f9a433f35",
    "transaction_hash": "axt...ze",
    "asset_id": "43d61dcd-e413-450d-80b8-101d5e903357",
    "amount": "-10",
    "trace_id": "7c67e8e8-b142-488b-80a3-61d4d29c90bf",
    "created_at": "2018-05-03T10:08:34.859542588Z"
  }
}
```
