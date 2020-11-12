# APP User

### `POST /users` 

| Name | Type | Description |
| :----- | :----: | :---- |
| session_secret | String | Base64 of RSA PUBLIC KEY |
| full_name | String | Name of An New User |

```
$$XIN:curl$$ "https://api.mixin.one/users" -X POST --data '{"full_name":"Bot User","session_secret":"MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDMTuli9K9k7F+L7Rq34se23nQeV2yvjVGCZyRTbp8qNASnRq6N679ZflgVxNUsr2qkHN4eqvafrQ9IIcRXfofMlWWIU6MrgVVD0UEVyH4jKA5gUr4smU/SDnVLqb3TojYMELIKHgqnrjqDJ0b+vMUG1Iix4fi+CvjSiJzsWPOavQIDAQAB"}'
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