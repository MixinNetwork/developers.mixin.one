---
title: 多个用户
sidebar_position: 2
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";
import RespUsers from "@site/docs/_partials/_resp.users.md";

## POST /users/fetch

获取多个用户的基本信息。

:::info
该 API 只会返回存在用户的信息，如果用户不存在并不会报错。
:::

<APIEndpoint url="/users/fetch" />

<APIMetaPanel
  scope="PROFILE:READ"
  scopeNote="如果用户有 `PHONE:READ` 授权，会返回用户的手机号。"
/>

<APIPayload>{`[
  // array of user_id
  "UUID",
  "UUID",
  "UUID",
]
`}</APIPayload>

<APIRequest
  title="Read Users"
  method="POST"
  url="/users/fetch --data '[&quot;06aed1e3-bd77-4a59-991a-5bb5ae6fbb09&quot;]'"
/>

<RespUsers />
