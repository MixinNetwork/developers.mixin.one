---
title: 待确认充值记录
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

## GET /external/transactions

获取公开的在途充值记录。大部分区块链需要多个确认才能确保交易不可回滚。

<APIEndpoint url="/external/transactions?offset=:offset&limit=:limit&asset=:asset&destination=:destination&tag=:tag" />

<APIMetaPanel scope="" />

<APIParams
  p-offset="分页起始时间，RFC3339Nano 格式，例如 `2020-12-12T12:12:12.999999999Z`"
  p-offset-required={true}
  p-limit="每页数量，默认 500，最大 500"
  p-limit-required={true}
  p-asset="可选，资产的 asset_id，用于筛选指定资产的充值"
  p-destination="可选，筛选目标地址的在途充值"
  p-transaction_hash="可选，根据交易哈希筛选"
  p-source="可选，当为 blockchain 时表示从链上抓取记录"
  p-user="可选，用户 UUID，用于查询某个用户的充值记录"
/>

### 参数组合示例

1. `user=uuid`：查询指定用户的在途充值，需要授权 token。
2. `source=blockchain&asset=uuid&transaction_hash=7842f9c26f24b8a86de1a28d8bf0e39cfebd8a5bbb3f2d3aa5be82d44df35ac5`：根据链上交易哈希查询在途充值。
3. `source=blockchain&asset=uuid&destination=1AK4LYE6PYwBmSYHQX3v2UsXXHTvCAsJeK`：根据链上地址查询在途充值。
4. `transaction_hash=7842f9c26f24b8a86de1a28d8bf0e39cfebd8a5bbb3f2d3aa5be82d44df35ac5`：直接根据交易哈希查询。
5. `asset=uuid&offset=2020-12-12T12:12:12.999999999Z&limit=100`：按资产筛选在途充值。
6. `destination=1AK4LYE6PYwBmSYHQX3v2UsXXHTvCAsJeK&offset=2020-12-12T12:12:12.999999999Z&limit=100`：按地址筛选在途充值。

<APIRequest
  title="Read deposit progress info"
  isPublic
  url="/external/transactions?destination=1AK4LYE6PYwBmSYHQX3v2UsXXHTvCAsJeK"
/>

```json title="Response"
{
  "data": [{
    "type":             "transaction",
    "transaction_id":   "ab56be4c-5b20-41c6-a9c3-244f9a433f35",
    "transaction_hash": "axt..ze",
    "sender":           "137FkAtj1KcVKKt4tPeP1Djz3Nvc5DEYri",
    "amount":           "10.0",
    "destination":      "1AK4LYE6PYwBmSYHQX3v2UsXXHTvCAsJeK",
    "tag":              "",
    "asset_id":         "43d61dcd-e413-450d-80b8-101d5e903357",
    "chain_id":         "43d61dcd-e413-450d-80b8-101d5e903357",
    "confirmations":    1,
    "threshold":        12,
    "created_at":       "2018-05-03T10:08:34.859542588Z"
  },
  ...
  ]
}
```
