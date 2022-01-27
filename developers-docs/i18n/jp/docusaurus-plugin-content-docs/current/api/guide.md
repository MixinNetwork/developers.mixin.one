---
title: APIガイド
sidebar_position: 1
---

## APIサーバーを選択

HTTPを選択する場合:

| Domain                         | Type            |
| :----------------------------- | :-------------- |
| https://api.mixin.one          | Global          |
| https://mixin-api.zeromesh.net | China Or Global |

WebSocketを選択する場合:

| Domain                         | Type            |
| :----------------------------- | :-------------- |
| wss://blaze.mixin.one          | Global          |
| wss://mixin-blaze.zeromesh.net | China Or Global |

## APIの呼び出し

ほとんどのAPIは、アクセスする際にJWT（JSON Web Tokens）で署名する必要があります。JWTは、クライアントとサーバー間で安全なデータ通信を実現します。

### 署名

:::ヒント
多くのMixin SDKでは、すでにJWTジェネレーターが提供されており、JWTの生成と検証を自動で行うことができます。詳しい内容は、[SDK](/docs/resources/sdk)をご覧ください。
:::

**JWTヘッダー**

| パラメータ | 入力内容                         |
| :-------- | :---------------------------------- |
| alg       | 署名アルゴリズムを`EdDSA`へ設定 |
| typ       | トークンタイプを`JWT`へ設定            |

**JWTペイロード**

| パラメータ | 入力内容           |
| :-------- | :--------------       |
| uid       | ユーザーID               |
| sid       | セクションID            |
| iat       | 発行時刻             |
| exp       | 有効期限       |
| jti       | JWT ID                |
| sig       | 署名             |
| scp       | FULL or special scope |

**Go言語でJWTに署名する場合**

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
  token := jwt.NewWithClaims(jwt.EdDSA, jwt.MapClaims{
      "uid": uid,
      "sid": sid,
      "iat": time.Now().UTC().Unix(),
      "exp": expire.Unix(),
      "jti": uuid.NewV4().String(),
      "sig": hex.EncodeToString(sum[:]),
      "scp": "FULL", // or "PROFILE:READ MESSAGES:REPRESENT"
  })

	priv, err := base64.RawURLEncoding.DecodeString(privateKey)
  if err != nil {
    return "", err
  }
	token, err := jwt.Sign(jwt.EdDSA, ed25519.PrivateKey(priv), claims)
  return string(token), err
}
```

**署名済みトークンの例**

```
eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzMwOTY0ODUsImlhdCI6MTUyNTMyMDQ4NSwianRpIjoiMjU5NGFkNTctOWRhZC00MjRmLTg1OTUtYjE0NzI3ZTI0ZTYxIiwic2lkIjoiYzA5Y2YzMTMtN2RlZC00MjVkLWFkM2YtYTFjZTRjZmQ1ZTVlIiwic2lnIjoiODVkZDIzOGE5ODM0NzE3ZGMxM2QzODQ0ZjYzYTFmZWUxM2Q4MmQyZTZjMmVlNDRlYWM3Yzc5MGY1ZGIyNWY4OCIsInVpZCI6Ijg5ZTBiZGVlLWMzNTUtNDdmMi05NDVhLWJlNDhiZTg3NTYwNiJ9.PYg6Cx5grs0flJe862R3VLEWKyTZPcXOGYF9RouztgR_mi3kleIzJt4vCwUZI9F7QrHBFMtTc3_wG_ymnnjsmnm0pBdoON4I-RxeaztIlyc1Ey9lLFe6_ARRUBXo_15ZORilS1hRdMREd84eQOLlO0ChieBPY0tSSiVqTaFZt3Q
```

[jwt.io](https://jwt.io/)で解読することができます。

**トークンを使用したリクエストの送信**

現在のdAppのプロフィールを取得するAPIリクエストのヘッダーに署名付き認証トークンを追加する:

```shell
curl -i -H "Content-Type: application/json" \
        -H "Authorization: Bearer YOUR_TOKEN_HERE" \
        "https://api.mixin.one/me"
```

### APIレスポンス

Mixin APIが返すHTTPのステータスコードは、RFCの仕様に準拠しています。

成功した場合:

```json
{
  "data": {...}
}
```

もしくは

```json
{
  "data": [...]
}
```

エラーが発生した場合:

```json
{
  "error": {
    "status": 500,
    "code": 500,
    "description": "Internal Server Error"
  }
}
```

詳しい内容は、[エラーコード](./error-codes)をご覧ください。
