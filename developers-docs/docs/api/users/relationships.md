---
title: Relationships
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

This API is used to manage the relationship between two users.

<APIEndpoint url="/relationships" />

<APIMetaPanel scope="Authorized" scopeNote="" />

According to different payload, the API have different behaviors.

### Add a Friend and set an alias

<APIPayload>{`{
  "user_id":    "user's user_id"
  "full_name":  "the alias of the friend, optinal."
  "action":     "ADD"
}
`}</APIPayload>

### Delete a Friend

<APIPayload>{`{
  "user_id":    "user's user_id"
  "action":     "REMOVE"
}
`}</APIPayload>

### Block a User

<APIPayload>{`{
  "user_id":    "user's user_id"
  "action":     "BLOCK"
}
`}</APIPayload>

### Unblock a User

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

Get blocked users.

<APIEndpoint url="/blocking_users" />

<APIMetaPanel scope="CONTACTS:READ" scopeNote="" />

<APIRequest title="Read Blocking Users" url="/blocking_users" />

<RespUsers />
