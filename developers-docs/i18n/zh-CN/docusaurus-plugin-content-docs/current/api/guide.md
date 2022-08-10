---
title: Mixin API 指引
sidebar_position: 1
---

Messenger 的大部分 API 都需要的私钥，可以从上一篇 [API 简介](/zh-CN/docs/api-overview) 中的 keystore-7000xxx.json 获取。

Messenger 主要有三个签名：

1. 访问私有 API 的 JWT 签名, [详细](#调用-api)
2. OAuth 用户访问 API 的 JWT 签名, [详细](#oauth-用户签名)
3. 转帐，提现，创建地址需要的 pin 签名, [详细](#pin-签名)

## 选择 API 服务器

对于 HTTP 请求：

| 域名                           | 类型            |
| :----------------------------- | :-------------- |
| https://api.mixin.one          | Global          |
| https://mixin-api.zeromesh.net | China Or Global |

对于 WebSocket 请求：

| 域名                           | 类型            |
| :----------------------------- | :-------------- |
| wss://blaze.mixin.one          | Global          |
| wss://mixin-blaze.zeromesh.net | China Or Global |

## 调用 API

大多数 API 需要使用 JSON Web 令牌 (JWT) 进行签名才能访问。 它们利用客户端和服务器之间的安全数据传输。

### API 签名

:::tip
大多数 Mixin SDK 已经提供了 JWT 生成器，可以自动处理 JWT 生成和验证。 更多信息请参考 [SDK](/docs/resources/sdk)。
:::

**JWT Header**

| 参数 | 说明                                |
| :--- | :---------------------------------- |
| alg  | 签名算法 `EdDSA` |
| typ  | 类型 `JWT`            |

**JWT Payload**

| 参数 | 说明            |
| :--- | :-------------- |
| uid  | User Id         |
| sid  | Session Id      |
| iat  | issued at       |
| exp  | Expiration Time |
| jti  | JWT ID          |
| sig  | Signature       |

**使用 Go 语言进行 JWT 签名**

```go
/*
* uid: 用户或机器人的 uuid
* sid: Session Id
* privateKey: 机器人私钥
* method: HTTP 请求方法 GET, POST
* url: HTTP 请求 URL 例如: /transfers
* body: HTTP 请求内容, 例如: {"pin": "encrypted pin token"}
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

**一个 JWT 示例**

```
eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzMwOTY0ODUsImlhdCI6MTUyNTMyMDQ4NSwianRpIjoiMjU5NGFkNTctOWRhZC00MjRmLTg1OTUtYjE0NzI3ZTI0ZTYxIiwic2lkIjoiYzA5Y2YzMTMtN2RlZC00MjVkLWFkM2YtYTFjZTRjZmQ1ZTVlIiwic2lnIjoiODVkZDIzOGE5ODM0NzE3ZGMxM2QzODQ0ZjYzYTFmZWUxM2Q4MmQyZTZjMmVlNDRlYWM3Yzc5MGY1ZGIyNWY4OCIsInVpZCI6Ijg5ZTBiZGVlLWMzNTUtNDdmMi05NDVhLWJlNDhiZTg3NTYwNiJ9.PYg6Cx5grs0flJe862R3VLEWKyTZPcXOGYF9RouztgR_mi3kleIzJt4vCwUZI9F7QrHBFMtTc3_wG_ymnnjsmnm0pBdoON4I-RxeaztIlyc1Ey9lLFe6_ARRUBXo_15ZORilS1hRdMREd84eQOLlO0ChieBPY0tSSiVqTaFZt3Q
```

你可以在 [jwt.io](https://jwt.io/) 这样的工具查看 JWT。

**发送携带 JWT 的请求**

将签名的 JWT 添加到 API 请求的标头以获取当前 dApp 的 profile：

```shell
curl -i -H "Content-Type: application/json" \
        -H "Authorization: Bearer YOUR_TOKEN_HERE" \
        "https://api.mixin.one/me"
```

### API 返回

Mixin API 返回的 HTTP 状态码符合 RFC 规范。

成功时：

```json
{
  "data": {...}
}
```

或者

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

更多请参考[错误码文档](./error-codes)。

## OAuth 用户签名

当用户完成授权后会返回对应的信息, [API 详情](/zh-CN/docs/api/oauth/oauth), 签名的方式跟机器人签名几乎一致，只是每次需要不同的 requestID.

```
/*
* appID: 机器人的 id 
* authorizationID: 用户授权完成后返回的 authorization_id
* privateKey: 本地生成的 private key
* method: HTTP 请求方法，GET, POST
* url: 例如 /me
* body：GET 是 ""
* scp: 用户授权时的 scope "PROFILE:READ PHONE:READ"
* requestID: 随机生成的 uuid
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

Messenger 用 6 位数的 Pin 通过 TIP 协议，让用户方便的管理私钥, 关于 TIP 的实现，开源地址: [https://github.com/MixinNetwork/tip](https://github.com/MixinNetwork/tip) , 在这里我们不展开讨论。

当用户需要对资产进行操作，比如转帐，提现等时，都需要对 6 位数的 pin 进行签名，下面是 Golang 的示例

```golang
* pin： 6 位数的数字，字符的形式，例如 '321321'
* pinTokenBase64: 是服务器返回的一个 ed25519 的公钥, 在 keystore_7000xxx.json 里可以找到
* privateKey: 用户的私钥, 跟 API 签名的一致
* iterator: 递增数字，每次签名都需要比之前的数字大，不一定是 1

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

## 总结

Messenger API 主要包含:

* 部分公开的 API, 例如 https://api.mixin.one/network/chains 获取所有链的列表
* 私有的 API 需要通过签名生成 Token 进行访问, 例如 https://api.mixin.one/me
* 转帐，提现等同时需要对 pin 进行签名
* 另外有些请求的字段名字会以 `_base64` 结尾, RFC 4648 规范的 base64 格式，[详细介绍](https://pkg.go.dev/encoding/base64#pkg-variables)
