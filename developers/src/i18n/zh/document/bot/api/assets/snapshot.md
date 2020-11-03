# 转账详情

### `GET /snapshots/:id` 

根据转账 id 获取授权用户某条转账的信息，需要 `SNAPSHOTS:READ` 权限。

```
curl -i --header "Authorization: Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1Mjc0OTA5MDgsImlhdCI6MTUyNzQ5MDg0OCwianRpIjoiNjNhOWY1NjUtZDA1Zi00NTJjLWFhY2QtY2IxOTUyMDk3YzY1Iiwic2lkIjoiYWM2ZDFmODYtYTY0Yi00NWRkLTllZmEtN2JmMGVjZjI2MDU2Iiwic2lnIjoiZjYyMDU4ZjY2MDRhZTllMjlmZDZiZDExNmM3OGQwZDBhNDVmYzYwZTMwOWY1MWZhYzk3NWY3YzQ4ZjMzNTAzNiIsInVpZCI6IjMxYjFhMTdjLWFiMzgtNGFhNC05YmM5LWY0NjQyNzEyODExMyJ9.ZGOEeOjZ_70YU-VDcZ6e3h_u8q4rBfeMYaTpXGh1VPO3hyfeVHsK4UZpbevta9Z8N9rp3BCL-Mwu1KswhzIM7Wc4gfN7p9sSn5Ik0lI-SsvOlsplgbVrgzk8AE14lXxtOZ_cvbLj6_stOUJq2OQ16wEI7TNBQu6AK0MqxHYSzSU" --header "Content-Type: application/json" --header "Content-length: 0" "https://api.mixin.one/snapshots/8f5b244e-cf86-4374-8eaa-c551fd70cd83"
```

```json
{  
  "data":{  
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
      "user_id":"06aed1e3-bd77-4a59-991a-5bb5ae6fbb09",
      "trace_id":"7c67e8e8-b142-488b-80a3-61d4d29c90bf",
      "opponent_id":"a465ffdb-4441-4cb9-8b45-00cf79dfbc46",
      "data":"Transfer!"
  }
}
```

type 参数说明

- raw 主网转账
- deposit 充值
- transfer 转账
- withdrawal 提现
- fee 手续费
- rebate 退款

**不是当前用户的转账返回 403，找不到该记录返回 404**