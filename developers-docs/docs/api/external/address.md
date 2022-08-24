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

First, it is free that transfer token between Messenger Users. 
If a withdrawal address belongs to a Messenger user, the withdrawal will not need fee too.
The api is used to check whether an address belongs to Mixin User or not.

<APIEndpoint url="/external/addresses/check" />

<APIMetaPanel scopeNote="" />

<APIParams
p-asset_id="asset uuid"
p-asset_id-required={true}
p-destination="withdraw address, such as btc: bc1qxevhcsrrth0muvnl6x9vry3a0p6pzmz359d3s5, eos: mixinwitheos"
p-destination-required={true}
p-tag="optional，like memo in eos"
/>

<APIRequest title="Get an Address's withdrawal fee" isPublic url="/external/addresses/check" />

```json title="Response"
{
  "data": {
    "destination": "bc1qxevhcsrrth0muvnl6x9vry3a0p6pzmz359d3s5",
    "tag": "",
    "fee": "0.00001"
  },
}
```
