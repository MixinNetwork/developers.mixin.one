---
title: API Guide
sidebar_position: 1
---

## Choosing An API Server

For HTTP requests:

| Domain | Type |
| :----- | :---- |
| https://api.mixin.one | Global |
| https://mixin-api.zeromesh.net |  China |

For webSocket requests:

| Domain | Type |
| :----- | :---- |
| wss://blaze.mixin.one | Global |
| wss://mixin-blaze.zeromesh.net |  China |


## Calling APIs

Most APIs need to signed with a JSON Web Tokens (JWT) to access. They utilizes secure data transmissions between clients and servers.

### Signing

:::tip
Most Mixin SDK has already provide a JWT generator, and thet can handle the JWT generation and verification automatically. For more information, please refer to [SDK section](/resources/sdk).
:::

**JWT Header**

| Parameter | Instruction |
| :----- | :---- |
| alg | Signature Algorithm, set to `RS512` |
| typ | Token type, set to `JWT` |

**JWT Payload**

| Parameter | Instruction |
| :----- | :---- |
| uid | User Id |
| sid | Session Id |
| iat | Issuance Time |
| exp | Expiration Time |
| jti | JWT ID |
| sig | Signature |

**Sign JWT in Go language**

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


**A example of signed token**

```
eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzMwOTY0ODUsImlhdCI6MTUyNTMyMDQ4NSwianRpIjoiMjU5NGFkNTctOWRhZC00MjRmLTg1OTUtYjE0NzI3ZTI0ZTYxIiwic2lkIjoiYzA5Y2YzMTMtN2RlZC00MjVkLWFkM2YtYTFjZTRjZmQ1ZTVlIiwic2lnIjoiODVkZDIzOGE5ODM0NzE3ZGMxM2QzODQ0ZjYzYTFmZWUxM2Q4MmQyZTZjMmVlNDRlYWM3Yzc5MGY1ZGIyNWY4OCIsInVpZCI6Ijg5ZTBiZGVlLWMzNTUtNDdmMi05NDVhLWJlNDhiZTg3NTYwNiJ9.PYg6Cx5grs0flJe862R3VLEWKyTZPcXOGYF9RouztgR_mi3kleIzJt4vCwUZI9F7QrHBFMtTc3_wG_ymnnjsmnm0pBdoON4I-RxeaztIlyc1Ey9lLFe6_ARRUBXo_15ZORilS1hRdMREd84eQOLlO0ChieBPY0tSSiVqTaFZt3Q
```

You can decode it at [jwt.io](https://jwt.io/).

**Send Requests with Token**

Add signed authentication token to the headers of API requests to get current dApp's profile:

```shell
curl -i -H "Content-Type: application/json" \
        -H "Authorization: Bearer YOUR_TOKEN_HERE" \
        "https://api.mixin.one/me"
```

### API Responses

The HTTP status codes returned by the Mixin APIs meet the RFC specifications.

On success:

```json
{
  "data": {...}
}
```

or

```json
{
  "data": [...]
}
```

On error:

```json
{
  "error":{
    "status": 500,
    "code":   500,
    "description":  "Internal Server Error"
  }
}
```

For more, please refer to error code [Document](./error-codes)。