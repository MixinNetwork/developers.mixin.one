---
title: 创建 Network 用户
sidebar_position: 2
---

Network 用户是由应用程序的私钥创建的用户。Network 用户的 Keystore 由应用程序创建，然后注册到 Mixin 网络。

以下示例使用 Go SDK 生成钱包用户代码：

```go
import (
  "context"
  "crypto/rand"
  "crypto/rsa"
  "crypto/x509"
  "encoding/base64"
  "encoding/pem"

  "github.com/MixinNetwork/bot-api-go-client"
)

const (
  clientId   = ""
  sessionId  = ""
  privateKey = ""
)

func main() {
  ctx := context.Background()

  // Generate Ed25519 private key pair
  publicKey, privateKey, err := ed25519.GenerateKey(rand.Reader)
  if err != nil {
    println(err)
    return
  }
  sessionSecret := base64.RawURLEncoding.EncodeToString(publicKey[:])

  // register in Mixin network
  user, err := bot.CreateUser(ctx, sessionSecret, "fullname", clientId, sessionId, privateKey)
  if err != nil {
    println(err)
    return
  }
}
```

`clientId`, `sessionId`, `privateKey` 从当前钱包应用程序的密钥库中获取。

其他语言的 SDK 请参考[文档](/resources/sdk)。
