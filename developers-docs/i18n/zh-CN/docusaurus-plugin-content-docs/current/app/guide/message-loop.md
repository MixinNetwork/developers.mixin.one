---
title: 处理消息循环
---

## 处理 WebSocket

Mixin 的消息服务使用 WebSocket 分发消息。下面的 Golang 代码片段展示了如何处理 WebSocket 连接：

```go
func ConnectMixinBlaze(uid, sid, key string) (*websocket.Conn, error) {
  token, err := SignAuthenticationToken(uid, sid, key, "GET", "/", "")
  if err != nil {
    return nil, err
  }
  header := make(http.Header)
  header.Add("Authorization", "Bearer "+token)
  u := url.URL{Scheme: "wss", Host: "blaze.mixin.one", Path: "/"}
  dialer := &websocket.Dialer{
    Subprotocols: []string{"Mixin-Blaze-1"},
  }
  conn, _, err := dialer.Dial(u.String(), header)
  if err != nil {
    return nil, err
  }
  return conn, nil
}
```

当然，你也可以使用 SDK 来简化这一流程。

## 接收消息

WebSocket 连接成功后，需要先发送 `LIST_PENDING_MESSAGES` 消息才能接收待处理消息：

```json
{
  "id": "UUID",
  "action": "LIST_PENDING_MESSAGES"
}
```

数据格式：

```json
// 成功时：
{
  "id": "UUID",
  "action": "CREATE_MESSAGE",
  "data": {
    "conversation_id": "UUID",
    "user_id": "UUID",                      // 发送方。
    "message_id": "UUID",
    "category": "PLAIN_TEXT",               // 消息类型。
    "status": "SENT",
    "data": "Base64 decoded data",
    "created_at": "2020-11-02T12:47:32.472333Z",
    "updated_at": "2020-11-02T12:47:32.472333Z",
    "source": "LIST_PENDING_MESSAGES",      // "LIST_PENDING_MESSAGES" 或空字符串。
    "quote_message_id": "UUID",             // 可选，被引用的消息。
    "representative_id": "UUID"             // 可选，被代理的用户。
  },
}

// 失败时：
{
  "id": "0623f846-aa86-4664-bb65-0e5559890a5c",
  "action": "CREATE_MESSAGE",
  "error": {
    "code": 20121,                                  // 错误码。
    "desciption": "Authorization code expired."    // 错误描述。
  },
}
```

更多消息类型请参考文档 [消息类型](../../api/messages/category)。

## 消息状态

当 WebSocket 连接成功且机器人已经收到并处理消息后，需要向 Messenger 服务端发送消息状态，以便服务器知道消息已被接收，否则消息会被重复推送。消息状态可以批量发送以提高性能：

```json
[
  {
    "message_id": "928c5c40-769c-3e97-8387-fb1ae0645311",
    "status": "READ"
  },
  ...
]
```

更多详情请参阅 [批量发送状态](../../api/messages/send) 文档。
