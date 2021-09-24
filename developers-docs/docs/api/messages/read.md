---
title: Read Messages
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

To receive a list of messages from Mixin Server, you need to setup a websocket connection. After receiving messages, you need to call tell Mixin Server that it has been delivered or read, otherwise it will keep pushing the message.

This API use to tell Mixin Server the status of messages in bulk.

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
