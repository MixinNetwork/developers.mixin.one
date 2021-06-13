# 屏蔽名单

### `GET /blocking_users`

获取授权用户的屏蔽名单，需要 `CONTACTS:READ` 权限。

```
$$XIN:curl$$ "https://api.mixin.one/blocking_users"
```

```json
{
  "data":[
    $$XIN:user$$
  ...
  ]
}
```
