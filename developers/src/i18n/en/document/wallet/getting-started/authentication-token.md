# Authorizing API Access

Accessing and manipulating user data through the APIs requires a signed authentication token in the HTTP headers.

### Signing Authentication Token

In Go language:

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

An example of a signed  authentication token:

```
eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzMwOTY0ODUsImlhdCI6MTUyNTMyMDQ4NSwianRpIjoiMjU5NGFkNTctOWRhZC00MjRmLTg1OTUtYjE0NzI3ZTI0ZTYxIiwic2lkIjoiYzA5Y2YzMTMtN2RlZC00MjVkLWFkM2YtYTFjZTRjZmQ1ZTVlIiwic2lnIjoiODVkZDIzOGE5ODM0NzE3ZGMxM2QzODQ0ZjYzYTFmZWUxM2Q4MmQyZTZjMmVlNDRlYWM3Yzc5MGY1ZGIyNWY4OCIsInVpZCI6Ijg5ZTBiZGVlLWMzNTUtNDdmMi05NDVhLWJlNDhiZTg3NTYwNiJ9.PYg6Cx5grs0flJe862R3VLEWKyTZPcXOGYF9RouztgR_mi3kleIzJt4vCwUZI9F7QrHBFMtTc3_wG_ymnnjsmnm0pBdoON4I-RxeaztIlyc1Ey9lLFe6_ARRUBXo_15ZORilS1hRdMREd84eQOLlO0ChieBPY0tSSiVqTaFZt3Q
```

### Calling APIs

If the product users are mainly in China, it is recommended to use `https://mixin-api.zeromesh.net` to access the APIs, and global users `https://api.mixin.one`.

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

- The signed authorization token cannot be reused, please regenerate it every time you request.
- `X-Request-Id` is used to identify the current request,

### Next Step

- [Setting PIN](./pin)

  Set an initial PIN for the user or guide the user to set a PIN.