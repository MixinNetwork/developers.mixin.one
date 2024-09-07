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

check a withdrawal address is valid or not

<APIEndpoint url="/external/addresses/check" />

<APIMetaPanel scopeNote="" />

<APIParams
p-asset="asset uuid"
p-asset-required={true}
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
  },
}
```
