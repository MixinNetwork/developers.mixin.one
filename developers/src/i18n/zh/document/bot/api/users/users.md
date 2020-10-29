# 批量获取用户

批量获取用户信息

### `POST /users/fetch` 

请求 Body 数据 `["UUID","UUID","UUID"]` 为用户 ID 数组

```
curl -i -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzMxMDg3OTYsImlhdCI6MTUyNTMzMjc5NiwianRpIjoiYzJiYzFiY2MtZTA4ZC00M2JlLWJhN2EtZGJlMWFlN2UxMzU3Iiwic2lkIjoiYTM0YzA3YTktNzU1ZC00YjU0LTk0YzUtZTQ1ZTlhMmRkNDNlIiwic2lnIjoiYzlkNDU1M2Q3ZmI3YjM4NDkxZjAxMmYyODQ0MTNhZmM0ODYzZTdhYWM4Nzg2NTVkNWU3NWFmM2VjYjQ0NjE5MyIsInVpZCI6IjA2YWVkMWUzLWJkNzctNGE1OS05OTFhLTViYjVhZTZmYmIwOSJ9.vBp791ho-lgGgGnRWw3CAtRXgK7TvQxXwYOikB-XVbBGRYeMEmkGdja8r461w-5t5JzEt9Y-yNYGWRE0oZ8DEuxgdcBe13FIP4UBgFw7dTG1SyvcQEO0BQtfiBL_8de8VuKntezfONkseOXUkG6IQ2qCBzZgijLwIbh3h-wPs6Q" "https://api.mixin.one/users/fetch" -X POST --data '["06aed1e3-bd77-4a59-991a-5bb5ae6fbb09"]'
```

```json
{
  "data":[{
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
  },
  ...
  ]
}
```

**只返回存在的用户列表，有不存的会忽略**