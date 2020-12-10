# 生成钱包用户

本地私钥生成钱包用户，再注册到 Mixin 网络，以下使用 go sdk 生成钱包用户代码：

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
	// 生成 Ed25519 私钥对
	publicKey, privateKey, err := ed25519.GenerateKey(rand.Reader)
	if err != nil {
		println(err)
		return
	}
	sessionSecret := base64.RawURLEncoding.EncodeToString(publicKey[:])
	// 注册到 Mixin 网络
	user, err := bot.CreateUser(ctx, sessionSecret, "fullname", clientId, sessionId, privateKey)
	if err != nil {
		println(err)
		return
	}
}
```

`clientId`、`sessionId`、`privateKey` 从当前钱包应用的 keystore 中获取，其他语言的 SDK 参见[文档](../sdk/overview)。

### 下一步

- [授权访问接口](./authentication-token)

  通过 API 访问和操作用户的数据。
