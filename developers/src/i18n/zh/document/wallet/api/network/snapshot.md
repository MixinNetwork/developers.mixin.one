### 转账详情

Mixin Network 的转账详情, 注意:

- 默认不返回用户的相关信息, 需要可以通过用户的 `authentication token` 来，检查是否是自己的交易

### `GET /network/snapshots/:id` 

```
$$XIN:curl$$ "https://api.mixin.one/network/snapshots/8f5b244e-cf86-4374-8eaa-c551fd70cd83"
```

```json
{
  "data": $$XIN:network_snapshot$$
}
```
