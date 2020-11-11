# 全网转账记录

公开的转账记录，无需授权访问

### `GET /network/snapshots?limit=10&offset=&asset=` 

| 参数 | 类型 | 介绍 |
| :----- | :----: | :---- |
| limit | String | 分页每页数据，默认 500，最大 500 |
| offset | String | 分页起始时间，RFC3339Nano 格式，例如 `2020-12-12T12:12:12.999999999Z` |
| asset | UUID String | 可选，筛选某个资产的转账记录 |
| order | String | 可选，排序，ASC 或 DESC，默认 DESC |

```
$$XIN:curl$$ "https://api.mixin.one/network/snapshots?limit=10&offset=2018-05-29T16:30:24.845515732%2B08:00"
```

```json
{
  "data":[
  {
    "amount":"-1688168",
    "asset":{
      "asset_id":"965e5c6e-434c-3fa9-b780-c50f43cd955c",
      "chain_id":"43d61dcd-e413-450d-80b8-101d5e903357",
      "icon_url":"https://images.mixin.one/0sQY63dDMkWTURkJVjowWY6Le4ICjAFuu3ANVyZA4uI3UdkbuOT5fjJUT82ArNYmZvVcxDXyNjxoOv0TAYbQTNKS=s128",
      "name":"Chui Niu Bi",
      "symbol":"CNB",
      "type":"asset"
    },
    "created_at":"2018-05-29T09:31:04.202186212Z",
    "data":"",
    "snapshot_id":"529934b0-abfd-43ab-9431-1805773000a4",
    "source":"TRANSFER_INITIALIZED",
    "type":"snapshot",
    // 如果需要对账查询所有钱包生成用户的转账，需要在请求头里附带钱包的认证鉴权信息，才会返回以下字段信息
    "user_id":"06aed1e3-bd77-4a59-991a-5bb5ae6fbb09",
    "trace_id":"7c67e8e8-b142-488b-80a3-61d4d29c90bf",
    "opponent_id":"a465ffdb-4441-4cb9-8b45-00cf79dfbc46",
    "data":"Transfer!"
  },
  ...
  ]
}
```