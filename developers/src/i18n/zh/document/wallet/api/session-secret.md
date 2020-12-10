# RSA 迁移到 Ed25519 

从 RSA 升级到 Ed25519 主要涉及到 PIN 加密和 API 访问签名，本地生成 Ed25519 密钥后调用 `POST /session/secret` 接口成功即表示迁移成功，注意该过程不可逆，无法从 Ed25519 再回退至 RSA。

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
```