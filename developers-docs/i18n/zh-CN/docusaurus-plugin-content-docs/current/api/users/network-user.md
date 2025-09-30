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

import RespUserNet from "@site/docs/_partials/_resp.user-net.md";

## POST /users

创建一个网络用户。每个网络用户费用为 0.5 美元 [（价格说明）](https://discuss.mixin.one/questions/D1pB)。

<APIEndpoint url="/users" />

<APIMetaPanel
  scope=""
  limitation="仅应用用户可以创建网络用户"
/>

<APIPayload>{`{
  // 以 Base64 表示的 Ed25519 公钥
  "session_secret": "Ed25519 Public Key in Base64",
  // 显示名称
  "full_name": "A name"
}
`}</APIPayload>

<APIRequest
  title="Create Network User"
  method="POST"
  url='/users -data &apos;{"full_name": "Bot User","session_secret": SECRET}&apos;'
/>

<RespUserNet />
