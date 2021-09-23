---
title: 读取圈子信息
sidebar_position: 2
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

import RespCircle from "../../_partials/_resp.circle.md";

## GET /circles/:id

获取某个圈子的详细信息。

<APIEndpoint url="/circles/:id" />

<APIMetaPanel scope="CIRCLES:READ" />

<APIParams p-id="The ID of circle" p-id-required={true} />

<APIRequest
  title="Get circle details"
  url="/circles/a465ffdb-4441-4cb9-8b45-00cf79dfbc46"
/>

<RespCircle />
