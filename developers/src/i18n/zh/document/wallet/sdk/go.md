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
	"crypto/ed25519"
	"crypto/rand"
	"encoding/base64"
	"fmt"
	"time"

	"github.com/MixinNetwork/bot-api-go-client"
)

const (
	clientId      = ""
	appSessionId  = ""
	appPrivateKey = ``
)

func main() {
	ctx := context.Background()
	// 生成 Ed25519 私钥对
	publicKey, privateKey, err := ed25519.GenerateKey(rand.Reader)
	if err != nil {
		println(err)
		return
	}
	sessionSecret := base64.RawURLEncoding.EncodeToString(publicKey[:])
	// 将用户注册到 Mixin 网络
	user, err := bot.CreateUser(ctx, sessionSecret, "fullname", clientId, appSessionId, appPrivateKey)
	if err != nil {
		fmt.Println(err)
		return
	}
	userSessionKey := base64.RawURLEncoding.EncodeToString(privateKey)

	// 加密 PIN
	encryptedPIN, err := bot.EncryptEd25519PIN(ctx, "123456", user.PinToken, user.SessionId, userSessionKey, uint64(time.Now().UnixNano()))
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