# Kotlin SDK
### 如何使用

导入[Kotlin SDK](https://github.com/MixinNetwork/bot-api-kotlin-client)

Add the dependency
可在 [Mixin 开发者后台](https://developers.mixin.one/dashboard)获取
```
dependencies {
    implementation 'com.github.MixinNetwork:bot-api-kotlin-client:v0.1.0'
}
```

### 配置

```
object Config {
    const val pin = ""
    const val userId = ""
    const val sessionId = ""
    const val privateKey = ""
    const val pinTokenPem = ""
}
```

### 例子
```kotlin
    val key = getEdDSAPrivateKeyFromString(Config.privateKey)
    val pinToken = decryASEKey(Config.pinTokenPem, key) ?: return@runBlocking
    val client = HttpClient.Builder().configEdDSA(Config.userId, Config.sessionId, key).build()

    val sessionKey = generateEd25519KeyPair()
    val publicKey = sessionKey.public as EdDSAPublicKey
    val sessionSecret = publicKey.abyte.base64Encode()

    // create user 将用户注册到 Mixin 网络
    val user = client.userService.createUsers(
        AccountRequest(
            Random().nextInt(10).toString() + "User",
            sessionSecret
        )
    ).data
    user ?: return@runBlocking
    // user签名授权令牌
    client.setUserToken(
        SessionToken.EdDSA(
            user.userId, user.sessionId,
            (sessionKey.private as EdDSAPrivateKey).seed.base64Encode()
        )
    )

    // decrypt pin token
    val userAesKey: String
    val userPrivateKey = sessionKey.private as EdDSAPrivateKey
    userAesKey = calculateAgreement(user.pinToken.base64Decode(), userPrivateKey).base64Encode()

    // 为user创建pin
    val pinResponse = client.userService.createPin(
        PinRequest(requireNotNull(encryptPin(userAesKey, DEFAULT_PIN)))
    )
    if (pinResponse.isSuccess) {
        println("Create pin success ${pinResponse.data?.userId}")
    } else {
        println("Create pin fail")
    }

    // 获取用户资产列表
    val assetResponse  =  client.assetService.assets()
    if (assetResponse.isSuccess) {
        println("Get assets ${pinResponse.data}")
    } else {
        println("Get assets fail")
    }
```
更多例子例子参见 SDK [Sample](https://github.com/MixinNetwork/bot-api-kotlin-client/blob/main/samples/src/main/java/jvmMain/kotlin/Sample.kt)。

---
本 SDK 由 Mixin 团队开发和维护，使用有问题可以通过 Mixin Messenger 搜索 26832、31911 联系我们提供帮助。