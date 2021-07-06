# Withdrawal

### `POST /withdrawals` 

The HTTP request body:

| Name | Type | Description |
| :----- | :----: | :---- |
| address_id | UUID String | Withdrawal address id. |
| amount | String | e.g. "100000" |
| pin | String | Encrypted Pin |
| trace_id | UUID String | Prevent duplicate withdrawals. |

```
$$XIN:curl$$ "https://api.mixin.one/withdrawals" -XPOST --data '{"amount":"100","address_id":"43d61dcd-e413-450d-80b8-101d5e903357","pin":"xDcSiAsvsekYpnxEShqLgecvQ4GhP7o660nOodK9BG7k+xsszxO56Yg6DQLWtOek","trace_id":"ca90fd5b-e047-4a66-affa-2b40f026b165"}'
```

```json
{  
  "data":{  
    "type":"withdrawal",
    "snapshot_id":"ab56be4c-5b20-41c6-a9c3-244f9a433f35",
    "transaction_hash":"axt..ze",
    "asset_id":"43d61dcd-e413-450d-80b8-101d5e903357",
    "amount":"-10",
    "trace_id":"7c67e8e8-b142-488b-80a3-61d4d29c90bf",
    "created_at":"2018-05-03T10:08:34.859542588Z"
  }
}
```