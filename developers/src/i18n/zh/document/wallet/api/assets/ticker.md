# 查询资产历史价格

### `GET /network/ticker?asset=&offset=` 

查询资产的价格, 注意事项:

- 资产的价格价格只是指 Mixin 里存在的资产历史价格，并不是所有历史价格
- 如果资产价格历史不存在, price_btc 跟 price_usd 都会返回 0

| 参数 | 类型 | 介绍 |
| :----- | :----: | :---- |
| asset | UUID String | 某个资产 |
| offset | String | 可选，默认为当前价格，指定查询时间，RFC3339Nano 格式，例如 `2020-12-12T12:12:12.999999999Z` |

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
