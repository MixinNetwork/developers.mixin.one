# 个人信息

### `GET /me`

获取授权用户的个人基本信息，需要 `PROFILE:READ` 权限，获取用户的手机号需要 `PHONE:READ` 权限。

```
curl -i -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzMxMDUzODIsImlhdCI6MTUyNTMyOTM4MiwianRpIjoiZDcwMjdiOWUtNzcxYy00ZDA5LTlkMjQtNGVlYjc5YmJhNGM2Iiwic2lkIjoiYTM0YzA3YTktNzU1ZC00YjU0LTk0YzUtZTQ1ZTlhMmRkNDNlIiwic2lnIjoiNzEyNjY0ZmE4NDI4ZWM4Njg5MjA3YzdhOWE1MTNlMzlhNTk2MWMxODQwNmVkOTlkMzViNzNmMTIyYTdlOWIwMyIsInVpZCI6IjA2YWVkMWUzLWJkNzctNGE1OS05OTFhLTViYjVhZTZmYmIwOSJ9.FZryq34iN5TSxG4eMhYe4oe56IR5E_PaiKxIqwlIrAExg8ghJ5uXmOAg6_9V6lWXjl4ZIDuadQ5mGMNqxJfrj0kYS9Tb5dJUzA4xKKqbUXmPsk4VFLyFLg3CJUJmgQqpL62doHSW_0T9EA7W03tLTQZ-nbjhpca7eK3U-KRgK-E" "https://api.mixin.one/me"
```

```json
{
  "data":{
    "type":"user",
    "user_id":"06aed1e3-bd77-4a59-991a-5bb5ae6fbb09",
    "identity_number":"7000",
    "phone":"+8613801380138",
    "full_name":"Around World",
    "biography":"",
    "avatar_url":"",
    "relationship":"ME",
    "mute_until":"0001-01-01T00:00:00Z",
    "created_at":"2018-05-03T06:03:56.867971412Z",
    "is_verified":false,
    "session_id":"a34c07a9-755d-4b54-94c5-e45e9a2dd43e",
    "pin_token":"",
    "code_id":"dabcf1c2-6a5e-4ea3-ad51-6e6641a06c7c",
    "code_url":"https://mixin.one/codes/dabcf1c2-6a5e-4ea3-ad51-6e6641a06c7c",
    "has_pin":true,
    "has_emergency_contact":true,
    "receive_message_source":"CONTACTS",
    "accept_conversation_source":"CONTACTS",
    "fiat_currency":"USD",
    "transfer_notification_threshold":0
  }
}
```