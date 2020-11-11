### 全网充值记录

公开的全网充值记录，无需授权访问

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
  "data":[{
    "type":"transaction",
    "transaction_id":"ab56be4c-5b20-41c6-a9c3-244f9a433f35",
    "transaction_hash":"axt..ze",
    "sender":"137FkAtj1KcVKKt4tPeP1Djz3Nvc5DEYri",
    "amount":"10.0",
    "destination":"1AK4LYE6PYwBmSYHQX3v2UsXXHTvCAsJeK",
    "tag":"",
    "asset_id":"43d61dcd-e413-450d-80b8-101d5e903357",
    "chain_id":"43d61dcd-e413-450d-80b8-101d5e903357",
    "confirmations":1,
    "threshold":12,
    "created_at":"2018-05-03T10:08:34.859542588Z"
  },
    ...
  ]
}
```