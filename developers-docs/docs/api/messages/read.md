---
title: Read Messages
sidebar_position: 4
---

To receive a list of messages from Mixin message service, you need to setup a websocket connection.

After receiving the message via WebSocket, you need to tell Mixin message service that it has been delivered, otherwise it will keep pushing the message.

## POST /acknowledgements

```bash
$$XIN:curl$$ "https://api.mixin.one/acknowledgements" -XPOST --data '[{"message_id":"928c5c40-769c-3e97-8387-fb1ae0645311", "status":"READ"}]'
```

Request body data:

```json
[
  // up to 100 entries each time.
  { "message_id": "UUID", "status": "READ" },
  ...
]```

