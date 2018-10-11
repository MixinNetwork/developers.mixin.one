---
title: Authentication Token
category: Mixin Network
order: 3
---

Authentication token is used to request a protected resources. Notice: `privateKey` is generated using RSA PKCS#1 v1.5. You can get more information from [https://golang.org/pkg/crypto/rsa/](https://golang.org/pkg/crypto/rsa/).

```golang
uid: ClientId or Bear User Id
sid: SessionId or Bear User SessionId
privateKey: PrivateKey
method: HTTP Request method, e.g.: GET, POST
url: URL path without hostname, e.g.: /transfers
body: HTTP Request body, e.g.: {"pin": "encrypted pin token"}
```

How to generate an Authentication Token?

``` golang
// Golang Example Code
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

It will generate a Authentication Token like:

```
// Signed Authentication Token
eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzMwOTY0ODUsImlhdCI6MTUyNTMyMDQ4NSwianRpIjoiMjU5NGFkNTctOWRhZC00MjRmLTg1OTUtYjE0NzI3ZTI0ZTYxIiwic2lkIjoiYzA5Y2YzMTMtN2RlZC00MjVkLWFkM2YtYTFjZTRjZmQ1ZTVlIiwic2lnIjoiODVkZDIzOGE5ODM0NzE3ZGMxM2QzODQ0ZjYzYTFmZWUxM2Q4MmQyZTZjMmVlNDRlYWM3Yzc5MGY1ZGIyNWY4OCIsInVpZCI6Ijg5ZTBiZGVlLWMzNTUtNDdmMi05NDVhLWJlNDhiZTg3NTYwNiJ9.PYg6Cx5grs0flJe862R3VLEWKyTZPcXOGYF9RouztgR_mi3kleIzJt4vCwUZI9F7QrHBFMtTc3_wG_ymnnjsmnm0pBdoON4I-RxeaztIlyc1Ey9lLFe6_ARRUBXo_15ZORilS1hRdMREd84eQOLlO0ChieBPY0tSSiVqTaFZt3Q
```

You can also generate a base64 encoded string of PublicKey from PrivateKey.

```golang
// Golang Example Code
privateKey, _ := rsa.GenerateKey(rand.Reader, 1024)
publicKeyBytes, _ := x509.MarshalPKIXPublicKey(privateKey.Public())
sessionSecret := base64.StdEncoding.EncodeToString(publicKeyBytes)
```
