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

import RespConv from "@site/docs/_partials/_resp.conv.md";

## POST /conversations

首次与用户对话或创建群组时，需要先调用此接口创建会话。

<APIEndpoint url="/conversations" />

<APIMetaPanel scope="Authorized" />

<APIPayload>{`{
  "category":        "类型，可为 'GROUP' 或 'CONTACT'",
  "conversation_id": "会话唯一标识，生成方式见下文",
  "name":            "群组名称，仅在 category 为 'GROUP' 时有效，最多 512 字符",
  "participants":    "成员列表 '[{ user_id: UUID }]'，最多 256 人",
}
`}</APIPayload>

:::info
您创建的会话是机器人/dApp 与普通 Mixin Messenger 用户之间的会话，不能使用用户自身的 `access_token` 来创建，请使用机器人/dApp 的 token。
:::

:::info
当 category 为 `CONTACT` 时，participants 必须是长度为 1 的数组，`user_id` 填写对方的用户 ID。
:::

<APIRequest
  title="Create a Conversation"
  method="POST"
  url="/conversations --data PAYLOAD"
/>

<RespConv />

### 生成唯一的会话 ID

**单聊：category = "CONTACT"**

会话 ID 由双方用户 ID 组合生成，Golang 示例：

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

**群聊：category = "GROUP"**

```go title="golang"
uuid.NewV4().String()
```

```swift title="swift"
UUID().uuidString.lowercased()
```

**注意：生成的 UUID 字符串应统一转换为小写。**
