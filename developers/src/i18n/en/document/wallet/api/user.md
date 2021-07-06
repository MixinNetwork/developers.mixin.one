# Registering Mixin Network Users

### `POST /users` 

The HTTP request body:

| Parameter | Type | Intro |
| :----- | :----: | :---- |
| session_secret | String | Ed25519 Public Key in Base64 |
| full_name | String | Username |

With curl:

```
$$XIN:curl$$ "https://api.mixin.one/users" -X POST --data '{"full_name":"Bot User","session_secret":"MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDMTuli9K9k7F+L7Rq34se23nQeV2yvjVGCZyRTbp8qNASnRq6N679ZflgVxNUsr2qkHN4eqvafrQ9IIcRXfofMlWWIU6MrgVVD0UEVyH4jKA5gUr4smU/SDnVLqb3TojYMELIKHgqnrjqDJ0b+vMUG1Iix4fi+CvjSiJzsWPOavQIDAQAB"}'
```

The response goes:

```json
{
  "data":{
    "user_id":"06aed1e3-bd77-4a59-991a-5bb5ae6fbb09",     // User Id
    "session_id":"a34c07a9-755d-4b54-94c5-e45e9a2dd43e",  // Session Id
    "pin_token":"",                                       // PIN
    "full_name":"Bot User",                               // Nickname
    "biography":"",                                       // Brief Intro
    "avatar_url":"",                                      // Avatar
    "created_at":"2018-05-03T06:03:56.867971412Z",        // Creation Timestamp
  }
}
```