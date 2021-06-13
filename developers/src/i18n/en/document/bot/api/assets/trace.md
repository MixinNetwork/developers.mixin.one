# 转账详情

### `GET /transfers/trace/:id` 

根据 trace 获取授权用户某条转账的信息，需要 `ASSETS:READ` 跟 `SNAPSHOTS:READ` 权限，注意该接口只能查询转账，不能查询充值、提现。

```
$$XIN:curl$$ "https://api.mixin.one/transfers/trace/7c67e8e8-b142-488b-80a3-61d4d29c90bf"
```

```json
{
  "data": $$XIN:transfer$$
}
```

**不是当前用户的转账返回 403，找不到该记录返回 404**
