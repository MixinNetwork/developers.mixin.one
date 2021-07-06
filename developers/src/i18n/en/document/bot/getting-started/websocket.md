# Receiving vs. Sending Messages Via WebSocket

### Generating Keystore

Goto [dashboard](/dashboard), click the newly created bot, switch to "Key" tab, click "Generate New Session" to get the Keystore file:

```
{
  "pin": "123456",
  "client_id": "82d20bc7-9a97-4a69-bcd0-4da502374f6c",
  "session_id": "c87ff6c9-c33a-4bc3-98d7-3d449f4adfe8",
  "pin_token": "U+HOgPnysUK......5cWxOpwagrYi2JW9LU=",
  "private_key": "-----BEGIN RSA PRIVATE KEY-----\r\nMIICXAIBAAKBgQCAg2sVCU1eI6mmOx9yt0rIFmm675KBDRKZ/FB\r\nEqcaK0bMLCvDhHpH3vKJzmLItGqzzLptiz3Dnp7BSlLL7ErSrOKGy898e
  ...
 nl4BzFJ7NdtLriQapa/\r\nQA5GFfiJ3IU55UQfx6gGf/0GVKWl+YBpP4g\r\nm/LGKkofAAAPikRhT4ZzC+ks=\r\n-----END RSA PRIVATE KEY-----\r\n"
}
```

**Developers should keep the keystore safe, neither the server nor the browser will store the information.**

### Generating Verification Tokens

In Go language:

```go
/*
* uid: client_id of the Keystore.
* sid: session_id of the Keystore.
* secret: private_key of the Keystore.
*/
func SignAuthenticationToken(uid, sid, secret, method, uri, body string) (string, error) {
  expire := time.Now().UTC().Add(time.Hour * 24 * 30 * 3)
  sum := sha256.Sum256([]byte(method + uri + body))
  token := jwt.NewWithClaims(jwt.SigningMethodRS512, jwt.MapClaims{
    "uid": uid,
    "sid": sid,
    "iat": time.Now().UTC().Unix(),
    "exp": expire.Unix(),
    "jti": uuid.NewV4().String(),
    "sig": hex.EncodeToString(sum[:]),
  })

  block, _ := pem.Decode([]byte(secret))
  key, err := x509.ParsePKCS1PrivateKey(block.Bytes)
  if err != nil {
    return "", err
  }
  return token.SignedString(key)
}
```

### WebSocket Connection

In Go language:

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

### Sending Messages

The sending message feature can be used to implement functions like sending announcements and replying to users. The data format:

```json
{
  "id": "UUID", 
  "action":  "CREATE_MESSAGE",
  "params": {
    "conversation_id": "UUID",
    "category": "PLAIN_TEXT",
    "status": "SENT",
    "message_id": "UUID",
    "data": "Base64 encoded data" ,
  }
}
```

- The bot needs to know the user id of the user to send messages. The user id of the current user can be obtained in three cases: the user sends messages, adds the current bot as a friend, and authorize the bot.

- Before sending a message, you need to make sure that the conversation has been created. You don’t need to create a conversation when users either take the initiative to send messages or add the current bot as a friend. However, when they authorize a bot, you need to call the [Creating Conversations](../api/conversations/create) API to ensure that the conversation has been created.

- You cannot use the user's access_token to create a conversation, you need to use the current bot's token to create one.

### Receiving Messages

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

For more message types, please refer to the document [Message Type](../api/messages/category).

### Message Status

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

For details, please refer to the [Sending Status In Batches](../api/messages/acknowledgements) document.

### SDK

- Go

  [bot-api-go-client](https://github.com/MixinNetwork/bot-api-go-client) is the SDK officially provided by Mixin. In addition to providing wallet-related API encapsulation, it also provides Mixin Messenger message related API encapsulation, see the code [blaze.go](https://github.com/MixinNetwork/bot-api-go-client/blob/master/blaze.go) for a specific implementation.

- PHP

  [mixin-sdk-php](https://github.com/ExinOne/mixin-sdk-php) is provided by the ExinOne team. If you encounter any problems, you can search for 26930 in Mixin Messenger for help.


### Precautions

- When the user adds the current bot as a friend, the system will automatically send a "Hello" message to the bot.

- User messages are only kept on the server for 7 days, and messages that expired will be discarded if the developers do nothing about them.

- The message sent by WebSocket needs to be compressed with gzip, and the message received will be decompressed accordingly.

- Automatic reconnections are highly recommended for Websocket. In the case of 401, the WebSocket connection should be stopped. Note that the time should not exceed 5 minutes, which will also trigger a 401 error.

- The bot’s message quota is 100,000 messages per minute.


### Next Step

- [Design Guide](../design/overview)

  Good interaction and design can better attract and retain users.