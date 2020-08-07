## 机器人开发指南

本教程将介绍如何基于 Mixin Messenger 开发机器人。

### 注册开发者

下载并登录 [Mixin Messenger](https://mixin.one/messenger) ，扫码并登录[开发者后台](/dashboard)。

### 创建机器人

进入开发者后台，点左侧「新应用」按提示创建应用，应用可用于独立的 Dapp 钱包也可用于 Mixin Messenger 机器人，前者为您产品每个用户生成一个钱包，后者主要是通过授权来获取 Mixin Messenger 用户并提供相应的服务。 本教程中创建应用即创建机器人，一些重要的参数说明：

- 分类 - 机器人分类，当机器人在 Mixin Messenger 首页底导栏被用户置顶时会显示分类对应的图标

- 首页网址 - 机器人首页网址

- 验证网址 - 用于 OAuth 授权回调

- 域名白名单 - 用于防止伪造机器人链接，打开 App Card 类型的消息如果指定了 app id 会检查链接的域名是否在白名单中，不在会提醒用户打开的是一个可疑链接

- 沉浸式 - 机器人开启沉浸模式将获得更多展示空间

每个开发者账号可免费创建 2 个机器人，可付费创建更多。

### 机器人密钥

##### 生成新的 Session

切换应用到「密钥」点「生成新的 Session」为机器人生成 PIN、Session ID、PinToken、私钥等敏感信息，内容如下：

```
{
 "pin": "123456",
 "client_id": "b08dd879-7366-4d48-bf16-a2ce6014e213",
 "session_id": "6ef85e29-2dac-48ba-899a-cf64593e6ba8",
 "pin_token": "Qc8O7oI0Uw4NZkE1j5xL3I6Iq1iNraF18Y8yOhxGCsZn3n/KaBY66sLbkoLqTvNzwLxxqUYJ12HRaJgyHMql6ezLW5mgfh0wXxH2m3tSvP9qywX0YzuyCUGOrR1h4b8CyOdwm25Rtjdo8OBr6R4V4kJnE8DvY/mBfkpF0WqNLxY=",
 "private_key": "-----BEGIN RSA PRIVATE KEY-----\r\nMIICEAIBAAKBgQCRybXjMUn9OZnxxtfuHPHcK2OADKQmejSDVr/i/3GaqljcVv4H\r\nyTiil/WcO1kVSyOSi8XarcikO5rR8ceM0paZs0drk7+cxdVMSJCsjoGZ6WrdtW9L\r\n5RROJ/Z6vnhKDzaqH43K4JKAeFtH11LDaWb8kC2CAy8RpZSUdI69bm2E4QIDAQAB\r\nAoGAAnXW/fiM+RsJwAzNBBW09zQ8P6L2+jdBv52tK1WIQ0XwrfdB3jvFGulZmcNe\r\no39bIFPzHReltS/UUwqzhWrgY7z0AVuR9ZZzfC/3MUkoUzghaepJMJNmgR7rMaHw\r\nfV9PY9ZgYLz9aPODRcwmG8yqEw7V5ER+ivxfAX40zc0XpskCQQDyoddxgoCQjRXV\r\n6ukZwWFSOVyakugsGwnkREFl7MxALhslxrPzTjrPTN8Qg6a81df4jlqKZeJ9sUck\r\nsjtDC4LvAkEAmdHyq2yGH70voYwDQmGyPFAMDaSjeGBhGX8slZ+OhUBOrru4or7j\r\niYZ3uWfkBI2A97Dz/0+N2EQV8Vri8hs1LwJAXR1NMCu0KUVrztfDM3YqYkLPTib4\r\n4QxTZH3pVzNkQ3EuS/YQ01v/Z9UJei38DFZI9wOyrZBiNniVY/jek2FUkwJAAOYg\r\nM+5DbmYNpDUMQ9QMVZvmJiJDLk3p41tB6HHxREgW7aB9OL4xo7kcdAHubDRjf48S\r\nLfjKDGyBcFKmpuGP0wJBANP/qrYroIHugYgJ7RumKlbp7ep0ApBLD8R9+HlHOLoh\r\nao6cSE5BlKeEUQzKIGPG1VqZPpaW2gbezpJbfUC+3ao=\r\n-----END RSA PRIVATE KEY-----\r\n"
}
```

- pin - 机器人支付密码

- client_id - 机器人唯一标识，重置 Session 不会变

- session_id - 机器人会话标识，重置 Session 会变

- pin_token - 用于加密 PIN，重置 Session 会变

- private_key - 机器人私钥，重置 Session 会变

##### 生成机器人密钥（Client Secret）

点「生成新的密钥」生成机器人密钥（Client Secret），可防止机器人令牌被滥用，建议定期更换，内容如下：

```
d25a525fef3bda14f1a2fd4de85609639c4b4686d8b45e5976f53d9b99687b09
```

**请妥善保管这些敏感信息，注意服务器和浏览器缓存都不会保存这些敏感信息。**

### OAuth 授权

要访问 Mixin Messenger 用户的个人信息、资产等数据需要开发者向用户申请授权。权限列表：

| 权限                 | 说明                                 |
|:------------------:|:----------------------------------:|
| PROFILE:READ       | 获取用户基本信息，例如 user id、Mixin ID、名称、头像 |
| ASSETS:READ        | 读取用户资产列表，资产余额                      |
| PHONE:READ         | 读取用户手机号                            |
| CONTACTS:READ      | 读取用户联系人列表，禁言列表                     |
| MESSAGES:REPRESENT | 允许机器人代表用户发消息                       |
| SNAPSHOTS:READ     | 访问用户的转账记录，包括充值和提醒                  |

当机器人检测到用户没有授权时应跳转至 `https://mixin-www.zeromesh.net/oauth/authorize?client_id=b7347ca4-186e-4e54-9db6-755a4ab0b5d4&scope=PROFILE:READ+ASSETS:READ&response_type=code&return_to=` 向用户申请授权，参数说明：

- client_id - 机器人唯一标识
- scope - 申请权限
- response_type - 固定写 code 返回授权码
- return_to - 当前页面链接，授权后可跳转回当前界面

授权成功后页面会自动跳转至机器人的验证网址，回调 URL 会附带 code 授权码和 return_to 参数，开发者再根据授权码请求令牌：

```
POST https://mixin-api.zeromesh.net/oauth/token
{
    "client_id": "机器人唯一标识",
    "code": "授权成功回调返回的授权码",
    "client_secret": "机器人密钥"
}

返回数据
{
    "access_token": "用户授权令牌",
    "scope": "用户同意的授权列表，例如'PROFILE:READ ASSETS:READ'"
}
```

建议开发者将 access token 缓存起来，后续通过 access token 调用 API 访问用户数据，可据此判断用户是否已授权。

### 访问用户数据

访问授权用户的个人资料、资产列表等 API 都需要在请求头设置授权信息 ：

```json
GET -H "Authorization: Bearer ACCESS_TOKEN" https://mixin-api.zeromesh.net/me 
{
  "data": {
    "type": "user",
    "user_id": "773e5e77-4107-45c2-b648-8fc722ed77f5",
    "name": "Team Mixin",
    "identity_number": "7000"
  }
}
```

常用 API ：

* `GET /me` 获取授权用户的个人基本信息，需要 `PROFILE:READ` 权限；获取用户的手机号需要 `PHONE:READ` 权限，参考[文档](https://developers.mixin.one/api/c-users/read-profile/)

* `GET /assets` 获取授权用户的资产列表，需要 `ASSETS:READ` 权限，参考[文档](https://developers.mixin.one/api/f-assets/read-assets/)

* `GET /assets/:id` 获取授权用户某个资产信息，需要 `ASSETS:READ` 权限，参考[文档](https://developers.mixin.one/api/f-assets/read-asset/)

* `GET /friends` 获取授权用户的好友列表，需要 `CONTACTS:READ` 权限，参考[文档](https://developers.mixin.one/api/c-users/friends/)

* `GET /blocking_users` 获取授权用户的屏蔽列表，需要 `CONTACTS:READ` 权限

* `GET /snapshots` 获取授权用户某个资产的所有转账信息，需要 `SNAPSHOTS:READ` 权限

* `GET /snapshots/:id` 获取授权用户某条转账的详情，需要 `SNAPSHOTS:READ` 权限

* `GET /conversations/:id` 获取授权用户某个会话的信息，包括单聊和群聊，参考[文档](https://developers.mixin.one/api/h-conversations/read-conversation/)

如果访问 API 返回 401 ，需要清理缓存的 access token 然后重新申请授权。

### Schema 唤起

Mixin Messenger 支持通过 schema 唤起特定界面：

- 支付页 `mixin://pay?recipient=&asset=&amount=&memo=&trace=`
  
  memo 和 trace 是可选参数，recipient 是收款人的 user id，trace 参数可以有效防止重复支付。可轮询 `GET https://mixin-api.zeromesh.net/transfers/trace/:traceid` 是否有返回值来判断支付是否已完成，或者轮询 `POST /payments` 是否返回 paid 状态来判断支付是否已完成，参见[文档](https://developers.mixin.one/api/g-transfer/verify-payment)。

- 用户弹窗 `mixin://users/:userid`

- 转账详情界面 `mixin://snapshots?trace=:traceid` 或者 `mixin://snapshots/:snapshotid`

- 机器人弹窗 `mixin://apps/:appid?action=open`
  action 为可选参数，不传打开机器人弹窗，传 `action=open` 打开机器人首页

- 新增提现地址 `mixin://address?asset=&label=&destination=&tag=`
  
  tag 为可选参数，其他参数必填

- 删除提现地址 `mixin://address?asset=&action=delete&address=`
  
  address 参数为 address id

- 提现 `mixin://withdrawal?address=&asset=&amount=&memo=&trace=`
  
  memo 为可选参数，其他参数必填

- 分享文字 `mixin://send?text=`
  
  可以分享文字内容到 Mixin Messenger 里，客户端会唤起转发的界面

### 界面适配

- 主题色
  
  当用户访问机器人的页面时，内置的浏览器会尝试从 HTML 提取 theme-color meta 标签，状态栏和标题栏会自动适配主题色：
  
  ```html
  <meta name="theme-color" content="#673ab8">
  ```

- 沉浸模式
  
  开启沉浸模式能让开发者获得除状态栏以外所有的屏幕显示区域，能方便的开发出具有沉浸交互体验的机器人。沉浸模式默认关闭，需开发者后台手动开启。注意右上角漂浮按钮菜单是固定的，界面设计和交互需避开此固定区域。
  
  ![](https://mixin-assets.zeromesh.net/mixin/attachments/1594215155-8caf255df2ba3c369f62a854bc35701b56338f573baca33d50021306d6411762)

### JS 交互

Mixin Messenger 客户端有提供一些 JS 方法供机器人网页调用：

- getContext()
  
  返回客户端用户设置和当前所处的会话
  
  ```json
  {                 
      "app_version": "0.24.0",      // Mixin Messenger 版本
      "immersive": true,            // 是否开启沉浸模式
      "appearance": "dark",         // 暗色主题/浅色主题
      "currency": "USD",            // 货币类型
      "locale": "zh-CN",            // 语言
      "platform": "iOS",            // 客户端类型，Android、iOS、Desktop
      "conversation_id": ""         // 返回当前所处会话的 ID，没有返回空 
  }
  ```

- reloadTheme()
  
  重新读取机器人的 theme-color 信息并应用，适合机器人动态换肤功能。

具体调用方法参考 [Mixin JS SDK](https://github.com/MixinNetwork/bot-api-js-client/blob/master/src/mixin.js) 代码。

### 发消息

开发者可通过机器人给用户发一些重要的通知，也可以发说明文字或操作按钮帮助用户更好的熟悉机器人提供的服务。Mixin Messenger 支持文字、图片、视频、音频、贴纸等多种消息类型，参考[文档](https://developers.mixin.one/api/n-websocket/messages/)，但机器人目前只能发送 `PLAIN_` 开头的消息类型。

##### 通过 WebSocket 发消息

- 建立连接
  
   通过 `wss://mixin-blaze.zeromesh.net` 与 Mixin Messenger 服务器建立 WebSocket 连接，需要在 Header 里设置 Authorization 信息，参见[文档](https://developers.mixin.one/api/n-websocket/authentication/)。

- 发送消息
  
  以发送文字为例：
  
  ```json
     {
       "id": "UUID", 
       "action":  "CREATE_MESSAGE",
       "params": {
         "conversation_id": "UUID",
         "category": "PLAIN_TEXT",
         "status": "SENT",
         "message_id": "UUID",
         "data": "Base64 encoded data"
       }
     }
  ```
  
  category 为消息类型，data 字段消息内容需要进行 base64 加密，参考[文档](https://developers.mixin.one/api/n-websocket/messages/)

- 批量发消息
  
  ```JSON
    {
      "id": "UUID",
      "action": "CREATE_PLAIN_MESSAGES",
      "params": {
        "messages": [
          {
            "conversation_id": "UUID",
            "recipient_id": "UUID",
            "message_id": "UUID",
            "representative_id": "UUID",
            "quote_message_id": "UUID",
            "category": "PLAIN_TEXT",
            "data": "Base64 encoded data."
          },
          ...
        ]
      }
    }
  ```
  
  representative_id 机器人代表谁发消息，需要 `MESSAGES:REPRESENT` 权限，可用于聊天机器人。通过 WebSocket 批量发消息每次最多 100 条，消息 Body 不能超过 128Kb，建议限制单条消息大小。

##### 通过 HTTP 发消息

调用 `POST /messages` 可通过 HTTP 批量发消息，每次最多 100 条，消息 Body 不能超过 1024Kb，建议限制单条消息大小，正常聊天内容一般每次发送 50 条信息没问题。

```json
[{
    "conversation_id":"UUID", 
    "recipient_id":"UUID", 
    "message_id":"UUID", 
    "category":"PLAIN_TEXT", 
    "data":"base64 of data", 
    "representative_id": "UUID", 
    "quote_message_id":"UUID"
}]
```

##### 特殊消息类型

LIVE、POST、APP_BUTTON_GROUP 和 APP_CARD 这几种消息类型只能通过机器人发送，可灵活实现各种交互逻辑非常强大：

![](https://mixin-assets.zeromesh.net/mixin/attachments/1594216189-6246be069a55c720efa9f855c6df64906c5cfd91f5038d0603e2415403b2fa31)

##### 指令交互

支持指令交互很酷，但让用户输入指令门槛有点高，将 APP_BUTTON 的 action 按格式 `input:SOMETHING` 设置就能获得点击按钮自动发消息的能力，非常实用。例如当前的 App Button 的 action 是 `input:subscribe` ，当用户点击这个按钮时客户端会自动发送一条 `subscribe` 的消息给机器人，开发者可以任意指定 input 后面的文字。

### 收消息

除了给用户发消息，接受并处理用户的留言也很重要，通过 WebSocket 收消息：

- 建立连接
  
  通过 `wss://mixin-blaze.zeromesh.net` 与 Mixin Messenger 服务器建立 WebSocket 连接，需要在 Header 里设置 Authorization 信息，参见[文档](https://developers.mixin.one/api/n-websocket/authentication/)。建议开后台常驻服务保持 WebSocket 连接并支持自动重连。

- 接受消息
  
  当 WebSocket 连接上后需要先发送 `LIST_PENDING_MESSAGES` 消息给服务端，服务器会严格按时间先推旧消息再实时推新消息：
  
  ```json
    {
      "id": "UUID", 
      "action":  "LIST_PENDING_MESSAGES"
    }
  ```
  
  返回消息格式：
  
  ```json
  // 返回正确数据
  {
    "id": "UUID",
    "action":  "CREATE_MESSAGE",
    "data": {
      "conversation_id": "UUID",
      "user_id": "UUID",
      "message_id": "UUID",
      "category": "PLAIN_TEXT",
      "data": "Base64 encoded data",
      "status": "SENT",
      "created_at": "2018-05-29T09:31:04.202186212Z",
      "updated_at": "2018-05-29T09:31:04.202186212Z",
      "source": "LIST_PENDING_MESSAGES",
      "quote_message_id": "",
      "representative_id": "",
      "session_id": ""
    }
  }
  // 返回错误数据
  {
    "id": "UUID",
    "action":  "CREATE_MESSAGE",
    "error": {
      "status": 202,
      "code": 20121,
      "status": "SENT",
      "description": "Authorization code expired."
    }
  }
  ```

- 发送已读
  
  注意收到消息后一定要发送 `ACKNOWLEDGE_MESSAGE_RECEIPT` 告诉服务器你已经收到了，否则服务器会一直重复推送该消息：
  
  ```json
    {
      "id": "UUID",
      "action": "ACKNOWLEDGE_MESSAGE_RECEIPT",
      "params": {
        "message_id": "UUID",
        "status": "DELIVERED"
      }
    }
  ```
  
  批量发送已读参见[文档](https://developers.mixin.one/api/l-messages/create-acknowledgements/)

注意事项：

- WebSocket 也需要处理 401 的情况

- WebSocket 发送消息需要经过了 gzip 压缩，收消息 gzip 解压缩

- WebSocket 建议增加自动重连的逻辑

- 机器人发消息的限额每分钟 10 万

### 资源

* JS SDK（Mixin 团队）： https://github.com/MixinNetwork/bot-api-js-client
* 其他 SDK 、教程和开源项目汇总： https://github.com/awesome-mixin-network/mixin_network_sdk_resource

### 案例

- [DonateCafe](http://donate.cafe/) - 基于 Mixin Messenger 的打赏工具，机器人 ID 7000103066，源码： https://github.com/MixinNetwork/donate.cafe 。
- Hacker News 机器人 7000100124 ，每天推送 news.ycombinator.com 上的文章，源码： https://github.com/crossle/hacker-news-mixin-bot 。

---

想加入 Mixin 开发者群或者有其他问题请联系 Mixin ID 762532 找长老。