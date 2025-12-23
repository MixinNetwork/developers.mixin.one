---
 title: List Withdrawal Fees
 sidebar_position: 4
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
} from "@site/src/components/api";

## GET /safe/assets/:id/fees

List potential withdrawal fees for an asset. Fees may depend on the destination address/domain and network conditions.

<APIEndpoint url="/safe/assets/:id/fees" />

<APIMetaPanel scope="ASSETS:READ" scopeNote="" />

<APIParams
  p-id="The asset_id of the asset"
  p-id-required={true}
  q-destination="Optional. Destination address or address+memo used to compute chain-specific fee when applicable."
  q-domain="Optional. Domain used to resolve the destination (if a human-readable domain is provided)."
/>

<APIRequest
  title="List Withdrawal Fees"
  url="/safe/assets/3596ab64-a575-39ad-964e-43b37f44e8cb/fees?destination=0x0000000000000000000000000000000000000000&domain=ens"
/>

### Response

A JSON array of fee objects.

```json
[
  {
    "type": "withdrawal_fee",
    "asset_id": "3596ab64-a575-39ad-964e-43b37f44e8cb",
    "amount": "0.001",
    "priority": "normal"
  }
]
```

## Response fields

| Field | Type | Description |
|:--|:--|:--|
| `type` | string | Object type. Always `withdrawal_fee` for this endpoint. |
| `asset_id` | string | The asset id the fee applies to. |
| `amount` | string | Estimated fee amount for the given priority tier. Decimal string. |
| `priority` | string | Priority tier for the fee, e.g. `slow`, `normal`, `fast`. |

