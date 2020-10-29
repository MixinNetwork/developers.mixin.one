# 获取用户信息

根据 User ID 获取用户信息

### `GET /users/:id` 

```
curl -i -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzMxMDg1NjMsImlhdCI6MTUyNTMzMjU2MywianRpIjoiODA2ZDJiM2QtZWE5OS00NWI5LTkzODQtY2Q5ZDY5NzVmOGFlIiwic2lkIjoiYTM0YzA3YTktNzU1ZC00YjU0LTk0YzUtZTQ1ZTlhMmRkNDNlIiwic2lnIjoiN2EwMzhjZGNmYjg1YTc4YWI2NGViODcwNWFjYmU5NmNlNzEwNmFjY2IzN2Q3ZmVmZjBlZDdlNDJhM2JmNTU2ZCIsInVpZCI6IjA2YWVkMWUzLWJkNzctNGE1OS05OTFhLTViYjVhZTZmYmIwOSJ9.TC5327AW_74W3ou0zXlBhzMuBPeE75iEK4ESKaCGlh-7vDixlJ8vKhIalUQ8qVHEHvCpSFCc-B4imQ0h4ICjrVuL1Is_JOaXx-nI_Pegb5tkWszCeFMYCXUBeBUFH6ACaZyP-VwUiT4_Ro5l1EjziCGix0GcKAjApqf1m25Pz10" "https://api.mixin.one/users/06aed1e3-bd77-4a59-991a-5bb5ae6fbb09"
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