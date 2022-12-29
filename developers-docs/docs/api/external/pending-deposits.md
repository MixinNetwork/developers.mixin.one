---
title: Read Pending Deposits
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

## GET /external/transactions

Get public pending deposit records. Since most blockchain needs some confirmations to insure the tx can't be revert.

<APIEndpoint url="/external/transactions?offset=:offset&limit=:limit&asset=:asset&destination=:destination&tag=:tag" />

<APIMetaPanel scope="" />

<APIParams
  p-offset="Pagination start time, RFC3339Nano format, e.g. `2020-12-12T12:12:12.999999999Z`."
  p-offset-required={true}
  p-limit="Pagination per page data limit, 500 by default, maximally 500"
  p-limit-required={true}
  p-asset="Optional, asset's asset_id, get the deposit records for a cerain asset"
  p-destination="Optional, get the records of pending deposits for a certain address."
  p-transaction_hash="Optional，get the records by transaction hash"
  p-source="Optional, if it is blockchain, means fetch the records from blockchain."
  p-user="Optional, the uuid of user, get the records of the user"
/>

### The group of parameter

1. `user=uuid`, get the pending deposits of the user.
1. `source=blockchain&asset=uuid&transaction_hash=7842f9c26f24b8a86de1a28d8bf0e39cfebd8a5bbb3f2d3aa5be82d44df35ac5` get the pending deposits by the transaction_hash from blockchain.
1. `source=blockchain&asset=uuid&destination=1AK4LYE6PYwBmSYHQX3v2UsXXHTvCAsJeK` get the pending deposits by the public key from blockchain.
1. `transaction_hash=7842f9c26f24b8a86de1a28d8bf0e39cfebd8a5bbb3f2d3aa5be82d44df35ac5` get pending deposits by transaction_hash.
1. `asset=uuid&offset=2020-12-12T12:12:12.999999999Z&limit=100` get pending deposits by asset.
1. `destination=1AK4LYE6PYwBmSYHQX3v2UsXXHTvCAsJeK&offset=2020-12-12T12:12:12.999999999Z&limit=100` get pending deposits by public.

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
