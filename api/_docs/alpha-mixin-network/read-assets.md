---
title: Read Assets
category: Mixin Network
order: 21
---

Read user's all assets. Deposit address maybe not return in this api, use `/assets/:id` to fetch deposit address.

###### GET /assets

```
// cURL Example
curl -i -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzMxMTE5MDYsImlhdCI6MTUyNTMzNTkwNiwianRpIjoiZjdmMjRjMjQtYmQ0MC00ZDhlLTgyNzktOWRjNDgzYjNiYzEwIiwic2lkIjoiYTM0YzA3YTktNzU1ZC00YjU0LTk0YzUtZTQ1ZTlhMmRkNDNlIiwic2lnIjoiZWQ0MDU4OTk4YmU1ODA1ZGRkOGMzOWQ3ZmVkM2NiNDk5YjIzMzI1Y2QyMTk1OWNiZDExNzJkYzc3MmEzZDYxYyIsInVpZCI6IjA2YWVkMWUzLWJkNzctNGE1OS05OTFhLTViYjVhZTZmYmIwOSJ9.FRu1IBx-p2YfptDzPWwMh5rurSo6ieiPBL2y_CPYzOR8TSsh7iAQwjcZKlB0GUSKsde9r80UQQo8W1bwN8Od852AoKbUp3qg8l-fXeyIxM3C2l1dp0VK8CATGdXLRm7MKemq7AI-tuO6BL78eqQALAEEIy-YAp8XmMrqQ72JslU" "https://api.mixin.one/assets"
```

```
// Sample Response
{  
  "data":[{  
    "type":"asset",
      "asset_id":"3596ab64-a575-39ad-964e-43b37f44e8cb",
      "chain_id":"43d61dcd-e413-450d-80b8-101d5e903357",
      "symbol":"eosDAC",
      "name":"eosDAC Community Owned EOS Block Producer ERC20 Tokens",
      "icon_url":"https://images.mixin.one/HovctUnrBkLPlDotWvWPsIuFb8qKrLddwF5-f2Fi9q9uO829YB2qGITgOd2YmTMKnGg_z9XrVYzEwFE_rD_REz9C=s128",
      "balance":"203.975",
      "public_key":"0x2CEab41716F4ce0Db36B6FdABEdc6a0BE5DC442B",
      "account_name": "",
      "account_tag": "",
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
