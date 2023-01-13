---
title: 充值中交易列表
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

## GET /external/transactions

获取正在充值中的交易记录。大部分的区块链都需要一定的确认数来确保交易不可逆。这个接口用来查询这些记录。

<APIEndpoint url="/external/transactions?offset=:offset&limit=:limit&asset=:asset&destination=:destination&tag=:tag" />

<APIMetaPanel scope="" />

<APIParams
  p-offset="分页参数, RFC3339Nano 格式, e.g. `2020-12-12T12:12:12.999999999Z`."
  p-limit="分页条数, 默认是 500, 最大是 500"
  p-asset="可选项, 资产 asset_id, 获取某个资产相关的正在充值记录"
  p-destination="可选项, 获取一个地址的正在充值记录"
  p-tag="可选项, 提现地址的 memo 跟 destination 配合使用"
  p-transaction_hash="可选项，根据 transaction hash 查询"
  p-source="可选项, 当设置为 blockchain 从区块链获取相关记录"
  p-user="可选项, 用户的 uuid, 获取该用户的充值中记录，请注意目前只能获取自己的"
/>

### 请求参数分组

1. `user=uuid`, 获取该用户的充值中记录，需要 authorization token
1. `source=blockchain&asset=uuid&transaction_hash=7842f9c26f24b8a86de1a28d8bf0e39cfebd8a5bbb3f2d3aa5be82d44df35ac5` 从区块链根据 hash 获取资产的充值中记录
1. `source=blockchain&asset=uuid&destination=1AK4LYE6PYwBmSYHQX3v2UsXXHTvCAsJeK` 从区块链根据地址获取资产的充值中记录
1. `transaction_hash=7842f9c26f24b8a86de1a28d8bf0e39cfebd8a5bbb3f2d3aa5be82d44df35ac5` 根据 hash 获取充值中记录
1. `asset=uuid&offset=2020-12-12T12:12:12.999999999Z&limit=100` 获取资产的充值中记录
1. `destination=1AK4LYE6PYwBmSYHQX3v2UsXXHTvCAsJeK&offset=2020-12-12T12:12:12.999999999Z&limit=100` 获取地址的充值中记录

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
