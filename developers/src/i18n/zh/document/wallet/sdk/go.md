# Go SDK

### 安装

```
go get github.com/MixinNetwork/bot-api-go-client
```

### 例子

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
	// 生成用户
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
	// 将用户注册到 Mixin 网络
	user, err := bot.CreateUser(ctx, sessionSecret, "fullname", appId, appSessionId, appPrivateKey)
	if err != nil {
		fmt.Println(err)
		return
	}
	userSessionKey := string(pem.EncodeToMemory(&pem.Block{
		Type:  "RSA PRIVATE KEY",
		Bytes: x509.MarshalPKCS1PrivateKey(privateKey),
	}))

	// 加密 PIN
	encryptedPIN, err := bot.EncryptPIN(ctx, "123456", user.PinToken, user.SessionId, userSessionKey, uint64(time.Now().UnixNano()))
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(encryptedPIN)
	// 设置初始密码
	err = bot.UpdatePin(ctx, "", encryptedPIN, user.UserId, user.SessionId, userSessionKey)
	if err != nil {
		fmt.Println(err)
		return
	}

	//签名授权令牌
	authenticationToken, err := bot.SignAuthenticationToken(user.UserId, user.SessionId, userSessionKey, "GET", "/assets", "")
	if err != nil {
		fmt.Println(err)
		return
	}
	//获取用户资产列表
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

更多例子例子参见 SDK [examples](https://github.com/MixinNetwork/bot-api-go-client/blob/master/examples/wallet.go)。

---
本 SDK 由 Mixin 团队开发和维护，使用有问题可以通过 Mixin Messenger 搜索 493230、31911 联系我们提供帮助。由 Fox 团队提供的 Go SDK https://github.com/fox-one/mixin-sdk-go 也非常棒，提供了更为完善的代码示例。