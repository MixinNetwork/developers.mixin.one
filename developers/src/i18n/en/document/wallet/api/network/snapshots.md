# Snapshots

Public transfer records, permission-less access.

### `GET /network/snapshots?limit=10&offset=&asset=` 

| Parameter | Type | Description |
| :----- | :----: | :---- |
| limit | String | Pagination per page data limit, 500 by default, maximally 500. |
| offset | String | Pagination start time, RFC3339Nano format, e.g. `2020-12-12T12:12:12.999999999Z`. |
| asset | UUID String |Optional, transfer records of a certain asset. |
| order | String | Optional, sort in ASC or DESC order, DESC by default. |

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
    // If you need to check all wallet generated users' transfers, include the wallet authentication information in the request headers, and then the following fields will be returned.
    "user_id":"06aed1e3-bd77-4a59-991a-5bb5ae6fbb09",
    "trace_id":"7c67e8e8-b142-488b-80a3-61d4d29c90bf",
    "opponent_id":"a465ffdb-4441-4cb9-8b45-00cf79dfbc46",
    "data":"Transfer!"
  },
  ...
  ]
}
```