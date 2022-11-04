---
title: 用户关系
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

在 Mixin Messenger 当中，用户可以添加另一位 Messenger，或者机器人为好友，或者拉黑另一位 Messenger 或 机器人用户。这些 API 主要就是用来管理用户的联系人相关信息。

## POST /relationships

该 API 用来管理用户的关系，包括：

1. 添加联系人
2. 更新联系人信息
3. 删除联系人
4. 拉黑另一名用户
5. 取消拉黑另一名用户

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
