# 全网转账记录

接口返回 Mixin Network 的所有转账记录, 所有的充值，提现，内部转帐等都有对应的记录, 注意:

- 默认不返回用户的信息，如果需要返回用户信息, 需要用户的 `authentication token` 签名
- 机器人用 `authentication token` 可以同时访问，机器人子用户的交易记录

交易的类型(source), 包含：充值，提现，转帐，主网的转帐

- RAW_TRASACTION_INITIALIZED
- RAW_TRASACTION_RECEIVED
- DEPOSIT_CONFIRMED
- TRANSFER_INITIALIZED
- WITHDRAWAL_INITIALIZED
- WITHDRAWAL_FEE_CHARGED
- WITHDRAWAL_FAILED

### `GET /network/snapshots?limit=10&offset=&asset=` 

| 参数 | 类型 | 介绍 |
| :----- | :----: | :---- |
| limit | String | 分页每页数据，默认 500，最大 500 |
| offset | String | 分页起始时间，RFC3339Nano 格式，例如 `2020-12-12T12:12:12.999999999Z` |
| asset | UUID String | 可选，筛选某个资产的转账记录 |
| order | String | 可选，排序，ASC 或 DESC，默认 DESC |

```
$$XIN:curl$$ "https://api.mixin.one/network/snapshots?limit=10&offset=2018-05-29T16:30:24.845515732%2B08:00"
```

```json
{
  "data":[
  $$XIN:network_snapshot$$,
  ...
  ]
}
```
