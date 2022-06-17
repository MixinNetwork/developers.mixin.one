---
title: 获取 NFT Outputs
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

<APIMetaPanel scope="Authorized" scopeNote=""/>

<APIParams
  p-state="可选, UTXO 状态, 例如 unspent, signed, and spent."
  p-offset="可选, 开始时间, RFC3339Nano 格式, 例如 `2020-12-12T12:12:12.999999999Z`."
  p-limit="可选, 分页条数限制, 默认 500 , 最大 500"
  p-members="需要跟 threshold 一起使用, 多签成员的 hash 值"
  p-threshold="需要跟多签成员的 hash 值一起使用, 比如 2/3, threshold 是 2"
/>

以下是生成多签成员 hash 的 Golang 示例。

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
  url="/collectibles/outputs?limit=500&offset=2006-01-02T15:04:05.999999999Z&state=spent"
/>

<APIResponse name="collectible_output" />

只有 `state` 是 `signed` 的时候, `signed_tx` 跟 `signed_by` 才会有值。

## GET /collectibles/tokens/UUID

获取单个 NFT 的信息

<APIEndpoint url="/collectibles/tokens/UUID" />

<APIRequest
  title="Get collectibles token"
  url="/collectibles/tokens/ab56be4c-5b20-41c6-a9c3-244f9a433f35"
/>

<APIResponse name="collectible_token" />

## GET /collectibles/collections/UUID

获取整个 NFT 的集合信息

<APIEndpoint url="/collectibles/collections/UUID" />

<APIRequest
  title="Get collectibles collection"
  url="/collectibles/collections/ab56be4c-5b20-41c6-a9c3-244f9a433f35"
/>

<APIResponse name="collectible_collection" />
