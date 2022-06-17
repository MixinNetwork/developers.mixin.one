---
title: Read Collectibles Outputs
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

If an account participates in collectibles multi-signatures, the data can be filtered through the `members` and `threshold` parameters.

Here is the golang code for generating the multi-signature member hash:

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

In which, `signed_tx` and `signed_by` have values when the state is signed. `signed_by` represents the transaction hash, and signed_tx is the complete transaction content, `signed_by` can help sort the corresponding waiting list of transactions.

## GET /collectibles/tokens/UUID

Get the information of the collectible

<APIEndpoint url="/collectibles/tokens/UUID" />

<APIRequest
  title="Get collectibles token"
  url="/collectibles/tokens/ab56be4c-5b20-41c6-a9c3-244f9a433f35"
/>

<APIResponse name="collectible_token" />

## GET /collectibles/collections/UUID

Get the information of the collectible collection.

<APIEndpoint url="/collectibles/collections/UUID" />

<APIRequest
  title="Get collectibles collection"
  url="/collectibles/collections/ab56be4c-5b20-41c6-a9c3-244f9a433f35"
/>

<APIResponse name="collectible_collection" />
