---
title: 删除圈子
sidebar_position: 4
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

## POST /circles/:id/delete

删除指定圈子。

:::info
删除圈子不会影响其中的会话和聊天记录。
:::

<APIEndpoint url="/circles/:id/delete" />

<APIMetaPanel scope="CIRCLES:WRITE" />

<APIParams p-id="圈子 ID" p-id-required={true} />

<APIRequest
  title="Delete a Circle"
  method="POST"
  url="/circles/a465ffdb-4441-4cb9-8b45-00cf79dfbc46/delete"
/>

成功时返回空 JSON。
