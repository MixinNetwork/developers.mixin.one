---
title: 查看圈子中的会话
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

获取某个圈子下的所有会话。

<APIEndpoint url="/circles/:id/conversations" />

<APIMetaPanel scope="CIRCLES:READ" />

<APIParams
  p-limit="每页数量，默认为 500，最大 500"
  p-offset="分页起始时间，例如 `2020-12-12T12:12:12.999999999Z`"
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
