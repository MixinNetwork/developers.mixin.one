---
title: Mixin Internal Address
---

import {
APIMetaPanel,
APIRequest,
APIEndpoint,
APIParams,
APIPayload,
} from "@site/src/components/api";

## GET /external/addresses/check

It is free that transferring assets between Mixin Users. 
It is also free to transfer assets to an address belongs to Mixin User.
This api is used to check whether an address belongs to Mixin User.

<APIEndpoint url="/external/addresses/check" />

<APIMetaPanel scopeNote="" />

<APIParams
p-asset_id="asset uuid"
p-asset_id-required={true}
p-destination="withdraw address, such as btc: bc1qxevhcsrrth0muvnl6x9vry3a0p6pzmz359d3s5, eos: mixinwitheos"
p-destination-required={true}
p-tag="optional，like memo in eos"
/>

<APIRequest title="Get Mixin Internal Address" isPublic url="/external/addresses/check" />

```json title="Response"
{
  "data": {
    "destination": "bc1qxevhcsrrth0muvnl6x9vry3a0p6pzmz359d3s5",
    "tag": "",
    "fee": "0.00001"
  },
}
```
