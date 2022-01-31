---
title: 複数ユーザーの取得
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

ユーザーIDによってユーザー情報を一括で取得します。。

:::注意
このAPIは、存在するユーザーのリストのみを返し、存在しないユーザーは無視します。
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
