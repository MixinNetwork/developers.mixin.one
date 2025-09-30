---
title: Create Circles
sidebar_position: 3
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

import RespCircle from "@site/docs/_partials/_resp.circle.md";

## POST /circles

Create a circle.

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
