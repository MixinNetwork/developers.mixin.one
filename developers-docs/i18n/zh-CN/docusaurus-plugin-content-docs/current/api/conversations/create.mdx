---
title: 创建会话
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

新建群组或机器人第一次与用户对话之前，需要调用该 API，确保先创建会话。

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
您创建的会话是您的 机器人或者 dApp 与普通 Mixin Messenger 用户之间的会话。
您不能使用用户的 `access_token` 来创建它们。 请使用机器人或者 dApp 的 Access Token 创建会话
:::

:::info
当 category 为`CONTACT`时，参与者的值应该是一个长度等于 1 的数组，`user_id` 的值为对方的 user_id。
:::

<APIRequest
  title="Create a Conversation"
  method="POST"
  url="/conversations --data PAYLOAD"
/>

<RespConv />

### 生成唯一会话 ID

**单聊: category = "CONTACT"**

会话的唯一标识是根据双方生成的，在 Go 中这样实现：

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

**群聊: category = "GROUP"**

```go title="golang"
uuid.NewV4().String()
```

```swift title="swift"
UUID().uuidString.lowercased()
```

**请注意，UUID 字符串会无例外地转换为小写**
