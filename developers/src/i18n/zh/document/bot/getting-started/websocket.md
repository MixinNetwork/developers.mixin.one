# 通过 WebSocket 接收和发送消息

### 生成密钥库

进入[开发者后台](/dashboard)，点刚刚新建的机器人切换 Tab 到「密钥」，点「生成新的 Session」获得 Keystore 文件：

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

**请开发者妥善保管好 Keystore 密钥，服务器和浏览器都不会保管该信息。**

### 生成验证令牌

go 语言生成验证令牌：

```go
/*
* uid 对应 Keystore 的 client_id
* sid 对应 Keystore 的 session_id
* secret 对应 Keystore 的 private_key
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

### 连接 WebSocket

go 语言连接 WebSocket：

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

### 发送消息

发消息可以用来实现发公告、回复用户的功能，数据格式：

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

- 机器人发消息需要知道用户的 user id，可以通过接收用户主动发消息、添加当前机器人为好友和授权三种方式获得当前用户的 user id。

- 发消息前需要确保会话已经创建，通过接收用户主动发消息、添加当前机器人为好友这两种情况不用创建会话，通过机器人授权需要调用 [创建会话](../api/conversations/create) API 来确保会话已经创建。

- 不能用用户的 access_token 去创建会话，需要用当前机器人的 token 去创建会话。

### 接收消息

WebSocket 连接后必须先发 LIST_PENDING_MESSAGES 消息来接收挂起的消息：

```json
{
  "id": "UUID",
  "action": "LIST_PENDING_MESSAGES"
}
```

接收的数据格式：

```json
// 返回成功
{
  "id": "UUID",
  "action": "CREATE_MESSAGE",
  "data": {
    "conversation_id": "UUID",
    "user_id": "UUID",                      // 发消息的人
    "message_id": "UUID",
    "category": "PLAIN_TEXT",               // 消息类型
    "status": "SENT",
    "data": "Base64 decoded data",
    "created_at": "2020-11-02T12:47:32.472333Z",
    "updated_at": "2020-11-02T12:47:32.472333Z",
    "source": "LIST_PENDING_MESSAGES",      // "LIST_PENDING_MESSAGES" 或空
    "quote_message_id": "UUID",             // 可选，引用的消息
    "representative_id": "UUID"             // 可选，被代替发言的用户
  },
}

// 返回失败
{
  "id": "0623f846-aa86-4664-bb65-0e5559890a5c",
  "action": "CREATE_MESSAGE",
  "error": {
    "code": 20121,                                  // 错误码
    "desciption": "Authorization code expired."     // 错误说明
  },
}
```

更多消息类型参见文档[消息类型](../api/messages/category)。

### 消息状态

当 WebSocket 连接成功机器人收到消息并处理完以后，需要机器人发送消息状态告诉 Messenger 服务器已经收到了这条消息，否则消息会被反复推送，可以批量发送消息状态已提升性能：

```json
[
  {
    "message_id": "928c5c40-769c-3e97-8387-fb1ae0645311",
    "status":"READ"
  },
  ...
]
```

具体参见[批量发状态](../api/messages/acknowledgements)文档。

### SDK

- Go

  [bot-api-go-client](https://github.com/MixinNetwork/bot-api-go-client) 是 Mixin 官方提供的 SDK，除了提供钱包相关的 API 封装，还提供了 Mixin Messenger 消息相关的 API 封装，具体实现参见代码 [blaze.go](https://github.com/MixinNetwork/bot-api-go-client/blob/master/blaze.go)。

- PHP

  [mixin-sdk-php](https://github.com/ExinOne/mixin-sdk-php) 由 ExinOne 团队提供，使用遇到问题可以通过 Mixin Messenger 搜索 26930 联系提供帮助。

### 注意事项

- 当用户添加当前机器人为好友时系统会自动给机器人发送一句"你好"的消息。

- 用户消息在服务器只保留 7 天，过期开发者不处理消息就会被丢弃。

- WebSocket 发送消息需要经过了 gzip 压缩，收消息 gzip 解压缩。

- WebSocket 建议增加自动重连的逻辑，如遇 401 应该停止 WebSocket 连接，注意系统时间不准超过 5 分钟也会触发 401 错误。

- 机器人发消息限额每分钟 10 万消息。

### 下一步

- [设计指南](../design/overview)

  好的交互和设计能更好的吸引和留住用户。