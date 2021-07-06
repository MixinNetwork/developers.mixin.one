# Top 100 Assets

Query the list of the top 100 assets on the entire network, permission-less access.

### `GET /network/assets/top` 

```
$$XIN:curl$$ "https://api.mixin.one/network/assets/top"
```

```json
{  
  "data":{  
    "assets":[  
    {  
      "type": "asset",
      "asset_id": "c6d0c728-2624-429b-8e0d-d9d19b6592fa",
      "chain_id": "c6d0c728-2624-429b-8e0d-d9d19b6592fa",
      "symbol": "BTC",
      "name": "Bitcoin",
      "icon_url": "https://mixin-images.zeromesh.net/HvYGJsV5TGeZ-X9Ek3FEQohQZ3fE9LBEBGcOcn4c4BNHovP4fW4YB97Dg5LcXoQ1hUjMEgjbl1DPlKg1TW7kK6XP=s128",
      "price_btc": "1",
      "price_usd": "14996.98",
      "change_btc": "0",
      "change_usd": "-0.03773542533280206",
      "asset_key": "c6d0c728-2624-429b-8e0d-d9d19b6592fa",
      "mixin_id": "fe6b7788944d328778f98e3e81588215b5a07de4f9a4a7de4db4535b404e65db",
      "reserve": "0",
      "confirmations": 3,
      "capitalization": 144241811.6455701,    // Market cap.
      "liquidity": "9618.05721189"            // The amount of this asset in Minxin.
    },
      ....
    ]
  }
}
```