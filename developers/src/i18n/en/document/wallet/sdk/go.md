# Go SDK

### Installation

```
go get github.com/MixinNetwork/bot-api-go-client
```

### Quick Start

```golang
package main

import (
	"context"
	"crypto/rand"
	"crypto/rsa"
	"crypto/x509"
	"encoding/base64"
	"encoding/pem"
	"fmt"
	"time"

	"github.com/MixinNetwork/bot-api-go-client"
)

const (
	appId         = ""
	appSessionId  = ""
	appPrivateKey = ``
)

func main() {
	ctx := context.Background()
	// Generate Ed25519 key pair.
	privateKey, err := rsa.GenerateKey(rand.Reader, 1024)
	if err != nil {
		fmt.Println(err)
		return
	}
	publicKeyBytes, err := x509.MarshalPKIXPublicKey(privateKey.Public())
	if err != nil {
		fmt.Println(err)
		return
	}
	sessionSecret := base64.StdEncoding.EncodeToString(publicKeyBytes)
	// Rigster the user on the Mixin network
	user, err := bot.CreateUser(ctx, sessionSecret, "fullname", appId, appSessionId, appPrivateKey)
	if err != nil {
		fmt.Println(err)
		return
	}
	userSessionKey := string(pem.EncodeToMemory(&pem.Block{
		Type:  "RSA PRIVATE KEY",
		Bytes: x509.MarshalPKCS1PrivateKey(privateKey),
	}))

	// encrypt PIN
	encryptedPIN, err := bot.EncryptPIN(ctx, "123456", user.PinToken, user.SessionId, userSessionKey, uint64(time.Now().UnixNano()))
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(encryptedPIN)
	// Set initial code.
	err = bot.UpdatePin(ctx, "", encryptedPIN, user.UserId, user.SessionId, userSessionKey)
	if err != nil {
		fmt.Println(err)
		return
	}
	//Sign authentication token.
	authenticationToken, err := bot.SignAuthenticationToken(user.UserId, user.SessionId, userSessionKey, "GET", "/assets", "")
	if err != nil {
		fmt.Println(err)
		return
	}
	// Read asset list
	assets, err := bot.AssetList(ctx, authenticationToken)
	if err != nil {
		fmt.Println(err)
		return
	}
	for _, a := range assets {
		fmt.Println(a.AssetId)
	}
}

```

Fo more examples, see [examples](https://github.com/MixinNetwork/bot-api-go-client/blob/master/examples/wallet.go)。

---
This SDK is developed by the Mixin team. To contact tech support, search for 493230, 31911 in Mixin Messenger. The Go SDK https://github.com/fox-one/mixin-sdk-go provided by the Fox team is also very good, providing more complete code examples.