# Create & Update PIN

### `POST /pin/update` 

| Name | Type | Description |
| :----- | :----: | :---- |
| old_pin | String | "" OR Old Encrypted PIN. |
| pin | String | Encrypted New PIN. |

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

**Set the initial PIN old_pin should pass an empty string.**