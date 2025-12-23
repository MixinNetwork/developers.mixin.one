---
 title: 查询提现手续费
 sidebar_position: 4
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
} from "@site/src/components/api";

## GET /safe/assets/:id/fees

查询某资产的可能提现手续费。手续费可能会随着目的地址/域名以及网络状况变化。

<APIEndpoint url="/safe/assets/:id/fees" />

<APIMetaPanel scope="ASSETS:READ" scopeNote="" />

<APIParams
  p-id="资产的 asset_id"
  p-id-required={true}
  q-destination="可选。用于计算链上手续费的目的地址（或地址+memo/tag），部分链路与地址相关。"
  q-domain="可选。若使用人类可读域名，提供其域名以解析目的地址。"
/>

<APIRequest
  title="查询提现手续费"
  url="/safe/assets/3596ab64-a575-39ad-964e-43b37f44e8cb/fees?destination=0x0000000000000000000000000000000000000000&domain=ens"
/>

### 响应

返回手续费对象数组。

```json
[
  {
    "type": "withdrawal_fee",
    "asset_id": "3596ab64-a575-39ad-964e-43b37f44e8cb",
    "amount": "0.001",
    "priority": "normal"
  }
]
```

## 字段说明

| 字段 | 类型 | 说明 |
|:--|:--|:--|
| `type` | string | 对象类型。本接口恒为 `withdrawal_fee`。 |
| `asset_id` | string | 手续费对应的资产 ID。 |
| `amount` | string | 该优先级下的预估手续费，十进制字符串。 |
| `priority` | string | 手续费优先级，例如 `slow`、`normal`、`fast`。 |

