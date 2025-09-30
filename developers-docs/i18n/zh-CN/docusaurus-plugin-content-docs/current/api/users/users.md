---
title: 批量查询用户
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

根据用户 ID 批量获取用户信息。

:::info
仅返回已存在的用户，未找到的用户会被忽略。
:::

<APIEndpoint url="/users/fetch" />

<APIMetaPanel
  scope="PROFILE:READ"
  scopeNote="如授予 `PHONE:READ` 权限，可获取用户手机号"
/>

<APIPayload>{`[
  // user_id 数组
  "UUID",
  "UUID",
  "UUID"
]
`}</APIPayload>

<APIRequest
  title="Read Users"
  method="POST"
  url="/users/fetch --data '[&quot;06aed1e3-bd77-4a59-991a-5bb5ae6fbb09&quot;]'"
/>

<RespUsers />
