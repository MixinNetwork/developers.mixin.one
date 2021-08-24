---
title: Read Circle
sidebar_position: 2
---

## GET /circles/:id

To obtain the details of a certain circle, the `CIRCLES:READ` permission is required.

```bash
$$XIN:curl$$ "https://api.mixin.one/circles/a465ffdb-4441-4cb9-8b45-00cf79dfbc46"
```

The response:

```json
{
  "circle_id":"a465ffdb-4441-4cb9-8b45-00cf79dfbc46",
  "name":"Friends",
  "created_at":"2018-05-29T09:31:04.202186212Z"
}
```
