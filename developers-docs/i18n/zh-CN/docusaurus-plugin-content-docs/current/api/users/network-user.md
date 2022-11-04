---
title: 创建网络用户
sidebar_position: 7
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

import RespUserNet from "../../_partials/_resp.user-net.md";

## POST /users

创建一个 Network User, Network User 是机器人下面的子帐号，API 使用有限制，只能对资产进行操作，比如充值，转帐，提现。没有办法像 Messenger User 那样聊天。

<APIEndpoint url="/users" />

<APIMetaPanel
  scope=""
  limitation="只有机器人可以创建 Network User"
/>

<APIPayload>{`{
  // Ed25519 Public Key in Base64
  "session_secret": 'Ed25519 Public Key in Base64'
  // display name
  "full_name": 'A name'
}
`}</APIPayload>

<APIRequest
  title="Create Network User"
  method="POST"
  url='/users -data &apos;{"full_name": "Bot User","session_secret": SECRET}&apos;'
/>

<RespUserNet />
