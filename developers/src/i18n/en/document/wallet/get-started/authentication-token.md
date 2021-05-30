# 授权访问接口

通过 API 访问和操作用户的数据需要在请求头附带签名的授权令牌（Authentication Token）。

### 签名授权令牌

用 go 语言实现签名授权：

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

签名后的授权令牌样例：

```
eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzMwOTY0ODUsImlhdCI6MTUyNTMyMDQ4NSwianRpIjoiMjU5NGFkNTctOWRhZC00MjRmLTg1OTUtYjE0NzI3ZTI0ZTYxIiwic2lkIjoiYzA5Y2YzMTMtN2RlZC00MjVkLWFkM2YtYTFjZTRjZmQ1ZTVlIiwic2lnIjoiODVkZDIzOGE5ODM0NzE3ZGMxM2QzODQ0ZjYzYTFmZWUxM2Q4MmQyZTZjMmVlNDRlYWM3Yzc5MGY1ZGIyNWY4OCIsInVpZCI6Ijg5ZTBiZGVlLWMzNTUtNDdmMi05NDVhLWJlNDhiZTg3NTYwNiJ9.PYg6Cx5grs0flJe862R3VLEWKyTZPcXOGYF9RouztgR_mi3kleIzJt4vCwUZI9F7QrHBFMtTc3_wG_ymnnjsmnm0pBdoON4I-RxeaztIlyc1Ey9lLFe6_ARRUBXo_15ZORilS1hRdMREd84eQOLlO0ChieBPY0tSSiVqTaFZt3Q
```

### 调用 API 接口

如果产品用户主要是在中国区，推荐使用 `https://mixin-api.zeromesh.net` 来访问 API，全球用户 `https://api.mixin.one`。

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

- 签名后的授权令牌不能重复使用，每次请求都请重新生成
- `X-Request-Id` 主要用于标识当前的请求

### 下一步

- [设置 PIN 密码](./pin)

  为用户设置初始密码或者引导用户设置密码。