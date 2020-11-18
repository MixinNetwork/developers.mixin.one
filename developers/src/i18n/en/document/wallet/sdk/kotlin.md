# Kotlin SDK

### Import

import [Kotlin SDK](https://github.com/MixinNetwork/bot-api-kotlin-client)

### Config
```kotlin
val pin = ""
val userId = ""
val sessionId = ""
val privateKey = getRSAPrivateKeyFromString("")
val pinToken = rsaDecrypt(privateKey, sessionId, "")
```

### Quick Start
```kotlin
// Create HttpClient
val client = HttpClient(userId, sessionId, privateKey)
 // create user
val sessionKey = generateRSAKeyPair()
val sessionSecret = Base64.encodeBytes(sessionKey.public.encoded)
val userResponse = client.userService.createUsers(
    AccountRequest(
        "User${Random().nextInt(100)}",
        sessionSecret
    )
)
val user = userResponse.data ?: return

client.setUserToken(TokenInfo(user.userId, user.sessionId, sessionKey.private))
// decrypt pin token
val userAesKey: String = rsaDecrypt(sessionKey.private, user.sessionId, user.pinToken)
// set initial PIN
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

// get user assets
val assetResponse = client.assetService.assets()
println(assetResponse.data)
```
Fo more examples, see [examples](examples](https://github.com/MixinNetwork/bot-api-kotlin-client/blob/main/example/src/main/java/one/mixin/example/example.kt)。

---
This SDK is developed by the Mixin team. If you have any questions, you can search for 26832, 31911 through Mixin Messenger and contact us for help. 