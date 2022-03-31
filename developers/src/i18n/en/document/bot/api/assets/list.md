# Asset List

To obtain the asset list of a user, the `ASSETS:READ` permission is required.

### `GET /assets`

```shell
$$XIN:curl$$ "https://api.mixin.one/assets"
```

```json
{
  "data":[
    $$XIN:asset$$,
    ...
  ]
}
```
