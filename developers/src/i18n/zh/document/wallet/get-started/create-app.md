# 新建 Mixin 钱包

进入[开发者后台](/dashboard)，点左侧「新应用」按提示创建应用，首页网址、验证网址等参数一般用于 Mixin Messenger 这里用不上随意写就行。

每个开发者账号可免费创建 2 个应用，可付费创建更多。

### 生成密钥

切换到「密钥」点「应用 Session」生成应用的 PIN，Session ID，PinToken，私钥等敏感信息，后面步骤都需要用到，请妥善保管。

```json
{
 "pin": "123456",
 "client_id": "b08dd779-7366-4d48-bf16-a2ce6014e213",
 "session_id": "6ef85e29-2dac-48ba-899a-cf64593e6ba8",
 "pin_token": "Qc8O7oI0Uw4NZkE1...aF18Y8yOhyGCsZn3n/KaBY66sLbkoLqTvNzwLxxqUYJ12HRaJgyHMql6ezLW5mgfh0wXxH2m3tSvP9qywX0YzuyCUGOrR1h4b8CyOdwm25Rtjdo8OBr6R4V4kJnE8DvY/mBfkpF0WqNLxY=",
 "private_key": "-----BEGIN RSA PRIVATE KEY-----\r\nMIICXAIBAAKBgQCRybXjMUn9OZnxxtfuHPHcK2OADKQmejSDVr/i/3GaqljcVv4H\r\nyTiil/WcO1kVSyOSi8XarcikO5rR8ceM0paZs0drk7+cxdVMSJCsjoGZ6WrdtW9L\r\n5RROJ/Z6vnhKDzaqH43K4JKAeFtH11LDaWb8kC2CAy8RpZSUdI69bm2E4QIDAQAB\r\nAoGAAnXW/fiM+RsJwAzNBBW09zQ8P6L2
 ...
 +5DbmYNpDUMQ9QMVZvmJiJDLk3p41tB6HHxREgW7aB9OL4xo7kcdAHubDRjf48S\r\nLfjKDGyBcFKmpuGP0wJBANP/qrYroIHugYgJ7RumKlbp7ep0ApBLD8R9+HlHOLoh\r\nao6cSE5BlKeEUQzKIGPG1VqZPpaW2gbezpJbfUC+3ao=\r\n-----END RSA PRIVATE KEY-----\r\n"
}
```

「应用密钥」和「应用二维码」主要用于 Mixin Messenger，这里不用管。**注意以上新生成的密钥信息服务器和浏览器都不会保存，请妥善存储。**

### 下一步

- [生成钱包用户](./create-network-user)

  为平台每一个用户对应生成一个钱包账号。
  