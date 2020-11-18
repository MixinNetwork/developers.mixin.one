# 联系人

### `GET /friends`

获取授权用户的联系人列表，需要 `CONTACTS:READ` 权限，该列表包含一般用户和机器人用户，可以通过是否有 app 字段来判断是不是机器人用户。

```
$$XIN:curl$$ "https://api.mixin.one/friends"
```

```json
{
  "data":[
    $$XIN:user$$,
  ...
  ]
}
```
