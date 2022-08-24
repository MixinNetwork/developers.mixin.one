---
title: Read Outputs
sidebar_position: 4
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

## GET /outputs

Fetch outputs in multisigs and collectibles, and the api returns the merged result of  `GET /multisigs/outputs` and `GET /collectibles/outputs`

<APIEndpoint url="/outputs?state=:state&offset=:offset&limit=:limit&members=:members&threshold=:threshold" />

<APIParams
p-state="optional, state of UTXO, such as unspent, signed and spent."
p-offset="optional, state, RFC3339Nano format, for example `2020-12-12T12:12:12.999999999Z`."
p-limit="options, number per page, default and maximum is both 500"
p-members="used with threshold, hash of multi signature members"
p-threshold="used with members, such threshold should be 2 in 2/3 multi signature"
/>

Golang example for generating hash of multi signature members:

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

