---
title: Read Historical Prices
sidebar_position: 11
---

import Request from '../../_partials/request'

## GET /network/ticker

To obtain the asset list of a user, the `ASSETS:READ` permission is required.

| Parameter | Type | Description |
| :----- | :----: | :---- |
| asset | UUID String | Get tickers of a specific asset. |
| offset | String | Specify query time in RFC3339Nano format, e.g. `2020-12-12T12:12:12.999999999Z`. |

<Request title="Get Historical Price by ASSET_ID" url="/network/ticker?asset=f5ef6b5d-cc5a-3d90-b2c0-a2fd386e7a3c&offset=2020-09-21T13:53:29.38099Z"/>


```json title="Response"
{
  "data":{
    "type":       "ticker",
    "price_btc":  "0.000135438312",
    "price_usd":  "2.582473"
  }
}
```

:::info
If no ticker found, `price_usd` will return 0.
:::
