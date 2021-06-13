# 个人信息

### `GET /me`

获取授权用户的个人基本信息，需要 `PROFILE:READ` 权限，获取用户的手机号需要 `PHONE:READ` 权限。

```
$$XIN:curl$$ "https://api.mixin.one/me"
```

```json
{
  "data":{
    $$XIN:...user$$
    $$XIN:...user_extra$$
  }
}
```
