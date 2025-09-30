---
title: 更新圈子
sidebar_position: 5
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

import RespCircle from "@site/docs/_partials/_resp.circle.md";

## POST /circles/:id

修改圈子名称。

<APIEndpoint url="/circles/:id" />

<APIMetaPanel scope="CIRCLES:WRITE" />

<APIParams p-id="圈子 ID" p-id-required={true} />

<APIPayload>{`{
  "name":     "圈子名称"
}
`}</APIPayload>

<APIRequest
  title="Update a Circle"
  method="POST"
  url='/circles/a465ffdb-4441-4cb9-8b45-00cf79dfbc46 --data &apos;{"name": "Circle Name"}&apos;'
/>

<RespCircle />
