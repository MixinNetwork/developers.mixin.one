---
title: Send Messages
sidebar_position: 3
---

## POST /messages

:::info
A maximum of 100 messages can be sent in batch each time, and the message body cannot exceed 128Kb. It is recommended to limit the size of a single message, for example:
:::

```bash
$$XIN:curl$$ "https://api.mixin.one/messages" -X POST
```

Request body data is a message array:

```json
[
  $$XIN:message$$
]
```

It returns empty JSON on success.
