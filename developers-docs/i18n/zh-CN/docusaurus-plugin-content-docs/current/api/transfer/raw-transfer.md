---
title: 发送原始交易
sidebar_position: 2
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";
import RespTransferMainnet from "@site/docs/_partials/_resp.transfer-mainnet.md";
import RespTransferMultisig from "@site/docs/_partials/_resp.transfer-multisig.md";

## POST /transactions

该接口可向主网发送原始交易，支持主网地址和多签地址。

### 转账至主网地址

向指定主网地址转账。

<APIEndpoint url="/transactions" />

<APIMetaPanel scope="Authorized" scopeNote="" />

<APIPayload>{`{
  "asset_id":     "转出的资产 ID",
  "opponent_id":  "目标主网地址",
  "amount":       "例如 \"0.01\"，支持小数点后最多 8 位",
  "pin_base64":   "加密后的 PIN",
  "trace_id":     "用于防止重复支付，可选",
  "memo":         "备注，可选，最多 140 个字符"
}
`}</APIPayload>

## 生成 TIP PIN

```
"TIP:TRANSACTION:CREATE:" + assetId + counterUserId + amount + traceId + memo

pin_base64 为上述字符串的 sha256-256 摘要
```

<APIRequest
  title="Transfer to Mainnet"
  method="POST"
  url='/transactions --data &apos;{"amount":"10","asset_id":"43d61dcd-e413-450d-80b8-101d5e903357","opponent_key":"XINDEhAA8ArWDJBF5fJQvrtKdZQ4X28KmkScm5FtwdJGx9CiB1Hjadk4baMLMRjsGY5L8QDbVKuC7jvep1m8k4zZN7BGvvXP","memo":"hello","pin":"F39IsJmUaZW03VMV/01lHyY2RCoZ7/X764akX+EmthIc4uVsWAWQTM/IxX5Z9C1y","trace_id":"7c67e8e8-b142-488b-80a3-61d4d29c90bf"}&apos;'
/>

<RespTransferMainnet />

### 转账至多签地址

向指定多签地址转账。

<APIEndpoint url="/transactions" />

<APIMetaPanel scope="Authorized" scopeNote="" />

<APIPayload>{`{
  "asset_id":     "转出的资产 ID",
  "opponent_multisig":  "多签对象，标识收款地址",
  "amount":       "例如 \"0.01\"，支持小数点后最多 8 位",
  "pin":          "加密后的 PIN",
  "trace_id":     "用于防止重复支付，可选",
  "memo":         "备注，可选，最多 140 个字符"
}
`}</APIPayload>

```json title="opponent_multisig"
{
  "receivers": [
    "user_id",
    "user_id",
    ...
  ],
  "threshold": 3
}
```

<APIRequest
  title="Transfer to Mainnet"
  method="POST"
  url='/transactions --data &apos;{"amount":"10","asset_id":"43d61dcd-e413-450d-80b8-101d5e903357","opponent_multisig":{"receivers": ["00c5a4ae-dcdc-48db-ab8e-a7eef69b441d","087e91ff-7169-451a-aaaa-5b3297411a4b","105f6e8b-d249-4b4d-9beb-e03cefaebc37"], "threshold": 2},"memo":"hello","pin":"F39IsJmUaZW03VMV/01lHyY2RCoZ7/X764akX+EmthIc4uVsWAWQTM/IxX5Z9C1y","trace_id":"7c67e8e8-b142-488b-80a3-61d4d29c90bf"}&apos;'
/>

<RespTransferMultisig />
