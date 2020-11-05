# 生成钱包用户

钱包用户本地私钥生成然后注册到 Mixin 网络，以下使用 go sdk 生成钱包用户代码：

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
	privateKey, err := rsa.GenerateKey(rand.Reader, 1024)
	if err != nil {
		println(err)
		return
	}
	publicKeyBytes, err := x509.MarshalPKIXPublicKey(privateKey.Public())
	if err != nil {
		println(err)
		return
	}
	sessionSecret := base64.StdEncoding.EncodeToString(publicKeyBytes)
	user, err := bot.CreateUser(ctx, sessionSecret, "fullname", clientId, sessionId, privateKey)
	if err != nil {
		println(err)
		return
	}
}
```

`clientId`、`sessionId`、`privateKey` 从当前钱包应用的 keystore 中获取。

### 下一步

- [创建钱包用户](./create-network-user)

  开发者可以通过授权读取用户个人、资产、转账等信息，据此可为用户提供各种更精细化的信息、金融服务。