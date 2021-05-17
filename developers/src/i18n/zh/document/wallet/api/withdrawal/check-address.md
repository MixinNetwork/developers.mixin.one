# Mixin 钱包地址检查

Mixin Network 内部转帐无需手续费, 所以转帐前可以通过这个 API 检查一下这个地址是否是 Mixin Wallet 的

### `GET /external/addresses/check?asset=&destination=&tag=` 

asset 是资产的 UUID, destination 是 bitcoin 的公钥 (例如：1JXjQJ4tK7fsKf1biCisD4yKdm5PbWXkoD) 或者 EOS 的帐号名称(例如 eoswithmixin), tag 对 bitcoin 来说是可以为空的，对 eos 来说是备注.

```
$$XIN:curl$$ "https://api.mixin.one/external/addresses/check?asset=c6d0c728-2624-429b-8e0d-d9d19b6592fa&destination=1JXjQJ4tK7fsKf1biCisD4yKdm5PbWXkoD&tag="
```

```json
{
  "data": {
    "destination": "1JXjQJ4tK7fsKf1biCisD4yKdm5PbWXkoD",
    "tag": "",
  }
}
```
