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
	uid        = ""
	sid        = ""
	sessionKey = ``
)

func main() {
	ctx := context.Background()

	// 创建用户
	user, userSessionKey, err := createUser(ctx)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(user.UserId)  
	fmt.Println(userSessionKey)

	// 设置初始密码
	err = setupPin(ctx, "123456", user, userSessionKey)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println("Setup PIN successful")

	// 读取用户资产列表
	assets, err := getAssets(ctx, user, userSessionKey)
	if err != nil {
		fmt.Println(err)
		return
	}
	for _, a := range assets {
		fmt.Println(a.AssetId)
	}
}

```

### 常见问题
- PIN 不正确？

  注意加密后的 PIN 只能用一次，iterator 必须始终比上一次大，可以直接用当前纳秒时间

---
本 SDK 由 Mixin 团队开发和维护，您也可以使用由 Fox 团队提供的 Go SDK https://github.com/fox-one/mixin-sdk-go 。