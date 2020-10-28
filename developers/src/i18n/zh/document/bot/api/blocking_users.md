# 屏蔽名单

### `GET /blocking_users`

获取授权用户的屏蔽名单，需要 `CONTACTS:READ` 权限。

```
curl -i -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzMxMTQyMjEsImlhdCI6MTUyNTMzODIyMSwianRpIjoiYTVhZGQ1ZmUtMzYxNC00OWQ0LWExZWQtMDE3YWMyYzllMGFlIiwic2lkIjoiYTM0YzA3YTktNzU1ZC00YjU0LTk0YzUtZTQ1ZTlhMmRkNDNlIiwic2lnIjoiMDQ1ZjZiYjVlMjI5ZDExZTA2ZmI4ZjlkNTYzODQ2N2Y0NzljZjhkY2U4MjhmZjAxZjJjODFiYjEzZjVjOWVkYSIsInVpZCI6IjA2YWVkMWUzLWJkNzctNGE1OS05OTFhLTViYjVhZTZmYmIwOSJ9.GnUBKqkqz6RTWnwtBjSdQnCVecTrYziTUPC0sVVd4_5OWcQ4JbGk01jQ8vFUD-6UW0F-Q6JxQ3L44sDa7smQMxzJaW1C3ihciMKiuqk1J2gXV4395t1Lb8jsKbs-ggBSoZsuJgtOm55_nKm0ZvpcXUJbicBjq6R8tbWbHVuU_Ec" "https://api.mixin.one/blocking_users"
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