---
title: Read Users
sidebar_position: 2
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";
import RespUsers from "../../_partials/_resp.users.md";

## POST /users/fetch

Getting users' information by user IDs in bulk.

:::info
This API will only return the list of existing users, and ignore those that do not exist.
:::

<APIEndpoint url="/users/fetch" />

<APIMetaPanel
  scope="PROFILE:READ"
  scopeNote="If the `PHONE:READ` permission granted, you will obtain the user's mobile phone number"
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
