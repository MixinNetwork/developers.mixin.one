---
title: 消息回执
sidebar_position: 4
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

## POST /acknowledgements

接收消息需要先与 Mixin Server 建立 WebSocket 连接。收到消息后需要通知服务器消息已投递或已读，否则服务器会持续推送。

该接口用于批量上报消息状态。

<APIEndpoint url="/acknowledgements" />

<APIMetaPanel scope="Authorized" />

<APIPayload>{`[
  { "message_id": "消息 UUID", "status": "READ" },
  { "message_id": "消息 UUID", "status": "READ" },
  ...
]
`}</APIPayload>

<APIRequest
  title="Ack messages"
  method="POST"
  url='/acknowledgements --data &apos;[{"message_id":"928c5c40-769c-3e97-8387-fb1ae0645311", "status":"READ"}]&apos;'
/>

```json title="Response"
[
  // 每次最多 100 条
  { "message_id": "UUID", "status": "READ" },
  ...
]
```
