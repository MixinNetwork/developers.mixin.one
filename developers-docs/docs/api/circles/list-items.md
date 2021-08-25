---
title: List Items of Circles
sidebar_position: 7
---

import Request from '../../_partials/request'

## GET /circles/:id/conversations

To get all the conversations in a circle of a user, the `CIRCLES:READ` permission is required.

| Parameter | Description |
| :----- | :---- |
| limit | Optional, pagination per page data limit, 500 by default, 500 at most|
| offset | Optional, pagination start time, such as `2020-12-12T12:12:12.999999999Z` |


<Request title="List items" url="/circles/a465ffdb-4441-4cb9-8b45-00cf79dfbc46/conversations" />

```json title="Response"
{
  "data": [
    {
      "circle_id":        "a465ffdb-4441-4cb9-8b45-00cf79dfbc46",
      "conversation_id":  "e1524f3c-2e4f-411f-8a06-b5e1b1601308",
      "created_at":       "2018-05-29T09:31:04.202186212Z"
    },
    ...
  ]
}
```
