# Circle List

To obtain all circles of a user, the `CIRCLES:READ` permission is required.

### `GET /circles`

curl demo:

```
$$XIN:curl$$ "https://api.mixin.one/circles"
```

The response:

```json
{
  "data":[
    {
      "circle_id":"a465ffdb-4441-4cb9-8b45-00cf79dfbc46",
      "name":"Friends",
      "created_at":"2018-05-29T09:31:04.202186212Z"
    },
    ...
  ]
}
```
