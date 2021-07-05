### 多签资产

少部分的资产目前还不支持多签，这个接口返回 Mixin Netwrok 里支持多重签名的资产列表, 另外所有 erc 20 的代币也都支持多签。

### `GET /network/assets/multisig` 

```
$$XIN:curl$$ "https://api.mixin.one/network/assets/multisig"
```

```json
{
  "data":{
    "assets":[  
    $$XIN:asset$$,
    ....
    ]
  }
}
```
