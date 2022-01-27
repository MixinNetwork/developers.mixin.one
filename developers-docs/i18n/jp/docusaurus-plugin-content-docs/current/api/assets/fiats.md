---
title: 法定通貨との為替レートの読み込み
sidebar_position: 24
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

## GET /fiats

米ドルを中心に法定通貨との為替レートを返します。

<APIEndpoint url="/fiats" />

<APIMetaPanel scope="Authorized" scopeNote="" />

<APIRequest title="Get Fiats Rate" url="/fiats"/>

```json title="Response"
{
  "data": [
    { "code": "ISK", "rate": 121.13998 },
    { "code": "CNY", "rate": 6.9669 },
    ...
  ]
}
```
