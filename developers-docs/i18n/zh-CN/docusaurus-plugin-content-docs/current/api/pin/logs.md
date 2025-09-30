---
title: PIN 错误记录
sidebar_position: 3
---

import {
  APIRequest,
  APIMetaPanel,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

## GET /logs

查询用户 PIN 的错误记录，便于在 24 小时内提示用户累计错误次数。

<APIEndpoint url="/logs?limit=:limit&offset=:offset&category=:category" />

<APIMetaPanel scope="Authorized" scopeNote="" />

<APIParams
  p-limit="分页大小，最大值 100"
  p-offset="分页起始时间，例如 `2020-12-12T12:12:12.999999999Z`"
  p-category="日志类型，请设置为 `PIN_INCORRECT`"
/>

<APIRequest title="Get PIN Logs" url="/logs?category=PIN_INCORRECT&limit=1" />

```json title="Response"
{
  "data": {
    "type": "log",
    "log_id": "06aed1e3-bd77-4a59-991a-5bb5ae6fbb09",
    "code": "WITHDRAWAL",
    "ip_address": "124.64.120.192",
    "created_at": "2018-05-03T06:03:56.867971412Z"
  }
}
```
