# Profile

### `GET /me`

To obtain the basic personal information of a user, the `PROFILE:READ` permission is required, and to obtain the user's mobile phone number, the `PHONE:READ` permission is required.


```
$$XIN:curl$$ "https://api.mixin.one/me"
```

```json
{
  "data":{
    $$XIN:...user$$
    $$XIN:...user_extra$$
  }
}
```
