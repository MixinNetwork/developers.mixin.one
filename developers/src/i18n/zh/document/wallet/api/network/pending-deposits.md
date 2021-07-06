### 全网充值记录

通常区块链里的资产，需要一定的确认数来保证交易不可逆, 例如 BTC 实际需要 6 个确认，在 Mixin Network 中目前需要 2 个(会动态调整)，

Mixin Network 会实时更新这些未达到确认数的交易, 通过这个 API 返回。

### `GET /external/transactions?asset=&destination=&tag=&limit=&offset=` 

| 参数 | 类型 | 介绍 |
| :----- | :----: | :---- |
| asset | UUID String | 可选，筛选某个资产的充值记录 |
| destination | String | 可选，筛选某个地址正在充值的记录 |
| tag | String | 可选，筛选某个地址正在充值的记录，与 destination 一同使用 |
| limit | String | 分页每页数据，默认 500，最大 500 |
| offset | String | 分页起始时间，RFC3339Nano 格式，例如 `2020-12-12T12:12:12.999999999Z` |

```
$$XIN:curl$$ "https://api.mixin.one/external/transactions?destination=1AK4LYE6PYwBmSYHQX3v2UsXXHTvCAsJeK"
```

```json
{
  "data":[
    $$XIN:transaction$$,
    ...
  ]
}
```
