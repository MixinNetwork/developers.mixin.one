# 搜索资产

### `GET /transfers/trace/:id` 

根据 trace 获取授权用户某条转账的信息，需要 `SNAPSHOTS:READ` 权限，注意该接口只能查询转账，不能查询充值、提现。

```
$$XIN:curl$$ "https://api.mixin.one/transfers/trace/7c67e8e8-b142-488b-80a3-61d4d29c90bf"
```

```json
{
  "data":{
    "type":"transfer",
    "snapshot_id":"ab56be4c-5b20-41c6-a9c3-244f9a433f35",
    "opponent_id":"a465ffdb-4441-4cb9-8b45-00cf79dfbc46",
    "asset_id":"43d61dcd-e413-450d-80b8-101d5e903357",
    "amount":"-10",
    "trace_id":"7c67e8e8-b142-488b-80a3-61d4d29c90bf",
    "memo":"hello",
    "created_at":"2018-05-03T10:08:34.859542588Z"
  }
}
```

**不是当前用户的转账返回 403，找不到该记录返回 404**