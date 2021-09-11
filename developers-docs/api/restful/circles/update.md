---
title: Updating
sidebar_position: 12
---

# Updating

To modify the circle names, you need the `CIRCLES:WRITE` permission.

### `POST /circles/:id`

Request body data:

| Parameter | Type | Description |
| :----- | :----: | :---- |
| name | String | Circle name. |

curl demo:

```
$$XIN:curl$$ "https://api.mixin.one/circles/a465ffdb-4441-4cb9-8b45-00cf79dfbc46" -XPOST --data'{"name": "Friends"}'
```

The response:

```json
{
  "circle_id":"a465ffdb-4441-4cb9-8b45-00cf79dfbc46",
  "name":"Friends",
  "created_at":"2018-05-29T09:31:04.202186212Z"
}
```