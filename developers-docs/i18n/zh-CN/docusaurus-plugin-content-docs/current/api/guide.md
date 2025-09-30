---
title: API 指南
sidebar_position: 1
---

大部分 API 访问都需要携带使用私钥签名后的请求，私钥可以从 [dashboard](https://developers.mixin.one/dashboard) 下载。

Mixin 中常见的签名类型有三种：
1. 机器人访问私有 API 所需的 JWT 签名，[详情](#调用-api)
2. OAuth 用户访问私有 API 所需的 JWT 签名，[详情](#oauth-用户签名)
3. 进行转账、提现和创建提现地址所需的 PIN 签名，[详情](#pin-签名)

## 选择 API 服务器

对于 HTTP 请求：

| 域名                           | 类型            |
| :----------------------------- | :-------------- |
| [https://api.mixin.one](https://api.mixin.one)          | Global          |
| [https://mixin-api.zeromesh.net](https://mixin-api.zeromesh.net) | China Or Global |

对于 WebSocket 请求：

| 域名                           | 类型            |
| :----------------------------- | :-------------- |
| wss://blaze.mixin.one          | Global          |
| wss://mixin-blaze.zeromesh.net | China Or Global |

## 调用 API

大多数 API 需要使用 JSON Web Token (JWT) 进行签名后才能访问，它保障客户端与服务器之间的数据传输安全。

### 签名

:::tip
大多数 Mixin SDK 已内置 JWT 生成器，可以自动完成 JWT 的生成与校验。更多信息请参考 [SDK 列表](/docs/resources/sdk)。
:::

#### JWT Header

| 参数 | 说明                                |
| :--- | :---------------------------------- |
| alg  | 签名算法，设置为 `EdDSA`            |
| typ  | 令牌类型，设置为 `JWT`              |

#### JWT Payload

| 参数 | 说明          |
| :--- | :------------ |
| uid  | 用户 ID       |
| sid  | 会话 ID       |
| iat  | 签发时间      |
| exp  | 过期时间      |
| jti  | JWT ID        |
| sig  | 签名摘要      |

#### 使用 Go 语言签名 JWT

```go
/*
* uid: User Id
* sid: Session Id
* secret: PrivateKey
* method: HTTP Request method, e.g.: GET, POST
* url: URL path without hostname, e.g.: /transfers
* body: HTTP Request body, e.g.: {"pin": "encrypted pin token"}
*/
func SignAuthenticationToken(uid, sid, privateKey, method, uri, body string) (string, error) {
	expire := time.Now().UTC().Add(time.Hour * 24 * 30 * 3)
	sum := sha256.Sum256([]byte(method + uri + body))

	claims := jwt.MapClaims{
		"uid": uid,
		"sid": sid,
		"iat": time.Now().UTC().Unix(),
		"exp": expire.Unix(),
		"jti": UuidNewV4().String(),
		"sig": hex.EncodeToString(sum[:]),
		"scp": "FULL",
	}
	priv, err := base64.RawURLEncoding.DecodeString(privateKey)
	if err != nil {
    return "", err
	}
	// more validate the private key
	if len(priv) != 64 {
		return "", fmt.Errorf("Bad ed25519 private key %s", priv)
	}
	token := jwt.NewWithClaims(jwt.SigningMethodEdDSA, claims)
	return token.SignedString(ed25519.PrivateKey(priv))
}
```

#### 已签名的 Token 示例

```text
eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzMwOTY0ODUsImlhdCI6MTUyNTMyMDQ4NSwianRpIjoiMjU5NGFkNTctOWRhZC00MjRmLTg1OTUtYjE0NzI3ZTI0ZTYxIiwic2lkIjoiYzA5Y2YzMTMtN2RlZC00MjVkLWFkM2YtYTFjZTRjZmQ1ZTVlIiwic2lnIjoiODVkZDIzOGE5ODM0NzE3ZGMxM2QzODQ0ZjYzYTFmZWUxM2Q4MmQyZTZjMmVlNDRlYWM3Yzc5MGY1ZGIyNWY4OCIsInVpZCI6Ijg5ZTBiZGVlLWMzNTUtNDdmMi05NDVhLWJlNDhiZTg3NTYwNiJ9.PYg6Cx5grs0flJe862R3VLEWKyTZPcXOGYF9RouztgR_mi3kleIzJt4vCwUZI9F7QrHBFMtTc3_wG_ymnnjsmnm0pBdoON4I-RxeaztIlyc1Ey9lLFe6_ARRUBXo_15ZORilS1hRdMREd84eQOLlO0ChieBPY0tSSiVqTaFZt3Q
```

可以在 [jwt.io](https://jwt.io/) 等工具中查看。

#### 使用 Token 发送请求

在 API 请求头中添加签名后的 Token，例如获取当前 dApp 的资料：

```shell
curl -i -H "Content-Type: application/json" \
        -H "Authorization: Bearer YOUR_TOKEN_HERE" \
        "https://api.mixin.one/me"
```

### API 响应

Mixin API 返回的 HTTP 状态码符合 RFC 规范。

成功时：

```json
{
  "data": {...}
}
```

或

```json
{
  "data": [...]
}
```

失败时：

```json
{
  "error": {
    "status": 500,
    "code": 500,
    "description": "Internal Server Error"
  }
}
```

## OAuth 用户签名

当用户完成授权后会返回认证信息，详情见 [OAuth 授权](/docs/api/oauth)。签名方式与机器人类似，不同之处在于每次请求都需要不同的 requestID。

```
/*
* appID: client_id of authorized user
* authorizationID: authorization_id in response after authorization
* privateKey: local generated ED25519 private key
* method: HTTP request method: GET, POST, ...
* url: /me
* body：request body
* scp: access scope that use authorize, like "PROFILE:READ PHONE:READ"
* requestID: random uuid
*/
func SignOauthAccessToken(appID, authorizationID, privateKey, method, uri, body, scp string, requestID string) (string, error) {
	expire := time.Now().UTC().Add(time.Hour * 24 * 30 * 3)
	sum := sha256.Sum256([]byte(method + uri + body))
	claims := jwt.MapClaims{
		"iss": appID,
		"aid": authorizationID,
		"iat": time.Now().UTC().Unix(),
		"exp": expire.Unix(),
		"sig": hex.EncodeToString(sum[:]),
		"scp": scp,
		"jti": requestID,
	}

	kb, err := base64.RawURLEncoding.DecodeString(privateKey)
	if err != nil {
		return "", err
	}
	priv := ed25519.PrivateKey(kb)
	token := jwt.NewWithClaims(jwt.SigningMethodEdDSA, claims)
	return token.SignedString(priv)
}
```

## PIN 签名

Mixin Messenger 通过 TIP 协议配合 6 位数 PIN，帮助用户管理私钥。关于 TIP 的更多细节，请参阅 [https://github.com/MixinNetwork/tip](https://github.com/MixinNetwork/tip)。

当用户需要管理资产、执行转账或提现操作时，都必须提供 PIN 签名。以下是一个 Golang 示例：

```golang
* pin: 6 digits number in string, e.g.: '321321'
* pinTokenBase64: An ed25519 public key, can be found in keystore_7000xxx.json
* privateKey: private key, same as other signatures
* iterator: a number that must increase every signature

func EncryptEd25519PIN(pin, pinTokenBase64, privateKey string, iterator uint64) (string, error) {
	privateBytes, err := base64.RawURLEncoding.DecodeString(privateKey)
	if err != nil {
		return "", err
	}

	private := ed25519.PrivateKey(privateBytes)
	public, err := base64.RawURLEncoding.DecodeString(pinTokenBase64)
	if err != nil {
		return "", err
	}
	var curvePriv, pub [32]byte
	PrivateKeyToCurve25519(&curvePriv, private)
	copy(pub[:], public[:])
	keyBytes, err := curve25519.X25519(curvePriv[:], pub[:])
	if err != nil {
		return "", err
	}

	pinByte := []byte(pin)
	timeBytes := make([]byte, 8)
	binary.LittleEndian.PutUint64(timeBytes, uint64(time.Now().Unix()))
	pinByte = append(pinByte, timeBytes...)
	iteratorBytes := make([]byte, 8)
	binary.LittleEndian.PutUint64(iteratorBytes, iterator)
	pinByte = append(pinByte, iteratorBytes...)
	padding := aes.BlockSize - len(pinByte)%aes.BlockSize
	padtext := bytes.Repeat([]byte{byte(padding)}, padding)
	pinByte = append(pinByte, padtext...)
	block, err := aes.NewCipher(keyBytes[:])
	if err != nil {
		return "", err
	}
	ciphertext := make([]byte, aes.BlockSize+len(pinByte))
	iv := ciphertext[:aes.BlockSize]
	_, err = io.ReadFull(rand.Reader, iv)
	if err != nil {
		return "", err
	}
	mode := cipher.NewCBCEncrypter(block, iv)
	mode.CryptBlocks(ciphertext[aes.BlockSize:], pinByte)
	return base64.RawURLEncoding.EncodeToString(ciphertext), nil
}
```

## 其它

Messenger API 包含以下几类：

* 公共 API，例如 `GET /network/chains` 可获取所有链的信息
* 私有 API，需要携带签名的请求，例如 `GET /me` 可获取当前用户信息
* 转账等资产类接口，需要额外提供 PIN 签名
* 响应中以 `_base64` 结尾的字段遵循 RFC 4648 定义的 base64 编码，可参考 [https://pkg.go.dev/encoding/base64#pkg-variables](https://pkg.go.dev/encoding/base64#pkg-variables)
