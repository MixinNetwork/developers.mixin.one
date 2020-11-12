# Kotlin SDK

### 如何使用

导入[Kotlin SDK](https://github.com/MixinNetwork/bot-api-kotlin-client)

### 配置
```kotlin
val pin = ""
val userId = ""
val sessionId = ""
val privateKey = getRSAPrivateKeyFromString("")
val pinToken = rsaDecrypt(privateKey, sessionId, "")
```

### 实现 PinIterator
对于每个用户都需要记录他使用 PIN 码的次数，每次 PIN 码加密都需要递增，并在加密时传入
```kotlin
class SecretPinIterator : PinIterator {
    private var currentCount = 0L
    override fun getValue(): Long {
        return currentCount
    }

    override fun increment() {
        currentCount++
        // Please save it and assign it a value when you initialize it.
    }
}
```

### 例子
```kotlin
// Create HttpClient
val client = HttpClient(userId, sessionId, privateKey)
 // create user 将用户注册到 Mixin 网络
val sessionKey = generateRSAKeyPair()
val sessionSecret = Base64.encodeBytes(sessionKey.public.encoded)
val userResponse = client.userService.createUsers(
    AccountRequest(
        "User${Random().nextInt(100)}",
        sessionSecret
    )
)
val user = userResponse.data ?: return
// 设置当前user token
client.setUserToken(TokenInfo(user.userId, user.sessionId, sessionKey.private))
// decrypt pin token
val userAesKey: String = rsaDecrypt(sessionKey.private, user.sessionId, user.pinToken)
// 设置初始密码
val pinResponse = client.userService.createPin(
        PinRequest(
            encryptPin(
                SecretPinIterator(),
                userAesKey,
                "131416"
            )!!
        )
    )
println(pinResponse.isSuccess)

// 获取用户资产列表
val assetResponse = client.assetService.assets()
println(assetResponse.data)
```
更多例子例子参见 SDK [examples](https://github.com/MixinNetwork/bot-api-kotlin-client/blob/main/example/src/main/java/one/mixin/example/example.kt)。

---
本 SDK 由 Mixin 团队开发和维护，使用有问题可以通过 Mixin Messenger 搜索 26832、31911 联系我们提供帮助。