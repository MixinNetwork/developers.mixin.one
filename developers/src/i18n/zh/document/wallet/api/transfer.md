# 转账

### `POST /transfers` 

请求 Body 数据

| 参数 | 类型 | 介绍 |
| :----- | :---- | :---- |
| asset_id | UUID String | 资产编号 |
| opponent_id | UUID String | 收款人 |
| amount | String | 转账金额，例如 "0.01"，支持小数点后最多 8 位 |
| pin | String | 加密后的 PIN 密码 |
| trace_id | UUID String | 可选，主要用于防止重复支付 |
| memo | UUID String | 可选，转账备注，最多 140 字符 |

```
curl -i -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzMxMTgwODIsImlhdCI6MTUyNTM0MjA4MiwianRpIjoiMmQ5YjI2YTUtMDc4Ny00OGIyLWExN2MtNWM5ZGQ5Mjc5MDI2Iiwic2lkIjoiYTM0YzA3YTktNzU1ZC00YjU0LTk0YzUtZTQ1ZTlhMmRkNDNlIiwic2lnIjoiMTUzMjIwNDlkNWFlMzNhNjYyMjAwOWQ1YTk4N2ZjYmRlNDQ4OTkxMmUxZmE2ZTAwODk0YjlhYzM2MTRiZTE4MiIsInVpZCI6IjA2YWVkMWUzLWJkNzctNGE1OS05OTFhLTViYjVhZTZmYmIwOSJ9.RVR6ejUZkAGeRG9M9C5Jk4llmJvFHTXAx3f3yxwTiiglFbfiNrt2fI9ZHNYCp7XbJJh4w9ECyX1K8Obgq7ep2RcGzjMkKWlXWuECLwgUA4FRFrewvPcH2Edplo61B9I6M89Ohi1_V6owkee08bDR2k0se2MdWTxnHca8BzOFckc" "https://api.mixin.one/transfers" -XPOST --data '{"amount":"10","asset_id":"43d61dcd-e413-450d-80b8-101d5e903357","opponent_id":"a465ffdb-4441-4cb9-8b45-00cf79dfbc46","memo":"hello","pin":"F39IsJmUaZW03VMV/01lHyY2RCoZ7/X764akX+EmthIc4uVsWAWQTM/IxX5Z9C1y","trace_id":"7c67e8e8-b142-488b-80a3-61d4d29c90bf"}'
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

转账 API 一旦调用成功即表示该数据已被所有节点最终确认，数据不可逆。注意事项：

- 不能自己给自己转账。
- 加密后的 PIN 密码是一次性的，每次转账都必须重新加密一次。
- 强烈建议开发者用 trace_id 处理重复转账的情况，在转账始终都带上该参数。
- 转账遇到 500 一般重试就好了。
- 如果需要处理大量的并发交易，每秒处理成百上千条转账，推荐使用多个账号来转账发送交易。