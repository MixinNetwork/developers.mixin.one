---
title: Mixin API 指引
sidebar_position: 1
---

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

### 签名

:::tip
大多数 Mixin SDK 已经提供了 JWT 生成器，可以自动处理 JWT 生成和验证。 更多信息请参考 [SDK](/resources/sdk)。
:::

**JWT Header**

| 参数 | 说明                                |
| :--- | :---------------------------------- |
| alg  | Signature Algorithm, set to `RS512` |
| typ  | Token type, set to `JWT`            |

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
* uid: User Id
* sid: Session Id
* secret: PrivateKey
* method: HTTP Request method, e.g.: GET, POST
* url: URL path without hostname, e.g.: /transfers
* body: HTTP Request body, e.g.: {"pin": "encrypted pin token"}
*/
func SignAuthenticationToken(uid, sid, secret, method, uri, body string) (string, error) {
  expire := time.Now().UTC().Add(time.Hour * 24 * 30 * 3)
  sum := sha256.Sum256([]byte(method + uri + body))
  token := jwt.NewWithClaims(jwt.SigningMethodRS512, jwt.MapClaims{
      "uid": uid,
      "sid": sid,
      "iat": time.Now().UTC().Unix(),
      "exp": expire.Unix(),
      "jti": uuid.NewV4().String(),
      "sig": hex.EncodeToString(sum[:]),
  })

  block, _ := pem.Decode([]byte(secret))
  key, err := x509.ParsePKCS1PrivateKey(block.Bytes)
  if err != nil {
      return "", err
  }
  return token.SignedString(key)
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
