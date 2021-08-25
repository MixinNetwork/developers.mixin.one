---
title: Read Messages
sidebar_position: 4
---

import Request from '../../_partials/request'

To receive a list of messages from Mixin message service, you need to setup a websocket connection.

After receiving the message via WebSocket, you need to tell Mixin message service that it has been delivered, otherwise it will keep pushing the message.

## POST /acknowledgements

<Request title="Ack messages" method="POST" url="/acknowledgements --data '[{&quot;message_id&quot;:&quot;928c5c40-769c-3e97-8387-fb1ae0645311&quot;, &quot;status&quot;:&quot;READ&quot;}]'" />

```json title="Response"
[
  // up to 100 entries each time.
  { "message_id": "UUID", "status": "READ" },
  ...
]
```

