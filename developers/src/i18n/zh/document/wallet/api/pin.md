# 设置或修改 PIN 密码

### `POST /pin/update` 

请求 Body 数据

| 参数 | 类型 | 介绍 |
| :----- | :----: | :---- |
| old_pin | String | 空字符串或加密后的老密码 |
| pin | String | 加密后的新密码 |

```
$$XIN:curl$$ "https://api.mixin.one/pin/update" -X POST --data '{"old_pin":"","pin":"+mRm5rm9bkQztvpsaTyz1Rib0BEM0S1FKl/oYaMfbUJM3ZmrxJhafj/tjHi+3kwQ"}'
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