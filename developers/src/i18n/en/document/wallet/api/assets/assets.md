# Asset List

### `GET /assets` 

```
$$XIN:curl$$ "https://api.mixin.one/assets"
```

```json
{
  "data":[{
    "type":"asset",
      "asset_id":"3596ab64-a575-39ad-964e-43b37f44e8cb",
      "chain_id":"43d61dcd-e413-450d-80b8-101d5e903357",  // The public chain.
      "symbol":"eosDAC",
      "name":"eosDAC Community Owned EOS Block Producer ERC20 Tokens",
      "icon_url":"https://images.mixin.one/HovctUnrBkLPlDotWvWPsIuFb8qKrLddwF5-f2Fi9q9uO829YB2qGITgOd2YmTMKnGg_z9XrVYzEwFE_rD_REz9C=s128",
      "balance":"203.975",
      "destination":"0x2CEab41716F4ce0Db36B6FdABEdc6a0BE5DC442B",// Deposit address.
      "tag": "",                            
      "price_btc":"0",
      "price_usd":"0",                      // Price in USD.
      "change_btc": "1",
      "change_usd": "2",
      "asset_key": "",
      "confirmations": 10,                  // Required confirmations to complete a deposit.
      "capitalization": 1000.3              // Balance market value.
  },
  ...
  ]
}
```

**This interface will only return a list of assets with a balance greater than 0, and an empty list will be returned when a user is new.**