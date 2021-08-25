```json title="Response"
{
  "data": [
    {
      "amount":     "-1688168",
      "asset": {
        "asset_id": "965e5c6e-434c-3fa9-b780-c50f43cd955c",
        "chain_id": "43d61dcd-e413-450d-80b8-101d5e903357",
        "icon_url": "https://images.mixin.one/0sQY63dDMkWTURkJVjowWY6Le4ICjAFuu3ANVyZA4uI3UdkbuOT5fjJUT82ArNYmZvVcxDXyNjxoOv0TAYbQTNKS=s128",
        "name":     "Chui Niu Bi",
        "symbol":   "CNB",
        "type":     "asset"
      },
      "created_at": "2018-05-29T09:31:04.202186212Z",
      "data":       "",
      "snapshot_id":"529934b0-abfd-43ab-9431-1805773000a4",
      "source":     "TRANSFER_INITIALIZED",
      "type":       "snapshot",      // Options only for user (or App) who has access.
      // 4 private fields that only be returend with correct permission
      "user_id":    "06aed1e3-bd77-4a59-991a-5bb5ae6fbb09",
      "trace_id":   "7c67e8e8-b142-488b-80a3-61d4d29c90bf",
      "opponent_id":"a465ffdb-4441-4cb9-8b45-00cf79dfbc46",
      "data":       "Transfer!"
    },
    ...
  ]
}
```