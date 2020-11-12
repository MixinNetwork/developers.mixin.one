# 获取用户单个资产信息

根据资产 id 获取授权用户单个资产的信息，需要 `ASSETS:READ` 权限。

### `GET /assets/:id` 

```
$$XIN:curl$$ "https://api.mixin.one/assets/3596ab64-a575-39ad-964e-43b37f44e8cb"
```

```json
{
  "data": $$XIN:asset$$
}
```
