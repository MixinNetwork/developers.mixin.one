# 获取用户资产列表

获取授权用户的资产列表，需要 `ASSETS:READ` 权限。

### `GET /assets` 

```
$$XIN:curl$$ "https://api.mixin.one/assets"
```

```json
{
  "data":[
    $$XIN:asset$$,
    ...
  ]
}
```
