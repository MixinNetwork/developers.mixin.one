# RSA 迁移到 Ed25519 

Mixin Network 最早是使用 RSA 加密解密一些信息的，但是 Ed25519 更加安全，速度更快，同时长度更短，所以就替换成了 Ed25519

从 RSA 升级到 Ed25519 主要涉及到 PIN 加密和 API 访问签名，本地生成 Ed25519 密钥后调用 `POST /session/secret` 接口成功即表示迁移成功，注意事项:

- 该过程不可逆，无法从 Ed25519 再回退至 RSA。
- 只针对老用户，新用户会直接用 Ed25519

### `POST /session/secret` 

| 参数 | 说明 |
| :----- | :---- |
| session_secret | base64 之后的 Ed25519 公钥 |

curl 示例

```
$$XIN:curl$$ "https://api.mixin.one/session/secret" -X POST --data '{"session_secret":"AAAAC3NzaC1lZDI1NTE5AAAAIB8Ht8Z3j6yDWPBHQtOp/R9rjWvfMYo3MSA/K6q8D86r"}'
```

返回数据

```json
{
  "data":[
  {
    "pin_token":""
  }
}
```
