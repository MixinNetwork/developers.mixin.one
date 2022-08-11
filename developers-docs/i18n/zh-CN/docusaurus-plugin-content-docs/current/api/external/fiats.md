---
title: 读取法定货币汇率
sidebar_position: 24
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

## GET /external/fiats

本 API 返回一系列法定货币的汇率。

<APIEndpoint url="/external/fiats" />

<APIMetaPanel scopeNote="" />

<APIRequest title="Get Fiats Rate" isPublic url="/external/fiats" />

```json title="Response"
{
  "data": [
    { "code": "ISK", "rate": 121.13998 },
    { "code": "CNY", "rate": 6.9669 },
    ...
  ]
}
```
