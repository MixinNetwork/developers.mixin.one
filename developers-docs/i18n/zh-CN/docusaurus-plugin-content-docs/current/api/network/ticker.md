---
title: 历史价格
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

获取指定资产的历史价格。

<APIEndpoint url="/network/ticker?asset=:asset&offset=:offset" />

<APIMetaPanel scope="" scopeNote="" />

<APIParams
  p-asset="资产的 asset_id"
  p-asset-required="true"
  p-offset="查询时间，RFC3339Nano 格式，例如 `2020-12-12T12:12:12.999999999Z`"
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

:::info
若未查询到记录，`price_usd` 与 `price_btc` 将返回 0。
:::
