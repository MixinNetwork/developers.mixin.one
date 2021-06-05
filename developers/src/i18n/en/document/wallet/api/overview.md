# API Guide

### Choosing An API Server

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

### Calling APIs 

The Mixin API utilizes JSON Web Tokens (JWT) secure data transmissions between clients and servers.

- Signing

  JWT Header

  | Parameter | Instruction |
  | :----- | :---- |
  | alg | Signature Algorithm, set to `RS512` |
  | typ | Token type, set to `JWT` |

  JWT Payload

  | Parameter | Instruction |
  | :----- | :---- |
  | uid | User Id |
  | sid | Session Id |
  | iat | Issuance Time |
  | exp | Expiration Time |
  | jti | JWT ID |
  | sig | Signature |

  Sign JWT in Go language:

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


  A example of signed token:

  ```
  eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzMwOTY0ODUsImlhdCI6MTUyNTMyMDQ4NSwianRpIjoiMjU5NGFkNTctOWRhZC00MjRmLTg1OTUtYjE0NzI3ZTI0ZTYxIiwic2lkIjoiYzA5Y2YzMTMtN2RlZC00MjVkLWFkM2YtYTFjZTRjZmQ1ZTVlIiwic2lnIjoiODVkZDIzOGE5ODM0NzE3ZGMxM2QzODQ0ZjYzYTFmZWUxM2Q4MmQyZTZjMmVlNDRlYWM3Yzc5MGY1ZGIyNWY4OCIsInVpZCI6Ijg5ZTBiZGVlLWMzNTUtNDdmMi05NDVhLWJlNDhiZTg3NTYwNiJ9.PYg6Cx5grs0flJe862R3VLEWKyTZPcXOGYF9RouztgR_mi3kleIzJt4vCwUZI9F7QrHBFMtTc3_wG_ymnnjsmnm0pBdoON4I-RxeaztIlyc1Ey9lLFe6_ARRUBXo_15ZORilS1hRdMREd84eQOLlO0ChieBPY0tSSiVqTaFZt3Q
  ```

- HTTP Requests

  Add signed authentication token to the headers of API requests:

  ```shell
  curl -i -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzMxMDUzODIsImlhdCI6MTUyNTMyOTM4MiwianRpIjoiZDcwMjdiOWUtNzcxYy00ZDA5LTlkMjQtNGVlYjc5YmJhNGM2Iiwic2lkIjoiYTM0YzA3YTktNzU1ZC00YjU0LTk0YzUtZTQ1ZTlhMmRkNDNlIiwic2lnIjoiNzEyNjY0ZmE4NDI4ZWM4Njg5MjA3YzdhOWE1MTNlMzlhNTk2MWMxODQwNmVkOTlkMzViNzNmMTIyYTdlOWIwMyIsInVpZCI6IjA2YWVkMWUzLWJkNzctNGE1OS05OTFhLTViYjVhZTZmYmIwOSJ9.FZryq34iN5TSxG4eMhYe4oe56IR5E_PaiKxIqwlIrAExg8ghJ5uXmOAg6_9V6lWXjl4ZIDuadQ5mGMNqxJfrj0kYS9Tb5dJUzA4xKKqbUXmPsk4VFLyFLg3CJUJmgQqpL62doHSW_0T9EA7W03tLTQZ-nbjhpca7eK3U-KRgK-E" "https://mixin-api.zeromesh.net/me"
  ```

### API Responses

The HTTP status codes returned by the Mixin APIs meet the RFC specifications.

On success:

```json
{
    "data": {}
}
```

On error:

```json
{  
  "error":{
    "status": 500,
    "code": 500,
    "description":"Internal Server Error"
  }
}
```

For more, please refer to error code [Document](./error-codes)。