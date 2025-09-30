---
title: 获取会话密钥
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

获取用户的会话信息，请求参数为用户 ID 数组。

每个用户可能拥有多个 session，对应不同的 public_key。

:::info
仅返回已存在用户的 session，不存在的用户会被忽略。
:::

<APIEndpoint url="/sessions/fetch" />

<APIPayload>{`
// user_id 数组
[
"UUID",
"UUID",
"UUID"
]
`}</APIPayload>

<APIRequest
title="Read sessions"
method="POST"
url="/sessions/fetch --data '[&quot;06aed1e3-bd77-4a59-991a-5bb5ae6fbb09&quot;]'"
/>

<RespSessions />
