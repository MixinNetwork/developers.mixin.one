---
title: 資産価格の読み込み
sidebar_position: 11
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

## GET /network/ticker

指定した資産の価格を取得します。

<APIEndpoint url="/network/ticker?asset=:asset&offset=:offset" />

<APIMetaPanel scope="" scopeNote="" />

<APIParams
  p-asset="the asset's asset_id are getting"
  p-asset-required="true"
  p-offset="Specify query time in RFC3339Nano format, e.g. `2020-12-12T12:12:12.999999999Z`"
/>

<APIRequest
  isPublic
  title="Get Historical Price by ASSET_ID"
  url="/network/ticker?asset=f5ef6b5d-cc5a-3d90-b2c0-a2fd386e7a3c&offset=2020-09-21T13:53:29.38099Z"
/>

```json title="Response"
{
  "data": {
    "type": "ticker",
    "price_btc": "0.000135438312",
    "price_usd": "2.582473"
  }
}
```

:::注意
ティッカーが見つからなかった場合、`price_usd`と`price_usd`は0を返します。
:::
