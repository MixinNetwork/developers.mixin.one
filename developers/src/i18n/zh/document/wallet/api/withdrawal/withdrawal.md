# 提现

### `POST /withdrawals` 

请求 Body 数据

| 参数 | 类型 | 介绍 |
| :----- | :---- | :---- |
| address_id | UUID String | 提现地址 id |
| amount | String | 提现金额，例如"100000" |
| fee | String | 可选参数，提现手续费，从 GET /addresses/:id 获取 |
| pin | String | 加密后的 PIN |
| trace_id | UUID String | 防止重复提现 |

```
$$XIN:curl$$ "https://api.mixin.one/withdrawals" -XPOST --data '{"amount":"100","address_id":"43d61dcd-e413-450d-80b8-101d5e903357","pin":"xDcSiAsvsekYpnxEShqLgecvQ4GhP7o660nOodK9BG7k+xsszxO56Yg6DQLWtOek","trace_id":"ca90fd5b-e047-4a66-affa-2b40f026b165"}'
```

```json
{  
  "data":{  
    "type":"withdrawal",
    "snapshot_id":"ab56be4c-5b20-41c6-a9c3-244f9a433f35",
    "transaction_hash":"axt..ze",
    "asset_id":"43d61dcd-e413-450d-80b8-101d5e903357",
    "amount":"-10",
    "trace_id":"7c67e8e8-b142-488b-80a3-61d4d29c90bf",
    "created_at":"2018-05-03T10:08:34.859542588Z"
  }
}
```
