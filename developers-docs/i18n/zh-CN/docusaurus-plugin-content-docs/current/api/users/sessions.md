---
title: 用户会话
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";
import RespSessions from "@site/docs/_partials/_resp.sessions.md";

## POST /sessions/fetch

获取 Mixin 用户的会话信息, 请求参数是用户 uuid 的数组，注意一个用户可能会有多个 session, public_key 不同。

:::info
接口只会返回存在的用户的会话，不存在的会直接忽略。
:::

<APIEndpoint url="/sessions/fetch" />

<APIPayload>{`
// user_id 的数组
[
  "UUID",
  "UUID",
  "UUID",
]
`}</APIPayload>

<APIRequest
  title="Read sessions"
  method="POST"
  url="/sessions/fetch --data '[&quot;06aed1e3-bd77-4a59-991a-5bb5ae6fbb09&quot;]'"
/>

<RespSessions />
