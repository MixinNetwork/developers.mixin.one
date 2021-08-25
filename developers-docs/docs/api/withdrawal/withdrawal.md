---
title: Withdrawal
sidebar_position: 1
---

import Request from '../../_partials/request'

## POST /withdrawals

Submit a withdrawal request.

:::info
It costs fee to withdrawal. To get the fee, use [`GET /assets/{asset_id}/fee`](../assets/fee).
:::

The HTTP request body:

| Name | Type | Description |
| :----- | :----: | :---- |
| address_id | UUID String | Withdrawal address id. |
| amount | String | e.g. "100000" |
| pin | String | Encrypted Pin |
| trace_id | UUID String | Prevent duplicate withdrawals. |

<Request title="Request to withdrawal" method="POST" url="/withdrawals --data '{&quot;amount&quot;:&quot;100&quot;,&quot;address_id&quot;:&quot;43d61dcd-e413-450d-80b8-101d5e903357&quot;,&quot;pin&quot;:&quot;xDcSiAsvsekYpnxEShqLgecvQ4GhP7o660nOodK9BG7k+xsszxO56Yg6DQLWtOek&quot;,&quot;trace_id&quot;:&quot;ca90fd5b-e047-4a66-affa-2b40f026b165&quot;}'"/>

```json
{
  "data":{
    "type":             "withdrawal",
    "snapshot_id":      "ab56be4c-5b20-41c6-a9c3-244f9a433f35",
    "transaction_hash": "axt...ze",
    "asset_id":         "43d61dcd-e413-450d-80b8-101d5e903357",
    "amount":           "-10",
    "trace_id":         "7c67e8e8-b142-488b-80a3-61d4d29c90bf",
    "created_at":       "2018-05-03T10:08:34.859542588Z"
  }
}
```
