# Block list

### `GET /blocking_users`

To obtain the block list of users, the `CONTACTS:READ` permission is required.

```
$$XIN:curl$$ "https://api.mixin.one/blocking_users"
```

```json
{
  "data":[
    $$XIN:user$$
  ...
  ]
}
```
