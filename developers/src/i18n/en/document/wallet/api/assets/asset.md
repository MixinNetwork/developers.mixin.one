# Asset Details

Reading one asset by `asset_id`.

### `GET /assets/:id` 

```
$$XIN:curl$$ "https://api.mixin.one/assets/3596ab64-a575-39ad-964e-43b37f44e8cb"
```

```json
{
  "data":{
    "type":"asset",
    "asset_id":"3596ab64-a575-39ad-964e-43b37f44e8cb",
    "chain_id":"43d61dcd-e413-450d-80b8-101d5e903357",
    "symbol":"eosDAC",
    "name":"eosDAC Community Owned EOS Block Producer ERC20 Tokens",
    "icon_url":"https://images.mixin.one/HovctUnrBkLPlDotWvWPsIuFb8qKrLddwF5-f2Fi9q9uO829YB2qGITgOd2YmTMKnGg_z9XrVYzEwFE_rD_REz9C=s128",
    "balance":"203.975",
    "destination":"0x2CEab41716F4ce0Db36B6FdABEdc6a0BE5DC442B",
    "tag": "",
    "price_btc":"0",
    "price_usd":"0"
    "change_btc": "1",
    "change_usd": "2",
    "asset_key": "",
    "mixin_id": "b6b8d99b7cecf810980aaeef17a48f82ed573f2552517d4932d195181bc6ba11",
    "confirmations": 10,
    "capitalization": 1000.3
  }
}
```