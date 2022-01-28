---
title: コレクティブルのアプトプットの読み込み
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
  p-state="Optional, the states of UTXO, e.g. unspent, signed, and spent."
  p-offset="Optional, pagination start time, RFC3339Nano format, e.g. `2020-12-12T12:12:12.999999999Z`."
  p-limit="Optional, pagination per page data limit, 500 by default, maximally 500"
  p-members="used together with threshold to participate in the hash of multi-signature members."
  p-threshold="integer, used with members, multi-signature threshold, for example, 2/3, threshold = 2"
/>

もし、アカウントがコレクティブルマルチシグネチャに参加している場合、 `members` と `threshold` パラメータでデータをフィルタリングすることができます。

以下は、GO言語で記述したマルチシグネチャのメンバーハッシュを生成するためのコードです。


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

このうち、`signed_tx` と `signed_by` は状態が署名されているときに値を持ちます。`signed_by` はトランザクションのハッシュを、`signed_tx`はトランザクション内の情報を表します。 また、`signed_by` は対応するトランザクションのリストを分類するのに役立ちます。


## GET /collectibles/tokens/UUID

コレクティブルの情報を取得します。

<APIEndpoint url="/collectibles/tokens/UUID" />

<APIMetaPanel scope="Authorized" />

<APIRequest
  title="Get collectibles Outputs"
  url="/collectibles/tokens/ab56be4c-5b20-41c6-a9c3-244f9a433f35"
/>

<APIResponse name="collectible_token" />
