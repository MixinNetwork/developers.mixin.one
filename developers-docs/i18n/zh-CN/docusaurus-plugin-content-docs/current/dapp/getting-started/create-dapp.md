---
title: 创建一个应用程序
sidebar_position: 1
---

## 新建应用程序

下载[Mixin Messenger](https://mixin.one/messenger)，打开[Developers Dashboard](https://developers.mixin.one/dashboard)，扫描二维码登录。

点击左侧的“新建应用程序”按钮，按照提示创建应用程序，请上传应用程序图标并填写表单。下面是一些重要参数的说明。

- **类别**：
  请为机器人选择一个类别，当机器人放置在Mixin Messenger首​​页底部导航栏时，将显示该类别的相应图标。
- **主页网址**：
  链接到机器人的主页。
- **OAuth 网址**
  用于 OAuth 授权的回调。
- **资源模式**
  这是一个用于防止虚假机器人链接的白名单。打开卡片和按钮类型的消息时，会检查链接的域名是否在白名单中。对于“APP_CARD”或“APP_BUTTON_GROUP”消息，您需要确保“action”在白名单中。
- **沉浸模式**
  开启沉浸模式以获得更多显示空间，参考[沉浸模式](../design/immersive-mode)。

:::tip
每个开发者帐户可以免费创建 2 个应用程序，如果您需要更多额度，将需要额外付费。
:::

## 创建密钥和 Keystore

切换到“Secret”并点击“Generate a new secret”按钮以生成一个新的应用程序密钥，它是一个 64 位字符串。

点击“Ed25519 session”按钮生成一个新的 keystore ，里面包含应用的PIN、Session ID、PinToken、私钥等敏感信息，大概是这样的形式：

```json
{
  "pin":        "123456",
  "client_id":  "96c1460b-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "session_id": "cc2ae4e2-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "pin_token":  "YcUaTtLL3PnW7NrBNh...XhOiOIHrhAvAYgXZaNag34",
  "private_key":"tbcUDgb4glYbyAkx-nOaqc4SpsDd1TFQMQq...2TxNfQiK9PULgod41QVXwVszVOWKi5TRm2gUK0sqch5A"
}
```

请将 keystore 文件和应用程序密钥保存在安全的地方。

:::caution
注意以上生成的密钥信息不会被服务器和浏览器保存，请您自己妥善保存。
:::

:::tip
建议使用 Ed25519 私钥而不是旧的 RSA Keystore。 目前 Mixin 鼓励开发人员从 RSA 私钥切换到 Ed25519 私钥。 有关更多信息，请参阅此[文档](/api/session-secret-migration)。
:::

在下一步中，您将了解 OAuth 过程，并获取访问令牌。