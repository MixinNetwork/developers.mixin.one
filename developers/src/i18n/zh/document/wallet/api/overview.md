### API 使用说明

### 选择 API 服务

HTTP 请求

| 域名 | 类型 |
| :----- | :---- |
| https://api.mixin.one | 全球通用 |
| https://mixin-api.zeromesh.net |  域名已备案，国内推荐使用 |

WebSocket 连接

| 域名 | 类型 |
| :----- | :---- |
| wss://blaze.mixin.one | 全球通用 |
| wss://mixin-blaze.zeromesh.net |  域名已备案，国内推荐使用 |

### API 请求

Mixin API 基于 JSON Web Tokens (JWT) 来确保客户端和服务端传递安全可靠的信息。

- 签名

  JWT Header

  | 参数 | 说明 |
  | :----- | :---- |
  | alg | 签名算法，固定写 `RS512` |
  | typ | 令牌类型，固定写 `JWT` |

  JWT Payload

  | 参数 | 说明 |
  | :----- | :---- |
  | uid | User Id |
  | sid | Session Id |
  | iat | 签发时间 |
  | exp | 过期时间 |
  | jti | JWT ID |
  | sig | 签名内容 |

  使用 Go 语言实现 JWT 签名：
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

  签名后的字符串样例：
  ```
  eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzMwOTY0ODUsImlhdCI6MTUyNTMyMDQ4NSwianRpIjoiMjU5NGFkNTctOWRhZC00MjRmLTg1OTUtYjE0NzI3ZTI0ZTYxIiwic2lkIjoiYzA5Y2YzMTMtN2RlZC00MjVkLWFkM2YtYTFjZTRjZmQ1ZTVlIiwic2lnIjoiODVkZDIzOGE5ODM0NzE3ZGMxM2QzODQ0ZjYzYTFmZWUxM2Q4MmQyZTZjMmVlNDRlYWM3Yzc5MGY1ZGIyNWY4OCIsInVpZCI6Ijg5ZTBiZGVlLWMzNTUtNDdmMi05NDVhLWJlNDhiZTg3NTYwNiJ9.PYg6Cx5grs0flJe862R3VLEWKyTZPcXOGYF9RouztgR_mi3kleIzJt4vCwUZI9F7QrHBFMtTc3_wG_ymnnjsmnm0pBdoON4I-RxeaztIlyc1Ey9lLFe6_ARRUBXo_15ZORilS1hRdMREd84eQOLlO0ChieBPY0tSSiVqTaFZt3Q
  ```

- HTTP 请求

  将签名的授权令牌加到请求头访问 API ：

  ```shell
  curl -i -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzMxMDUzODIsImlhdCI6MTUyNTMyOTM4MiwianRpIjoiZDcwMjdiOWUtNzcxYy00ZDA5LTlkMjQtNGVlYjc5YmJhNGM2Iiwic2lkIjoiYTM0YzA3YTktNzU1ZC00YjU0LTk0YzUtZTQ1ZTlhMmRkNDNlIiwic2lnIjoiNzEyNjY0ZmE4NDI4ZWM4Njg5MjA3YzdhOWE1MTNlMzlhNTk2MWMxODQwNmVkOTlkMzViNzNmMTIyYTdlOWIwMyIsInVpZCI6IjA2YWVkMWUzLWJkNzctNGE1OS05OTFhLTViYjVhZTZmYmIwOSJ9.FZryq34iN5TSxG4eMhYe4oe56IR5E_PaiKxIqwlIrAExg8ghJ5uXmOAg6_9V6lWXjl4ZIDuadQ5mGMNqxJfrj0kYS9Tb5dJUzA4xKKqbUXmPsk4VFLyFLg3CJUJmgQqpL62doHSW_0T9EA7W03tLTQZ-nbjhpca7eK3U-KRgK-E" "https://mixin-api.zeromesh.net/me"
  ```

### API 返回

Mixin API 返回的 HTTP 状态码符合 RFC 规范。

成功

```json
{
  "data": {}
}
```

错误

```json
{  
  "error":{
    "status": 500,
    "code": 500,
    "description":"Internal Server Error"
  }
}
```

详细错误码参见[文档](./error-codes)。
