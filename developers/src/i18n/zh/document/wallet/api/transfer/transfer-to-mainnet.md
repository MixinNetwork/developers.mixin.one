# 转账到主网地址

Mixin 的开发者如果需要跟 Mixin Network 的帐号，或者想要用到多签，就需要用到这个接口。所以这个接口主要是 Mixin 用户 (钱包用户，机器人，机器人子用户) 跟 Mixin Network 进行转帐。需要注意

- 转帐到 Mixin Network 的帐号跟多签的参数完全不同
- 需要是 Mixin Network 支持的资产才可以


### `POST /transactions` 

转给 Mixin Network 的帐号，请求参数

| 参数 | 类型 | 介绍 |
| :----- | :---- | :---- |
| asset_id | UUID String | 资产编号 |
| opponent_key | String | 主网地址 |
| amount | String | 转账金额，例如 "0.01"，支持小数点后最多 8 位 |
| pin | String | 加密后的 PIN 密码 |
| trace_id | UUID String | 可选，主要用于防止重复支付 |
| memo | UUID String | 可选，转账备注，最多 140 字符 |

```
$$XIN:curl$$ "https://api.mixin.one/transactions" -XPOST --data '{"amount":"10","asset_id":"43d61dcd-e413-450d-80b8-101d5e903357","opponent_key":"XINDEhAA8ArWDJBF5fJQvrtKdZQ4X28KmkScm5FtwdJGx9CiB1Hjadk4baMLMRjsGY5L8QDbVKuC7jvep1m8k4zZN7BGvvXP","memo":"hello","pin":"F39IsJmUaZW03VMV/01lHyY2RCoZ7/X764akX+EmthIc4uVsWAWQTM/IxX5Z9C1y","trace_id":"7c67e8e8-b142-488b-80a3-61d4d29c90bf"}'
```

转给 Mixin Network 的多签，请求参数

| 参数 | 类型 | 介绍 |
| :----- | :---- | :---- |
| asset_id | UUID String | 资产编号 |
| opponent_multisig | Object | 多签 `{ "receivers": ["userid", "userid", ...], "threshold": 3 }` |
| amount | String | 转账金额，例如 "0.01"，支持小数点后最多 8 位 |
| pin | String | 加密后的 PIN 密码 |
| trace_id | UUID String | 可选，主要用于防止重复支付 |
| memo | UUID String | 可选，转账备注，最多 140 字符 |

对于 opponent_multisig，threshold 需要大于等于 1，并且小于等于 receivers 的个数

返回结果，请注意这是所有的 account snapshot 的类型，一次只会返回一个。

```json
{
  "data":
    $$XIN:snapshot_transfer$$
    或
    $$XIN:snapshot_raw$$
    或
    $$XIN:snapshot_deposit$$
    或
    $$XIN:snapshot_withdrawal$$
    或
    $$XIN:snapshot_fee$$
}
```
