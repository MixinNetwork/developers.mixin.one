# 设置或修改 PIN 密码

### `POST /pin/update` 

请求 Body 数据

| 参数 | 类型 | 介绍 |
| :----- | :----: | :---- |
| old_pin | String | 空字符串或加密后的老密码 |
| pin | String | 加密后的新密码 |

```
curl -i -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzMxMDkzMDIsImlhdCI6MTUyNTMzMzMwMiwianRpIjoiZGNjNjM3ZGQtY2UxMi00MTQwLWI2YzItYjU1OGM1MTYxYzQxIiwic2lkIjoiYTM0YzA3YTktNzU1ZC00YjU0LTk0YzUtZTQ1ZTlhMmRkNDNlIiwic2lnIjoiZTdkMThmMDJmZjBhMTBjNzQ1MzI4OGIyYzkyNTMyZGQ5OWZlMWYyYjc1MzQzYWY0NWI4YjMyYjk2MTE1ZWRkOSIsInVpZCI6IjA2YWVkMWUzLWJkNzctNGE1OS05OTFhLTViYjVhZTZmYmIwOSJ9.R7p5uWHQJDldW-W2CK9sdn4rVKgUbV8ITD9oZZRgb_7j7YVTGF4ulJzt9M_GprKkXmNG2Ox9IO6uIQE-RvqHziSemGAoW1__fYnWrZ8ZyOo7EZeAkbGQ1W-gjjZKz9BqxBvakew_xdgQdnGv0aJq8WffnQkyNxy1DkmITR4kehg" "https://api.mixin.one/pin/update" -X POST --data '{"old_pin":"","pin":"+mRm5rm9bkQztvpsaTyz1Rib0BEM0S1FKl/oYaMfbUJM3ZmrxJhafj/tjHi+3kwQ"}'
```

```json
{
  "data":{
    "type":"user",
    "user_id":"06aed1e3-bd77-4a59-991a-5bb5ae6fbb09",
    "identity_number":"0",
    "session_id":"a34c07a9-755d-4b54-94c5-e45e9a2dd43e",
    "pin_token":"",
    "phone":"",
    "full_name":"Bot User",
    "biography":"",
    "avatar_url":"",
    "created_at":"2018-05-03T06:03:56.867971412Z",
  }
}
```

**设置初始密码 old_pin 应传空字符串。**