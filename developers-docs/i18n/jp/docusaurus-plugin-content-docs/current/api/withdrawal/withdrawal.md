---
title: Withdrawal
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

## POST /withdrawals

Submit a withdrawal request.

:::info
It costs fee to withdrawal. To get the fee, use [`GET /assets/{asset_id}/fee`](../assets/fee).
:::

<APIEndpoint url="/withdrawals" />

<APIMetaPanel scope="Authorized" scopeNote="" />

<APIPayload>{`{
  "address_id": "the asset's asset_id",
  "amount":     "e.g. '100000'",
  "trace_id":   "an uuid to prevent duplicate withdrawals",
  "pin":        "encrypted PIN",
}
`}</APIPayload>

<APIRequest
  title="Request to withdrawal"
  method="POST"
  url='/withdrawals --data &apos;{"amount":"100","address_id":"43d61dcd-e413-450d-80b8-101d5e903357","pin":"xDcSiAsvsekYpnxEShqLgecvQ4GhP7o660nOodK9BG7k+xsszxO56Yg6DQLWtOek","trace_id":"ca90fd5b-e047-4a66-affa-2b40f026b165"}&apos;'
/>

```json title="Response"
{
  "data": {
    "type": "withdrawal",
    "snapshot_id": "ab56be4c-5b20-41c6-a9c3-244f9a433f35",
    "transaction_hash": "axt...ze",
    "asset_id": "43d61dcd-e413-450d-80b8-101d5e903357",
    "amount": "-10",
    "trace_id": "7c67e8e8-b142-488b-80a3-61d4d29c90bf",
    "created_at": "2018-05-03T10:08:34.859542588Z"
  }
}
```
