---
title: Read Sessions
---

import {
APIMetaPanel,
APIRequest,
APIEndpoint,
APIParams,
APIPayload,
} from "@site/src/components/api";
import RespSessions from "../../_partials/_resp.sessions.md";

## POST /sessions/fetch

Get the information of sessions of Mixin User, request parameter is an array of uuid. 
One user could have multiple sessions that have different public_key.

:::info
Only returns sessions of existed users, non-existent user would be ignored.
:::

<APIEndpoint url="/sessions/fetch" />

<APIPayload>{`
// array of user_ids
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

