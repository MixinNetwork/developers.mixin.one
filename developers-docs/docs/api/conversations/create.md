---
title: Create Conversations
sidebar_position: 2
---

import {
  APIMetaPanel,
  APIRequest,
  APIEndpoint,
  APIParams,
  APIPayload,
} from "@site/src/components/api";

import RespConv from "../../_partials/_resp.conv.md";

## POST /conversations

To create a new group or to have a conversation with a user for the first time, you need to call this API to ensure that the conversation is created first.

<APIEndpoint url="/conversations" />

<APIMetaPanel scope="Authorized" />

<APIPayload>{`{
  "category":        "'GROUP' or 'CONTACT'",
  "conversation_id": "Unique identifier, see below to generate.",
  "name":            "Group name, valid when category is 'GROUP', 512 characters at most",
  "participants":    "Member list '[{ user_id: UUID }]', up to 256 people.",
}
`}</APIPayload>

:::info
The conversations you created are conversations between your bot/dApp and regular Mixin Messenger users.
You cannot use the user's `access_token` to create them. Please use the bot/dApp's token to create conversations
:::

:::info
When the category is `CONTACT`, the value of participants should be an array with length equal to 1, and the value of `user_id` is the other party's user_id.
:::

<APIRequest
  title="Create a Conversation"
  method="POST"
  url="/conversations --data PAYLOAD"
/>

<RespConv />

### Generate Unique Conversation ID

**Single chat: category = "CONTACT"**

The unique identification of the session is generated according to both parties, in Go:

```go
func UniqueConversationId(userId, recipientId string) string {
  minId, maxId := userId, recipientId
  if strings.Compare(userId, recipientId) > 0 {
    maxId, minId = userId, recipientId
  }
  h := md5.New()
  io.WriteString(h, minId)
  io.WriteString(h, maxId)
  sum := h.Sum(nil)
  sum[6] = (sum[6] & 0x0f) | 0x30
  sum[8] = (sum[8] & 0x3f) | 0x80
  return uuid.FromBytesOrNil(sum).String()
}
```

**Group chat: category = "GROUP"**

```go title="golang"
uuid.NewV4().String()
```

```swift title="swift"
UUID().uuidString.lowercased()
```

**Note that UUID strings are unexceptionally converted to lowercase**
