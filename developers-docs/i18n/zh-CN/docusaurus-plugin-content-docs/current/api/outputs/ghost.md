---
title: 一次性私钥
sidebar_position: 1
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

## POST /outputs

Mixin 主网地址给 Messenger 用户转帐时，需要用户一次性私钥.

<APIEndpoint url="/outputs" />

<APIMetaPanel scope="Authorized" scopeNote="" />

<APIPayload>{`[{
  "receivers":  "用户 uuid 数组",
  "index":      "Output index.",
  "hint":       "Unique ghosts generated for users.",
}]
`}</APIPayload>

<!-- @TODO 这里原来的 example 就是错的，虽然按照理解改了，但是依然需要修正 -->

<APIRequest title="Generate outputs" url="/outputs --data PAYLOAD" />

```json title="Response"
{
  "data": [{
    "type": "ghost_key",
    "mask": "ab56be4cxxxx244f9a433f35",
    "keys": ["ab56be4cxxxx244f9a433f35"]
  },
  ...
  ]
}
```
