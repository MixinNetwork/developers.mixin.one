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
curl -i --header "Authorization: Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1Mjc1ODYyODQsImlhdCI6MTUyNzU4NjIyNCwianRpIjoiMjZlMjQyM2QtZGUzMC00MTA0LTkyZTQtOTk2MzczOWRkZGE5Iiwic2lkIjoiYWM2ZDFmODYtYTY0Yi00NWRkLTllZmEtN2JmMGVjZjI2MDU2Iiwic2lnIjoiMGIxNGJlZTU5YjE1ODU0MjI1ZTc5ZTU4ZDQwMjZkNDJhYWUyY2Q4ODM4OWE1N2RhNjU4YTRlMjVhNzJlNjRlZSIsInVpZCI6IjMxYjFhMTdjLWFiMzgtNGFhNC05YmM5LWY0NjQyNzEyODExMyJ9.0OUDLd0E1SKslsBJ5nHDE3bC9XKQc_6PPSqBD6Z2E9XYMjQyGht3QWF-uQLohCwbtR_Q7w3_my5MoWM4UyHtWlYh8-mJwg54VFWlhLuFLcWTeG8P971WGVc8oOqNspsEnxDxdBezQVqF1N-XjUtJsVsyJkT6ZEX7VazRm2I2xMM" --header "Content-Type: application/json" --header "Content-length: 0" "https://api.mixin.one/network/snapshots?limit=10&offset=2018-05-29T16:30:24.845515732%2B08:00"
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