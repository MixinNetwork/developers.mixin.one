# Asset

Query public information of assets, permission-less access.

### `GET /network/assets/:id` 

```
$$XIN:curl$$ "https://api.mixin.one/network/assets/c94ac88f-4671-3976-b60a-09064f1811e8"
```

```json
{
  "data": {
    "amount": "296369.17400899",
    "asset_id": "c94ac88f-4671-3976-b60a-09064f1811e8",
    "chain_id": "43d61dcd-e413-450d-80b8-101d5e903357",
    "icon_url": "https://images.mixin.one/UasWtBZO0TZyLTLCFQjvE_UYekjC7eHCuT_9_52ZpzmCC-X-NPioVegng7Hfx0XmIUavZgz5UL-HIgPCBECc-Ws=s128",
    "name": "Mixin",
    "snapshots_count": 35224199,    // The transfer count of this assets.
    "symbol": "XIN",
    "type": "asset"
  }
}
```