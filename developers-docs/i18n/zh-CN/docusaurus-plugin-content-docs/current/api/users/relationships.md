---
title: 好友关系
sidebar_position: 5
---

import {
  APIRequest,
  APIMetaPanel,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";
import RespUsers from "@site/docs/_partials/_resp.user-extra.md";

## POST /relationships

管理两个用户之间的关系。

<APIEndpoint url="/relationships" />

<APIMetaPanel scope="Authorized" scopeNote="" />

根据不同的请求体，接口执行对应操作。

### 添加好友并设置备注

<APIPayload>{`{
  "user_id":    "好友的 user_id",
  "full_name":  "好友备注，可选",
  "phone":      "好友手机号，可选",
  "action":     "ADD"
}
`}</APIPayload>

### 删除好友

<APIPayload>{`{
  "user_id":    "好友的 user_id",
  "action":     "REMOVE"
}
`}</APIPayload>

### 拉黑用户

<APIPayload>{`{
  "user_id":    "用户的 user_id",
  "action":     "BLOCK"
}
`}</APIPayload>

### 取消拉黑

<APIPayload>{`{
  "user_id":    "用户的 user_id",
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

获取黑名单用户。

<APIEndpoint url="/blocking_users" />

<APIMetaPanel scope="CONTACTS:READ" scopeNote="" />

<APIRequest title="Read Blocking Users" url="/blocking_users" />

<RespUsers />
