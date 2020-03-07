---
title: Search Assets
category: Mixin Network
order: 35
---

Search assets by symbol or name, only popular assets will be list.

###### GET /network/assets/search/:q

| q | String |

```
// cURL Example
curl -i -H "Content-Type: application/json" "https://api.mixin.one/network/assets/search/eos"

```
```
// Sample Response
{  
  "data":[{  
    "type":"asset",
      "asset_id":"3596ab64-a575-39ad-964e-43b37f44e8cb",
      "chain_id":"43d61dcd-e413-450d-80b8-101d5e903357",
      "symbol":"EOS",
      "name":"eos",
      "icon_url":"https://images.mixin.one/HovctUnrBkLPlDotWvWPsIuFb8qKrLddwF5-f2Fi9q9uO829YB2qGITgOd2YmTMKnGg_z9XrVYzEwFE_rD_REz9C=s128",
      "balance":"203.975",
      "destination":"0x2CEab41716F4ce0Db36B6FdABEdc6a0BE5DC442B",
      "tag": "",
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
