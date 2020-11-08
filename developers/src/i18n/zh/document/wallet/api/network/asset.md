### 资产详情

查询资产的公开信息，无需授权访问

### `GET /network/assets/:id` 

```
curl -i --header "Content-Type: application/json" "https://api.mixin.one/network/assets/c94ac88f-4671-3976-b60a-09064f1811e8"
```

```json
{
  "data": {
    "amount": "296369.17400899",
    "asset_id": "c94ac88f-4671-3976-b60a-09064f1811e8",
    "chain_id": "43d61dcd-e413-450d-80b8-101d5e903357",
    "icon_url": "https://images.mixin.one/UasWtBZO0TZyLTLCFQjvE_UYekjC7eHCuT_9_52ZpzmCC-X-NPioVegng7Hfx0XmIUavZgz5UL-HIgPCBECc-Ws=s128",
    "name": "Mixin",
    "snapshots_count": 35224199,    // 该资产总转账数
    "symbol": "XIN",
    "type": "asset"
  }
}
```