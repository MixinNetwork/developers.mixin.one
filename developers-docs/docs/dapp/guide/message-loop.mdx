---
title: Handle Message Loop
---

## Handle Websocket

Mixin's message service uses websocket to distribute messages. The following Golang code snippet shows how to handle the websocket connection:

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

Of course, you can use the SDK to simplify the process.

## Receiving Messages

After the WebSocket is connected, the LIST_PENDING_MESSAGES message must be sent first to receive the pending message:

```json
{
  "id": "UUID",
  "action": "LIST_PENDING_MESSAGES"
}
```

The data format:

```json
// On success:
{
  "id": "UUID",
  "action": "CREATE_MESSAGE",
  "data": {
    "conversation_id": "UUID",
    "user_id": "UUID",                      // Sender.
    "message_id": "UUID",
    "category": "PLAIN_TEXT",               // Message type.
    "status": "SENT",
    "data": "Base64 decoded data",
    "created_at": "2020-11-02T12:47:32.472333Z",
    "updated_at": "2020-11-02T12:47:32.472333Z",
    "source": "LIST_PENDING_MESSAGES",      // "LIST_PENDING_MESSAGES" or empty.
    "quote_message_id": "UUID",             // Optional, quoted message.
    "representative_id": "UUID"             // Optional, the user being replaced.
  },
}

// On failure.
{
  "id": "0623f846-aa86-4664-bb65-0e5559890a5c",
  "action": "CREATE_MESSAGE",
  "error": {
    "code": 20121,                                  // Error code.
    "desciption": "Authorization code expired."
  },
}
```

For more message types, please refer to the document [Message Type](../../api/messages/category).

## Message Status

When the WebSocket connection is successful and the bot has received the message and processed it, the bot needs to send the message status to the Messenger server so that the server knows that the message has been received, otherwise the message will be pushed repeatedly. Message status can be sent in batches to improve performance:

```json
[
  {
    "message_id": "928c5c40-769c-3e97-8387-fb1ae0645311",
    "status":"READ"
  },
  ...
]
```

For details, please refer to the [Sending Status In Batches](../../api/messages/send) document.