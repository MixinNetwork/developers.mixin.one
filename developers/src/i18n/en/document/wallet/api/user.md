# APP User

### `POST /users` 

| Name | Type | Description |
| :----- | :----: | :---- |
| session_secret | String | Base64 of RSA PUBLIC KEY |
| full_name | String | Name of An New User |

```
curl -i -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzMxMjAyMzAsImlhdCI6MTUyNTM0NDIzMCwianRpIjoiNjEyZDRjYTQtOGUwNC00YTk3LTgwZTMtN2UwMjY0OGE5ZmQ0Iiwic2lkIjoiYTM0YzA3YTktNzU1ZC00YjU0LTk0YzUtZTQ1ZTlhMmRkNDNlIiwic2lnIjoiMTI3YWVhOWU3MmZhMDJiZWE0MDdhZGNiYTA0M2IzMmM0YTRhN2U2NGIzMDU0NzcyMGRlMjk3YjE2NGU5MWVhMiIsInVpZCI6IjA2YWVkMWUzLWJkNzctNGE1OS05OTFhLTViYjVhZTZmYmIwOSJ9.g_sED63nqS_cf68FKh8Ow1-0B4Ew_ojYS76P52hhqcF-gjImI93vM7Q4PI0t8i4ddiePD9vT470pD3obtzpo7eHD1ECfDuQkxqJqvN8elRYLWPYHjzElu0JqHDDIXh1TCtzGLReR4ZmC9g9DkhxDhocP9srWdVDAU_FbJOjznOE" "https://api.mixin.one/users" -X POST --data '{"full_name":"Bot User","session_secret":"MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDMTuli9K9k7F+L7Rq34se23nQeV2yvjVGCZyRTbp8qNASnRq6N679ZflgVxNUsr2qkHN4eqvafrQ9IIcRXfofMlWWIU6MrgVVD0UEVyH4jKA5gUr4smU/SDnVLqb3TojYMELIKHgqnrjqDJ0b+vMUG1Iix4fi+CvjSiJzsWPOavQIDAQAB"}'
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