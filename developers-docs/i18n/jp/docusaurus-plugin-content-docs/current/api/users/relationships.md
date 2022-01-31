---
title: ユーザー間の関係
sidebar_position: 5
---

import {
  APIRequest,
  APIMetaPanel,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";
import RespUsers from "../../_partials/_resp.user-extra.md";

<!-- @TODO refactor this doc -->

## POST /relationships

このAPIは、ユーザー間の関係を管理するために利用されます。

<APIEndpoint url="/relationships" />

<APIMetaPanel scope="Authorized" scopeNote="" />

ペイロードの違いにより、APIの動作は異なります。

### Add a Friend and set an alias

<APIPayload>{`{
  "user_id":    "user's user_id"
  "full_name":  "the alias of the friend, optinal."
  "phone":  "the phone number the friend, optinal."
  "action":     "ADD"
}
`}</APIPayload>

### ユーザーの削除

<APIPayload>{`{
  "user_id":    "user's user_id"
  "action":     "REMOVE"
}
`}</APIPayload>

### ユーザーのブロック

<APIPayload>{`{
  "user_id":    "user's user_id"
  "action":     "BLOCK"
}
`}</APIPayload>

### ユーザーのブロック解除

<APIPayload>{`{
  "user_id":    "user's user_id"
  "action":     "UNBLOCK"
}
`}</APIPayload>

<APIRequest
  title="Manage Relationships"
  method="POST"
  url="/relationships --data REQUEST_BODY"
/>

<RespUsers />

## GET /blocking_users

ブロックしたユーザーを取得します。

<APIEndpoint url="/blocking_users" />

<APIMetaPanel scope="CONTACTS:READ" scopeNote="" />

<APIRequest title="Read Blocking Users" url="/blocking_users" />

<RespUsers />
