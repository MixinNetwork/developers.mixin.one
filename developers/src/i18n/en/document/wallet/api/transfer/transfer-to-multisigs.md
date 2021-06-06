# 转账到多签

给多签转账实际上是一个用户给多个用户转账

### `POST /transactions` 

请求 Body 数据

| 参数 | 类型 | 介绍 |
| :----- | :---- | :---- |
| asset_id | UUID String | 资产编号 |
| opponent_multisig | Object | 多签 `{ "receivers": ["userid", "userid", ...], "threshold": 3 }` |
| amount | String | 转账金额，例如 "0.01"，支持小数点后最多 8 位 |
| pin | String | 加密后的 PIN 密码 |
| trace_id | UUID String | 可选，主要用于防止重复支付 |
| memo | UUID String | 可选，转账备注，最多 140 字符 |

```
$$XIN:curl$$ "https://api.mixin.one/transactions" -XPOST --data '{"amount":"10","asset_id":"43d61dcd-e413-450d-80b8-101d5e903357","opponent_multisig":{"receivers": ["00c5a4ae-dcdc-48db-ab8e-a7eef69b441d","087e91ff-7169-451a-aaaa-5b3297411a4b","105f6e8b-d249-4b4d-9beb-e03cefaebc37"], "threshold": 2},"memo":"hello","pin":"F39IsJmUaZW03VMV/01lHyY2RCoZ7/X764akX+EmthIc4uVsWAWQTM/IxX5Z9C1y","trace_id":"7c67e8e8-b142-488b-80a3-61d4d29c90bf"}'
```

```json
{  
  "data":{  
    "type":"transfer",
    "snapshot_id":"ab56be4c-5b20-41c6-a9c3-244f9a433f35",
    "opponent_receivers":["00c5a4ae-dcdc-48db-ab8e-a7eef69b441d","087e91ff-7169-451a-aaaa-5b3297411a4b","105f6e8b-d249-4b4d-9beb-e03cefaebc37"],
    "opponent_threshold": 2,
    "asset_id":"43d61dcd-e413-450d-80b8-101d5e903357",
    "amount":"-10",
    "trace_id":"7c67e8e8-b142-488b-80a3-61d4d29c90bf",
    "memo":"hello",
    "created_at":"2018-05-03T10:08:34.859542588Z"
  }
}
```