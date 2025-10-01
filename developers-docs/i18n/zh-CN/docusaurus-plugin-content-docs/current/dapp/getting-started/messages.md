---
title: 发送与接收消息
sidebar_position: 6
---

## 发送消息

发送消息功能可以用于实现发送公告、回复用户等场景。在发送之前，需要先构造消息结构。

Mixin Messenger 支持[多种消息类型](/docs/api/messages/category)。一条纯文本消息的结构如下：

```json
{
  "id":                 "一个 UUID",
  "action":             "CREATE_MESSAGE",
  "params": {
    "conversation_id":  "一个 UUID",
    "category":         "PLAIN_TEXT",
    "status":           "SENT",
    "message_id":       "一个 UUID",
    "data":             "Base64 编码的数据",
  }
}
```

:::tip
应用需要知道用户的 `user_id` 才能发送消息。

可以通过以下三种方式获取 `user_id`：用户向应用发送消息、将机器人添加为好友、授权应用。
:::

下面是使用官方 Golang SDK 发送纯文本消息的示例：

```go
// @TODO an example.
```

:::info
在发送消息之前，需要确保会话已经创建。当用户主动发送消息或添加当前机器人为好友时，无需手动创建会话。否则需要调用 [创建会话](/docs/api/conversations/create) API 来确保会话已存在。
:::

## 接收消息

```go
// @TODO an example.
```

:::info

1. 当用户添加当前机器人为好友时，系统会自动向机器人发送一条 “Hello” 消息。
2. 用户消息只在服务器上保留 7 天，如果开发者未处理，过期消息将被丢弃。
3. 通过 WebSocket 发送的消息需要使用 gzip 压缩，接收到的消息会相应解压。
4. 强烈建议对 WebSocket 进行自动重连；若出现 401，需要终止 WebSocket 连接。注意时间不应超过 5 分钟，否则同样会触发 401 错误。
5. 机器人的消息配额为每分钟 100,000 条。
:::
