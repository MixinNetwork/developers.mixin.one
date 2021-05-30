# 新建 Mixin 钱包

下载 [Mixin Messenger](https://mixin-www.zeromesh.net/messenger)，打开[开发者后台](/dashboard)扫码登录，点左侧「新应用」按提示创建应用，首页网址、验证网址等参数一般用于 Mixin Messenger 这里用不上随意写就行。

每个开发者账号可免费创建 2 个应用，可付费创建更多。

### 生成密钥

切换到「密钥」在应用 Session 里点「Ed25519 私钥」生成应用的 PIN，Session ID，PinToken，私钥等敏感信息：

```json
{
  "pin": "123456",
  "client_id": "96c1460b-c7c4-480a-a342-acaa73995a37",
  "session_id": "cc2ae4e2-5f74-4c3e-9128-23892b46851a",
  "pin_token": "YcUaTtLL3PnW7NrBNh...XhOiOIHrhAvAYgXZaNag34",
  "private_key": "tbcUDgb4glYbyAkx-nOaqc4SpsDd1TFQMQq...2TxNfQiK9PULgod41QVXwVszVOWKi5TRm2gUK0sqch5A"
}
```

- 应用 Session 密钥生成推荐使用 Ed25519 私钥，不推荐旧的 RSA 私钥，目前正在推进开发者从 RSA 私钥转向 Ed25519 私钥，参见[文档](../api/session-secret)。
- 「应用密钥」和「应用二维码」主要用于 Mixin Messenger，这里不用管。

**注意以上新生成的密钥信息服务器和浏览器都不会保存，请妥善存储。**

### 下一步

- [生成钱包用户](./create-network-user)

  为平台每一个用户对应生成一个钱包账号。
  