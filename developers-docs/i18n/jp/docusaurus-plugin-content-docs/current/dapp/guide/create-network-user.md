---
title: Create Network User
sidebar_position: 2
---

The network user is a user that created by the private key of the application user. The keystore of a network user is created by the application and then registered to the Mixin Network.

The following example uses Go SDK to generate the wallet user code:

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

`clientId`, `sessionId`, `privateKey` are obtained from the keystore of the current wallet application.

For SDKs in other languages, please refer to [document](/docs/resources/sdk).
