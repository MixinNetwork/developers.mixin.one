# Read Profile

### `GET /me`

Read self profile, `PROFILE:READ` permission is required.

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
