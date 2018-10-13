---
title: External Transactions
category: Mixin Network
order: 34
---

Read external transactions (pending deposits) by `public_key` and `asset_id`, use `account_tag` for EOS.

###### GET /external/transactions/:key?asset=43d61dcd-e413-450d-80b8-101d5e903357

| asset_id | String: UUID |

```
// cURL Example
curl -i -H "Content-Type: application/json" "https://api.mixin.one/external/transactions/1AK4LYE6PYwBmSYHQX3v2UsXXHTvCAsJeK"

```
```
// Sample Response
{
  "data":[{
    "type":"transaction",
      "transaction_id":"ab56be4c-5b20-41c6-a9c3-244f9a433f35",
      "transaction_hash":"axt..ze",
      "sender":"137FkAtj1KcVKKt4tPeP1Djz3Nvc5DEYri",
      "amount":"10.0",
      "confirmations":1,
      "threshold":12,
      "created_at":"2018-05-03T10:08:34.859542588Z"
  },
    ...
  ]
}
```
