# 提现地址

获取某个资产的所有提现地址, 注意事项：

- 地址详情里，同时会返回，手续费，保留值，最小提现金额等, 并不是所有链都会有值，可以针对使用
- 内部地址，没有手续费

### `GET /assets/:id/addresses` 

```
$$XIN:curl$$ "https://api.mixin.one/assets/43d61dcd-e413-450d-80b8-101d5e903357/addresses"
```

```json
{
  "data":[
    {
      "type":"address",
      "address_id":"e1524f3c-2e4f-411f-8a06-b5e1b1601308",
      "asset_id":"43d61dcd-e413-450d-80b8-101d5e903357",
      "destination":"0x86Fa049857E0209aa7D9e616F7eb3b3B78ECfdb0",
      "tag": "",
      "label":"Eth Address",
      "fee":"0.016",
      "reserve":"0",
      "dust": "0.0001",
      "updated_at":"0001-01-01T00:00:00Z"
    },
    ...
  ]
}
```
