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

校验提现地址是否有效。

<APIEndpoint url="/external/addresses/check" />

<APIMetaPanel scopeNote="" />

<APIParams
p-asset="资产 UUID"
p-asset-required={true}
p-destination="提现地址，例如 BTC: bc1qxevhcsrrth0muvnl6x9vry3a0p6pzmz359d3s5，EOS: mixinwitheos"
p-destination-required={true}
p-tag="可选，例如 EOS 的 memo"
/>

<APIRequest title="Get an Address's withdrawal fee" isPublic url="/external/addresses/check" />

```json title="Response"
{
  "data": {
    "destination": "bc1qxevhcsrrth0muvnl6x9vry3a0p6pzmz359d3s5",
    "tag": ""
  }
}
```
