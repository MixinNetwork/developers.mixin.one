---
title: 读取多签的 Outputs
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

## GET /multisigs/outputs

<APIEndpoint url="/multisigs/outputs?members=:members&threshold=:threshold&state=:state&offset=:offset&limit=:limit&order=created" />

<APIMetaPanel scope="Authorized" />

<APIParams
  p-state="可选项，UTXO 的状态, 包含: unspent, signed, spent."
  p-offset="可选项，分页起始时间, RFC3339Nano format, 例如 `2020-12-12T12:12:12.999999999Z`."
  p-limit="可选项，分页返回的数量, 默认 500 条, 最多 500 条"
  p-order="可选项, 'created' || 'updated', 默认是 updated_at, 只有 asc"
  p-members="参与多签的人的哈希，参考示例 hashMembers"
  p-threshold="integer, 跟 members 一起用, 多签的 threshold, 例如 2/3, threshold = 2"
/>

用户只能拿到自己所有多签的 outputs, 请注意，一个人的话 members 是 1/1 的签名，threshold 是 1.

下面是 member hash 的 golang 代码示例:

```go
func hashMembers(ids []string) string {
 sort.Slice(ids, func(i, j int) bool { return ids[i] < ids[j] })
 var in string
 for _, id := range ids {
  in = in + id
 }
 return crypto.NewHash([]byte(in)).String()
}
```

<APIRequest
  title="Get Multisig Outputs"
  url="/multisigs/outputs?members=:members&threshold=:threshold&limit=500&offset=2006-01-02T15:04:05.999999999Z&state=spent&order=created"
/>

```json title="Response"
{
  "data": {
    "type": "multisig_utxo",
    "user_id": "ab56be4c-5b20-41c6-a9c3-244f9a433f35",
    "utxo_id": "a465ffdb-4441-4cb9-8b45-00cf79dfbc46",
    "asset_id": "43d61dcd-e413-450d-80b8-101d5e903357",
    "transaction_hash": "29828149577920ccc9d90768012f95768b7d1a925c4189b912c343dbb000180e",
    "output_index": 0,
    "amount": "10",
    // The number of members must reach the threshold to make a transaction effective.
    "threshold": "2",
    // The members participating the multi-signature.
    "members": [
      "ab56be4c-5b20-41c6-a9c3-244f9a433f35",
      "ab56be4c-5b20-41c6-a9c3-244f9a433f35",
      "ab56be4c-5b20-41c6-a9c3-244f9a433f35"
    ],
    "memo": "hello",
    "state": "spent",
    "signed_tx": "298281....4952f95768b7d1a925c4189b912c343dbb000180e",
    "signed_by": "298281....4952f95768b7d1a925c4189b912c343dbb000180e",
    "created_at": "2018-05-03T10:08:34.859542588Z",
    "updated_at": "2018-05-03T10:08:34.859542588Z"
  }
}
```

如果 `signed_tx` 跟 `signed_by` 有值 state 是 signed. `signed_by` 是谁完成签名, signed_tx 是交易的签名内容
