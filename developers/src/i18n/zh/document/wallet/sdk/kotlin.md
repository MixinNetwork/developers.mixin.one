# Kotlin SDK

##如何使用

导入[Kotlin SDK](https://github.com/MixinNetwork/bot-api-kotlin-client)

### 配置
```kotlin
val pin = ""
val userId = ""
val sessionId = ""
val privateKey = getRSAPrivateKeyFromString("")
val pinToken = rsaDecrypt(privateKey, sessionId, "")
}
```

### 实现 PinIterator
对于每个User都需要记录他使用PIN码的次数，每次PIN码加密都需要递增，并在加密时传入
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
val response = client.userService.getMe()
println(response.data?.avatarUrl)

// 使用PIN码时，需要使用PinIterator
val secretPin = encryptPin(SecretPinIterator(), pinToken, pin) ?: return
val verifyResponse = client.userService.pinVerify(PinRequest(secretPin))
println(verifyResponse.isSuccess)
```