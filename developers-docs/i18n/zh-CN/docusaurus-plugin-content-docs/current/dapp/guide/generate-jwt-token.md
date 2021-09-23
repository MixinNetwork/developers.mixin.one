---
title: 生成授权 Token
---

通过 API 访问和操作用户数据需要 HTTP 头中的签名身份授权 Token。

### 签名认证令牌

在 Go 语言中:

```go
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
    return "", fmt.Errorf("Bad ed25519 private key %s", privateKey)
  }
  // more validate the private key
  if len(priv) != 64 {
    return "", fmt.Errorf("Bad ed25519 private key %s", priv)
  }
  token := jwt.NewWithClaims(Ed25519SigningMethod, claims)
  return token.SignedString(ed25519.PrivateKey(priv))
}
```

一个签名授权 Token 的示例：

```
eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzMwOTY0ODUsImlhdCI6MTUyNTMyMDQ4NSwianRpIjoiMjU5NGFkNTctOWRhZC00MjRmLTg1OTUtYjE0NzI3ZTI0ZTYxIiwic2lkIjoiYzA5Y2YzMTMtN2RlZC00MjVkLWFkM2YtYTFjZTRjZmQ1ZTVlIiwic2lnIjoiODVkZDIzOGE5ODM0NzE3ZGMxM2QzODQ0ZjYzYTFmZWUxM2Q4MmQyZTZjMmVlNDRlYWM3Yzc5MGY1ZGIyNWY4OCIsInVpZCI6Ijg5ZTBiZGVlLWMzNTUtNDdmMi05NDVhLWJlNDhiZTg3NTYwNiJ9.PYg6Cx5grs0flJe862R3VLEWKyTZPcXOGYF9RouztgR_mi3kleIzJt4vCwUZI9F7QrHBFMtTc3_wG_ymnnjsmnm0pBdoON4I-RxeaztIlyc1Ey9lLFe6_ARRUBXo_15ZORilS1hRdMREd84eQOLlO0ChieBPY0tSSiVqTaFZt3Q
```

### 调用 APIs

```go
const (
  userId   = ""
  sessionId  = ""
  privateKey = ""
)

func main() {
    uri := "https://mixin-api.zeromesh.net"
  path := "/me"
  token, err := SignAuthenticationToken(userId, sessionId, privateKey, "POST", path, "")
  if err != nil {
    println(err)
    return
  }

  req, err := http.NewRequest("GET", uri+path, bytes.NewReader(nil))
  if err != nil {
    println(err)
    return
  }

  httpClient := &http.Client{}

  req.Header.Set("Content-Type", "application/json")
  req.Header.Set("Authorization", "Bearer "+token)
  req.Header.Set("X-Request-Id", uuid.NewV4().String())
  resp, err := httpClient.Do(req)
  if err != nil {
    println(err)
    return
  }
  defer resp.Body.Close()

  if resp.StatusCode >= 500 {
    println(err)
    return
  }
  println(ioutil.ReadAll(resp.Body))
}

```

- 已签名的授权 Token 不可重复使用，请在每次请求时重新生成。
- `X-Request-Id` 用于标识当前请求，
