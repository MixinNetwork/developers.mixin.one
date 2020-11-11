# 搜索用户

### `GET /search/:q` 

- 参数 `:q` ：Mixin ID 或者手机号

```
$$XIN:curl$$ "https://api.mixin.one/search/7000"
```

```json
{
  "data": $$XIN:user$$
}
```

**为避免恶意抓取用户数据，本 API 有请求频率限制，如遇 429 错误等 12 小时再试。**
