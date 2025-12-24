---
title: Transfer Notification
sidebar_position: 7
---

import {
  APIMetaPanel,
  APIEndpoint,
} from "@site/src/components/api";

## POST /safe/snapshots/notifications

When an on-chain transfer output is relevant to your app/user, you can sent user a transfer notification by this api.

<APIEndpoint url="/safe/snapshots/notifications" />

### Request Body

```json
{
  "transaction_hash": "0xabc123...def",
  "output_index": 0,
  "receiver_id": "UUID"
}
```

- `transaction_hash` string: transaction hash
- `output_index` integer: transaction output index
- `receiver_id` string: recipient user ID

### Response

On success, return a message view object `MessageWithSessionView` (JSON). HTTP status code 200 is recommended.

```json
{
  "type": "message",
  "representative_id": "UUID",
  "quote_message_id": "",
  "conversation_id": "UUID",
  "user_id": "UUID",
  "session_id": "UUID",
  "message_id": "UUID",
  "category": "PLAIN_TEXT",
  "data": "Transfer notification content",
  "data_base64": "",
  "status": "SENT",
  "source": "API",
  "silent": false,
  "expire_in": 0,
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```