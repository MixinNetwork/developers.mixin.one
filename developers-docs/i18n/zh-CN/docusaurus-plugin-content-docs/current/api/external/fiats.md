---
title: 法币汇率
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

返回所有基于美元的法币汇率列表。

<APIEndpoint url="/external/fiats" />

<APIMetaPanel scope="Authorized" scopeNote="" />

<APIRequest title="Get Fiats Rate" url="/external/fiats" />

```json title="Response"
{
  "data": [
    { "code": "ISK", "rate": 121.13998 },
    { "code": "CNY", "rate": 6.9669 },
    ...
  ]
}
```
