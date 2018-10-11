---
title: Friends
category: Mixin Messenger
order: 8
---

Get user’s friends

###### GET /friends

```
// cURL Example
curl -i -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzMxMTQyMjEsImlhdCI6MTUyNTMzODIyMSwianRpIjoiYTVhZGQ1ZmUtMzYxNC00OWQ0LWExZWQtMDE3YWMyYzllMGFlIiwic2lkIjoiYTM0YzA3YTktNzU1ZC00YjU0LTk0YzUtZTQ1ZTlhMmRkNDNlIiwic2lnIjoiMDQ1ZjZiYjVlMjI5ZDExZTA2ZmI4ZjlkNTYzODQ2N2Y0NzljZjhkY2U4MjhmZjAxZjJjODFiYjEzZjVjOWVkYSIsInVpZCI6IjA2YWVkMWUzLWJkNzctNGE1OS05OTFhLTViYjVhZTZmYmIwOSJ9.GnUBKqkqz6RTWnwtBjSdQnCVecTrYziTUPC0sVVd4_5OWcQ4JbGk01jQ8vFUD-6UW0F-Q6JxQ3L44sDa7smQMxzJaW1C3ihciMKiuqk1J2gXV4395t1Lb8jsKbs-ggBSoZsuJgtOm55_nKm0ZvpcXUJbicBjq6R8tbWbHVuU_Ec" "https://api.mixin.one/contacts"
```

```
// Sample Response
{
  "data":[{  
    "type":"user",
      "user_id":"06aed1e3-bd77-4a59-991a-5bb5ae6fbb09",
      "identity_number":"7000",
      "full_name":"Around World",
      "avatar_url":"",
      "relationship":"FRIEND",
      "mute_until":"0001-01-01T00:00:00Z",
      "created_at":"2018-05-03T06:03:56.867971412Z",
      "is_verified":false
  },
  ...
  ]
}
```
