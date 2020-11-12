# 转账详情

### `GET /snapshots/:id` 

根据转账 id 获取授权用户某条转账的信息，需要 `SNAPSHOTS:READ` 权限。

```
$$XIN:curl$$ "https://api.mixin.one/snapshots/8f5b244e-cf86-4374-8eaa-c551fd70cd83"
```

```json
{  
  "data":{
   $$XIN:...snapshot$$
   // Options only for user (or App) who has access.
   // "trace_id":"7c67e8e8-b142-488b-80a3-61d4d29c90bf",
   // "opponent_id":"a465ffdb-4441-4cb9-8b45-00cf79dfbc46",
   // "data":"Transfer!"
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
