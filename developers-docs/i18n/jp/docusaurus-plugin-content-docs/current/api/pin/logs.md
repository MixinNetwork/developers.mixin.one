---
title: PINコードのエラーログ
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

ユーザーのPINコードのエラーログ記録を照会し、それに基づいて開発者が24時間以内にエラーの回数をユーザーに知らせることができます。

<APIEndpoint url="/logs?limit=:limit&offset=:offset&category=:category" />

<APIMetaPanel scope="Authorized" scopeNote="" />

<APIParams
  p-limit="Pagination limit, maximamlly 100."
  p-offset="Pagination start time, e.g. `2020-12-12T12:12:12.999999999Z`"
  p-category="Log type, please set to `PIN_INCORRECT`"
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
