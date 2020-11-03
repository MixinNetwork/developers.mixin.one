# 新建应用

进入[开发者后台](/dashboard)，点左侧「新应用」按提示创建应用，首页网址、验证网址等参数一般用于 Mixin Messenger 这里用不上随意写就行。

每个开发者账号可免费创建 2 个应用，可付费创建更多。

### 生成密钥

切换到「密钥」点「应用 Session」生成应用的 PIN，Session ID，PinToken，私钥等敏感信息，后面步骤都需要用到，请妥善保管。「应用密钥」和「应用二维码」主要用于 Mixin Messenger，这里不用管。

**注意以上新生成的密钥信息服务器和浏览器都不会保存，请妥善存储。**


### 下一步
保存新建的机器人后即可获得当前机器人的 Mixin ID，可以直接在 Mixin Messenger 首页顶部搜索该 ID 即可访问自己的机器人了。

- [授权获取用户数据](./oauth)

  开发者可以通过授权读取用户个人、资产、转账等信息，据此可为用户提供各种更精细化的信息、金融服务。

- [开发简易客服系统](./oauth)

  如果您开发的是新闻、纯图片等这类不需要读取用户的信息机器人，开发完前端界面即可上线，我们强烈建议开发者支持该功能以回应用户的提问。