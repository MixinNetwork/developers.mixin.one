# 转账

### `POST /transfers` 

Mixin 除了作为虚拟货币的钱包，还提供了 Mixin 用户之间的转帐接口, 这个接口是实时，免费的，所有的转帐记录都通过 Mixin Network 帐本记录, 另外有以下注意事项:

- 转账 API 一旦调用成功即表示该数据已被所有节点最终确认，数据不可逆。
- 不能自己给自己转账。
- 加密后的 PIN 密码是一次性的，每次转账都必须重新加密一次。
- 强烈建议开发者用 `trace_id` 处理重复转账的情况，在转账始终都带上该参数。
- 转账遇到 500 一般重试就好了。
- 如果需要处理大量的并发交易，每秒处理成百上千条转账，推荐使用多个账号来转账发送交易。
- 转账报错注意看一下返回错误信息里的 `extra` 字段。
- 如果转账报 `20119` 密码错误不要重试，建议调用[验证密码](./pin-verify)的接口确认一下。

请求 Body 数据

| 参数 | 类型 | 介绍 |
| :----- | :---- | :---- |
| asset_id | UUID String | 资产编号 |
| opponent_id | UUID String | 收款人 |
| amount | String | 转账金额，例如 "0.01"，支持小数点后最多 8 位 |
| pin | String | 加密后的 PIN 密码 |
| trace_id | UUID String | 可选，主要用于防止重复支付 |
| memo | UUID String | 可选，转账备注，最多 200 字符 |

```
$$XIN:curl$$ "https://api.mixin.one/transfers" -XPOST --data '{"amount":"10","asset_id":"43d61dcd-e413-450d-80b8-101d5e903357","opponent_id":"a465ffdb-4441-4cb9-8b45-00cf79dfbc46","memo":"hello","pin":"F39IsJmUaZW03VMV/01lHyY2RCoZ7/X764akX+EmthIc4uVsWAWQTM/IxX5Z9C1y","trace_id":"7c67e8e8-b142-488b-80a3-61d4d29c90bf"}'
```

```json
{
  "data": $$XIN:snapshot_transfer$$
}
```
