---
title: Read Circle
sidebar_position: 2
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

import RespCircle from "@site/docs/_partials/_resp.circle.md";

## GET /circles/:id

Obtain the details of a certain circle

<APIEndpoint url="/circles/:id" />

<APIMetaPanel scope="CIRCLES:READ" />

<APIParams p-id="The ID of circle" p-id-required={true} />

<APIRequest
  title="Get circle details"
  url="/circles/a465ffdb-4441-4cb9-8b45-00cf79dfbc46"
/>

<RespCircle />
