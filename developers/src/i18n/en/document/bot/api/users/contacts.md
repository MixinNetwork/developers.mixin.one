# Friends

### `GET /friends`

Get user’s friends, `CONTACTS:READ` permission is required.

```
$$XIN:curl$$ "https://api.mixin.one/friends"
```

```json
{
  "data":[
    $$XIN:user$$,
    ...
  ]
}
```
