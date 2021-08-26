---
title: Send and Receive Messages
sidebar_position: 6
---

## Sending Messages

The sending message feature can be used to implement functions like sending announcements and replying to users. Before sending a message, you need to create a message structure.

Mixin Messenger supports [various message types](/api/messages/category). A plain-text message's structure should look like this:

```json
{
  "id":                 "an UUID",
  "action":             "CREATE_MESSAGE",
  "params": {
    "conversation_id":  "an UUID",
    "category":         "PLAIN_TEXT",
    "status":           "SENT",
    "message_id":       "an UUID",
    "data":             "Base64 encoded data" ,
  }
}
```

:::tip
The application needs to know the `user_id` of the user to send messages.

The `user_id` can be obtained in three ways: the user sends messages to the application, adds the bot as a friend, and authorize the application.
:::

Here is an example of sending a plain-text message by using the official Golang SDK:

```go
// @TODO an example.
```

:::info
Before sending a message, you need to make sure that the conversation has been created. You don’t need to create a conversation when users either take the initiative to send messages or add the current bot as a friend. However, if not, you need to call the [Creating Conversations](/api/conversations/create) API to ensure that the conversation has been created.
:::

## Receiving Messages

```go
// @TODO an example.
```


:::info
1. When the user adds the current bot as a friend, the system will automatically send a "Hello" message to the bot.
2. User messages are only kept on the server for 7 days, and messages that expired will be discarded if the developers do nothing about them.
3. The message sent by Websocket needs to be compressed with gzip, and the message received will be decompressed accordingly.
4. Automatic reconnections are highly recommended for Websocket. In the case of 401, the WebSocket connection should be stopped. Note that the time should not exceed 5 minutes, which will also trigger a 401 error.
5. The bot’s message quota is 100,000 messages per minute.
:::
