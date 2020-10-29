# 搜索用户

### `GET /search/:q` 

- 参数 `:q` ：Mixin ID 或者手机号

```
curl -i --header "Authorization: Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MjgwODI4ODEsImlhdCI6MTUyODA4MjcwMSwianRpIjoiYWQyNDY5ZTMtOTk2NS00NzRlLTg5OTktYzhjNTIwYzViN2I2Iiwic2lkIjoiZTJiZjhkMjItZGM5My00MmVlLTk1NDUtMTZmMDVkMmU1ODBjIiwic2lnIjoiMzczMTNmZGJmMmNjNmIwYzgwYmU4NjY4NGY5YTQ4ZDNhY2I5YTM3ZmRiMWQ0MzRhMzE3ZTZhYWUwYTkyZjdkOSIsInVpZCI6Ijg5ZTBiZGVlLWMzNTUtNDdmMi05NDVhLWJlNDhiZTg3NTYwNiJ9.hmw2aL4Wy6vwzj9_qxSFcvMiyMpkTpD-UUXj8cOrJ3IspLhRKuATT2u5kTPMIEZnxQkPEpnbPUJ27F0eVWSbGLKANBS3bjehPEFmypb3TlY7wo063CNAXPiDi5Omroaq5ikgj8igNxDvXm4gznn26Y0W-h4cN1ERTxyRD-78QIQ" --header "Content-Type: application/json" --header "Content-length: 0" "https://api.mixin.one/search/7000"
```

```json
{
  "data":{
    "type":"user",
      "user_id":"773e5e77-4107-45c2-b648-8fc722ed77f5",
      "identity_number":"7000",
      "phone":"+8613801380138",
      "full_name":"Team Mixin",
      "biography":"",
      "avatar_url":"https://images.mixin.one/E2y0BnTopFK9qey0YI-8xV3M82kudNnTaGw0U5SU065864SsewNUo6fe9kDF1HIzVYhXqzws4lBZnLj1lPsjk-0=s256",
      "relationship":"STRANGER",
      "mute_until":"0001-01-01T00:00:00Z",
      "created_at":"2017-12-23T18:23:26.996149Z",
      "is_verified":true
  }
}
```

**为避免恶意抓取用户数据，本 API 有请求频率限制，如遇 429 错误等 12 小时再试。**