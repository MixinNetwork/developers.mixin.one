# Pending Deposits

Public network-wide deposit records, permission-less access.

### `GET /external/transactions?asset=&destination=&tag=&limit=&offset=` 

| Parameter | Type | Description |
| :----- | :----: | :---- |
| asset | UUID String | Optional, get the deposit records for a cerain asset. |
| destination | String | Optional, get the records of pending deposits for a certain address. |
| tag | String | Optional, mark the pending deposit records of an address, used with destination. |
| limit | String | Pagination per page data limit, 500 by default, maximally 500. |
| offset | String | Pagination start time, RFC3339Nano format, e.g. `2020-12-12T12:12:12.999999999Z`. |

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
