---
title: サークルの一覧表示
sidebar_position: 7
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

## GET /circles/:id/conversations

ユーザーのサークル内のすべての会話を取得します。

<APIEndpoint url="/circles/:id/conversations" />

<APIMetaPanel scope="CIRCLES:READ" />

<APIParams
  p-limit="pagination per page data limit, 500 by default, 500 at most."
  p-offset="pagination start time, such as `2020-12-12T12:12:12.999999999Z`"
/>

<APIRequest
  title="List items"
  url="/circles/a465ffdb-4441-4cb9-8b45-00cf79dfbc46/conversations"
/>

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
