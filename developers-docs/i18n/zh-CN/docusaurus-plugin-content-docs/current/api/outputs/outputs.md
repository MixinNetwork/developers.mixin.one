---
title: 多签输出
sidebar_position: 24
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

## GET /outputs

在多签跟 Collectibles 中都有 outputs 的列表，这个列表是返回 `GET /multisigs/outputs` 跟 `GET /collectibles/outputs` 的合并结果。

<APIEndpoint url="/outputs?state=:state&offset=:offset&limit=:limit&members=:members&threshold=:threshold" />

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
