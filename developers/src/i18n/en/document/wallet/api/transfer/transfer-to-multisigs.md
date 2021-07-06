# Transfer To Multi-signature Accounts

A transfer to a multi-signature account is a transfer from one user to multiple users.

### `POST /transactions` 

The HTTP request body:

| Name | Type | Description |
| :----- | :---- | :---- |
| asset_id | UUID String | Asset ID. |
| opponent_multisig | Object | Multi-signature `{ "receivers": ["userid", "userid", ...], "threshold": 3 }`. |
| amount | String | e.g.: "0.01", supports up to 8 digits after the decimal point. |
| pin | String | Encrypted PIN. |
| trace_id | UUID String | Optional, used to prevent duplicate payment. |
| memo | UUID String | Optional, maximally 140 characters. |

```
$$XIN:curl$$ "https://api.mixin.one/transactions" -XPOST --data '{"amount":"10","asset_id":"43d61dcd-e413-450d-80b8-101d5e903357","opponent_multisig":{"receivers": ["00c5a4ae-dcdc-48db-ab8e-a7eef69b441d","087e91ff-7169-451a-aaaa-5b3297411a4b","105f6e8b-d249-4b4d-9beb-e03cefaebc37"], "threshold": 2},"memo":"hello","pin":"F39IsJmUaZW03VMV/01lHyY2RCoZ7/X764akX+EmthIc4uVsWAWQTM/IxX5Z9C1y","trace_id":"7c67e8e8-b142-488b-80a3-61d4d29c90bf"}'
```

```json
{  
  "data":{  
    "type":"transfer",
    "snapshot_id":"ab56be4c-5b20-41c6-a9c3-244f9a433f35",
    "opponent_receivers":["00c5a4ae-dcdc-48db-ab8e-a7eef69b441d","087e91ff-7169-451a-aaaa-5b3297411a4b","105f6e8b-d249-4b4d-9beb-e03cefaebc37"],
    "opponent_threshold": 2,
    "asset_id":"43d61dcd-e413-450d-80b8-101d5e903357",
    "amount":"-10",
    "trace_id":"7c67e8e8-b142-488b-80a3-61d4d29c90bf",
    "memo":"hello",
    "created_at":"2018-05-03T10:08:34.859542588Z"
  }
}
```