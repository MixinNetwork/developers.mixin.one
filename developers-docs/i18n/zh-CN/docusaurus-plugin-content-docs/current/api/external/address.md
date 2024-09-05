---
title: Mixin 内部地址
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

## GET /external/addresses/check

检查一个提现地址是否合法

<APIEndpoint url="/external/addresses/check" />

<APIMetaPanel scopeNote="" />

<APIParams
  p-asset_id="资产的 uuid"
  p-asset_id-required={true}
  p-destination="资产的提现地址, 例如 btc: bc1qxevhcsrrth0muvnl6x9vry3a0p6pzmz359d3s5, eos: mixinwitheos"
  p-destination-required={true}
  p-tag="非必选，例如 eos 的备注 (memo)"
/>

<APIRequest title="Get Mixin Internal Address" isPublic url="/external/addresses/check" />

```json title="返回值"
{
  "data": {
    "destination": "bc1qxevhcsrrth0muvnl6x9vry3a0p6pzmz359d3s5",
    "tag": "",
  },
}
```
