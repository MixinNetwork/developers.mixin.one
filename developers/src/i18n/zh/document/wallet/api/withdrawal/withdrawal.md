# 提现

提取资产到外部地址，注意事项：

- 提现资产之前，需要先创建提现地址
- 资产都有最小提现金额，手续，部分会有保留金额，可以从提现地址里获取

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
    $$XIN:snapshot_withdrawal$$
  }
}
```
