---
title: 署名のアプトプットの読み込み
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

## GET /multisigs/outputs

<APIEndpoint url="/multisigs/outputs?state=:state&offset=:offset&limit=:limit&members=:members&threshold=:threshold" />

<APIMetaPanel scope="Authorized" />

<APIParams
  p-state="Optional, the states of UTXO, e.g. unspent, signed, and spent."
  p-offset="Optional, pagination start time, RFC3339Nano format, e.g. `2020-12-12T12:12:12.999999999Z`."
  p-limit="Optional, pagination per page data limit, 500 by default, maximally 500"
  p-members="used together with threshold to participate in the hash of multi-signature members."
  p-threshold="integer, used with members, multi-signature threshold, for example, 2/3, threshold = 2"
/>

あるアカウントが複数のマルチシグネチャに参加している場合、`members`と`threshold`パラメーターでデータをフィルタリングすることができます。

以下は、マルチシグネチャーのメンバーハッシュを生成するためのGo言語で記述されたコードです。

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
  url="/multisigs/outputs?limit=500&offset=2006-01-02T15:04:05.999999999Z&state=spent"
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

このうち、`signed_tx`と`signed_by`は状態が署名されているときに値を持ちます。`signed_by`はトランザクションのハッシュを、`signed_tx`はトランザクションの内容を表します。`signed_by`は対応するトランザクションのリストを分類することができます。
