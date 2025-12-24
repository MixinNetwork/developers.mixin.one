---
title: 转账通知回调
sidebar_position: 7
---

import {
  APIMetaPanel,
  APIEndpoint,
} from "@site/src/components/api";

## POST /safe/snapshots/notifications

当有链上转账产出与你的应用相关时，你可以通过这个接口来给用户发送转帐的消息通知。

<APIEndpoint url="/safe/snapshots/notifications" />

### 请求体

```json
{
  "transaction_hash": "0xabc123...def",
  "output_index": 0,
  "receiver_id": "UUID"
}
```

- `transaction_hash` string：交易哈希
- `output_index` integer：交易输出序号
- `receiver_id` string：接收用户 uuid

### 响应

请求成功时返回消息视图对象 `MessageWithSessionView`（JSON）。HTTP 状态码建议使用 200。

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
  "data": "转账通知内容",
  "data_base64": "",
  "status": "SENT",
  "source": "API",
  "silent": false,
  "expire_in": 0,
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```