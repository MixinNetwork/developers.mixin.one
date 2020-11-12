### External Transactions

Read external transactions (pending deposits) by `destination`, `tag` and `asset_id`.

### `GET /external/transactions?asset=&destination=&tag=&limit=&offset=` 

| Name | Type | Description |
| :----- | :----: | :---- |
| asset | UUID String | OPTION |
| destination | String | OPTION |
| tag | String | OPTION |
| limit | String | Max 500 |
| offset | String | format RFC3339Nano, e.g.: 2006-01-02T15:04:05.999999999Z |

```
$$XIN:curl$$ "https://api.mixin.one/external/transactions?destination=1AK4LYE6PYwBmSYHQX3v2UsXXHTvCAsJeK"
```

```json
{
  "data":[{
    "type":"transaction",
    "transaction_id":"ab56be4c-5b20-41c6-a9c3-244f9a433f35",
    "transaction_hash":"axt..ze",
    "sender":"137FkAtj1KcVKKt4tPeP1Djz3Nvc5DEYri",
    "amount":"10.0",
    "destination":"1AK4LYE6PYwBmSYHQX3v2UsXXHTvCAsJeK",
    "tag":"",
    "asset_id":"43d61dcd-e413-450d-80b8-101d5e903357",
    "chain_id":"43d61dcd-e413-450d-80b8-101d5e903357",
    "confirmations":1,
    "threshold":12,
    "created_at":"2018-05-03T10:08:34.859542588Z"
  },
    ...
  ]
}
```