# 查询资产历史价格

### `GET /ticker?asset=offset=` 

| 参数 | 类型 | 介绍 |
| :----- | :----: | :---- |
| asset | UUID String | 筛选某个资产的历史价格 |
| offset | String | 指定查询时间，RFC3339Nano 格式，例如 `2020-12-12T12:12:12.999999999Z` |

```
$$XIN:curl$$ "https://api.mixin.one/ticker?asset=f5ef6b5d-cc5a-3d90-b2c0-a2fd386e7a3c&offset=2020-09-21T13:53:29.38099Z"
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

**如果没有历史价格 `price_usd` 会返回 0。**