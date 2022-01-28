---
title: チャットの作成
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

新しいグループを作成したり、初めてユーザーとチャットをする場合は、まずこのAPIを呼び出して、チャットを作成する必要があります。
<APIEndpoint url="/conversations" />

<APIMetaPanel scope="Authorized" />

<APIPayload>{`{
  "category":        "'GROUP' or 'CONTACT'",
  "conversation_id": "Unique identifier, see below to generate.",
  "name":            "Group name, valid when category is 'GROUP', 512 characters at most",
  "participants":    "Member list '[{ user_id: UUID }]', up to 256 people.",
}
`}</APIPayload>

:::注意
作成されたチャットは、あなたのロボ/dAppと通常のMixinメッセンジャーユーザーとのチャットです。
ユーザーの `access_token` を使って作成することはできません。ロボ/dAppのトークンを使用してチャットを作成してください。
:::

:::注意
`category`が`CONTACT`の場合、`participants`の値は1、`user_id`の値は相手のユーザーIDである必要がある。
:::

<APIRequest
  title="Create a Conversation"
  method="POST"
  url="/conversations --data PAYLOAD"
/>

<RespConv />

### 固有のチャットグループIDの生成

**個人チャットの場合: category = "CONTACT"**

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

**グループチャットの場合: category = "GROUP"**

```go title="golang"
uuid.NewV4().String()
```

```swift title="swift"
UUID().uuidString.lowercased()
```

**UUID文字列は例外なく小文字に変換されることに注意してください**
