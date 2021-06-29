# Asset Search

Search for popular assets by symbol or name, permission-less access.

### `GET /network/assets/search/:q` 

```
$$XIN:curl$$ "https://api.mixin.one/network/assets/search/eos"
```

```json
{  
  "data":[{  
    "type":"asset",
    "asset_id":"3596ab64-a575-39ad-964e-43b37f44e8cb",
    "chain_id":"43d61dcd-e413-450d-80b8-101d5e903357",
    "symbol":"EOS",
    "name":"eos",
    "icon_url":"https://images.mixin.one/HovctUnrBkLPlDotWvWPsIuFb8qKrLddwF5-f2Fi9q9uO829YB2qGITgOd2YmTMKnGg_z9XrVYzEwFE_rD_REz9C=s128",
    "price_btc":"0",
    "price_usd":"0"
    "change_btc": "1",
    "change_usd": "2",
    "asset_key": "",
    "confirmations": 10,
    "capitalization": 1000.3 
  },
  ...
  ]
}
```

**This interface only returns assets with icons or prices.**