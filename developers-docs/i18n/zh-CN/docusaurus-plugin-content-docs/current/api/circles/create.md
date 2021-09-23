---
title: 创建圈子
sidebar_position: 3
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

import RespCircle from "../../_partials/_resp.circle.md";

## POST /circles

创建一个圈子。

<APIEndpoint url="/circles" />

<APIMetaPanel scope="CIRCLES:WRITE" />

<APIPayload>{`{
  "name":     "the circle's name",
}
`}</APIPayload>

<APIRequest
  title="Create a Circle"
  method="POST"
  url='/circles --data &apos;{"name": "Circle Name"}&apos;'
/>

<RespCircle />
