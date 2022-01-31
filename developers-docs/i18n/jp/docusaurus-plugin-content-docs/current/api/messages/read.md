---
title: メッセージの読み込み
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

Mixin Serverからメッセージのリストを受信するには、ウェブソケット接続を設定する必要があります。また、メッセージの受信後、Mixin Serverにメッセージが送信されたこと、または読み込まれたことを伝える必要があります。

このAPIは、Mixin Serverにメッセージのステータスを一括して伝えるために使用されます。

<APIEndpoint url="/acknowledgements" />

<APIMetaPanel scope="Authorized" />

<APIPayload>{`[
  { "message_id": "message UUID", "status": "READ" },
  { "message_id": "message UUID", "status": "READ" },
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
  // up to 100 entries each time.
  { "message_id": "UUID", "status": "READ" },
  ...
]
```
