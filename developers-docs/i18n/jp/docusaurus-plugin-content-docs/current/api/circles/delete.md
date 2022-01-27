---
title: サークルの削除
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

サークルを削除します。

:::info
Note that deleting a circle will not delete the conversations and chat history under the circle.
:::

<APIEndpoint url="/circles/:id/delete" />

<APIMetaPanel scope="CIRCLES:WRITE" />

<APIParams p-id="The ID of circle." p-id-required={true} />

<APIRequest
  title="Delete a Circle"
  method="POST"
  url="/circles/a465ffdb-4441-4cb9-8b45-00cf79dfbc46/delete"
/>

成功すると、空のjsonファイルが返されます。
