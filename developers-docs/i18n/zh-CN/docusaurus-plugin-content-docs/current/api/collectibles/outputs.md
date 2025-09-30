---
title: 读取藏品输出
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
  APIResponse,
} from "@site/src/components/api";

## GET /collectibles/outputs

<APIEndpoint url="/collectibles/outputs?state=:state&offset=:offset&limit=:limit&members=:members&threshold=:threshold" />

<APIMetaPanel scope="Authorized" />

<APIParams
  p-state="可选，UTXO 状态，如 unspent、signed、spent"
  p-offset="可选，分页起始时间，RFC3339Nano 格式，例如 `2020-12-12T12:12:12.999999999Z`"
  p-limit="可选，每页数量，默认 500，最大 500"
  p-members="与 threshold 搭配使用，用于多签成员的哈希"
  p-threshold="整数，与 members 搭配使用，多签阈值，例如 2/3 时 threshold = 2"
/>

如果账号参与了藏品多签，可通过 `members` 与 `threshold` 参数筛选数据。

以下为生成多签成员哈希的 Golang 示例：

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
  title="Get collectibles Outputs"
  url="/collectibles/outputs?members=:members&threshold=:threshold&limit=500&offset=2006-01-02T15:04:05.999999999Z&state=spent"
/>

<APIResponse name="collectible_output" />

当状态为 signed 时，`signed_tx` 与 `signed_by` 才会有值。其中 `signed_by` 表示交易哈希，`signed_tx` 是完整的交易内容，`signed_by` 可用于对待签交易进行排序。

## GET /collectibles/tokens/UUID

查询藏品 token 信息。

<APIEndpoint url="/collectibles/tokens/UUID" />

<APIRequest
  title="Get collectibles token"
  url="/collectibles/tokens/ab56be4c-5b20-41c6-a9c3-244f9a433f35"
/>

<APIResponse name="collectible_token" />

## GET /collectibles/collections/UUID

查询收藏品集合的信息。

<APIEndpoint url="/collectibles/collections/UUID" />

<APIRequest
  title="Get collectibles collection"
  url="/collectibles/collections/ab56be4c-5b20-41c6-a9c3-244f9a433f35"
/>

<APIResponse name="collectible_collection" />
