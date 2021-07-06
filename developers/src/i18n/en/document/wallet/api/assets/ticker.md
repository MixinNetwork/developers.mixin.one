# Reading Historical Asset Prices

### `GET /network/ticker?asset=offset=` 

| Parameter | Type | Description |
| :----- | :----: | :---- |
| asset | UUID String | Get tickers of a specific asset. |
| offset | String | Specify query time in RFC3339Nano format, e.g. `2020-12-12T12:12:12.999999999Z`. |

```
$$XIN:curl$$ "https://api.mixin.one/network/ticker?asset=f5ef6b5d-cc5a-3d90-b2c0-a2fd386e7a3c&offset=2020-09-21T13:53:29.38099Z"
```

```json
{
  "data":{
    "type":"ticker",
    "price_btc":"0.000135438312",
    "price_usd":"2.582473"
  }
}
```

**If no ticker found, `price_usd` will return 0。**
