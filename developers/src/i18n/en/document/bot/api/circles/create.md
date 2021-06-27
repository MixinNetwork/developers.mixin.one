# Creating

To help users create circles, you need the `CIRCLES:WRITE` permission.

### `POST /circles`

Request body data:

| Parameter | Type | Description |
| :----- | :----: | :---- |
| name | String | Name of the circle. |

curl demo:

```
$$XIN:curl$$ "https://api.mixin.one/circles -XPOST --data '{"name": "Friends"}'
```

The response:

```json
{
  "circle_id":"a465ffdb-4441-4cb9-8b45-00cf79dfbc46",
  "name":"Friends",
  "created_at":"2018-05-29T09:31:04.202186212Z"
}
```