# Transfer

### `POST /transfers` 

The HTTP request body:

| Name | Type | Description |
| :----- | :---- | :---- |
| asset_id | UUID String | Asset ID |
| opponent_id | UUID String | Receiver |
| amount | String | e.g.: "0.01", supports up to 8 digits after the decimal point |
| pin | String | Encrypted PIN |
| trace_id | UUID String | Optional, used to prevent duplicate payment |
| memo | UUID String | Optional, maximally 200 characters |

```
$$XIN:curl$$ "https://api.mixin.one/transfers" -XPOST --data '{"amount":"10","asset_id":"43d61dcd-e413-450d-80b8-101d5e903357","opponent_id":"a465ffdb-4441-4cb9-8b45-00cf79dfbc46","memo":"hello","pin":"F39IsJmUaZW03VMV/01lHyY2RCoZ7/X764akX+EmthIc4uVsWAWQTM/IxX5Z9C1y","trace_id":"7c67e8e8-b142-488b-80a3-61d4d29c90bf"}'
```

```json
{  
  "data":{  
    "type":"transfer",
    "snapshot_id":"ab56be4c-5b20-41c6-a9c3-244f9a433f35",
    "opponent_id":"a465ffdb-4441-4cb9-8b45-00cf79dfbc46",
    "asset_id":"43d61dcd-e413-450d-80b8-101d5e903357",
    "amount":"-10",
    "trace_id":"7c67e8e8-b142-488b-80a3-61d4d29c90bf",
    "memo":"hello",
    "created_at":"2018-05-03T10:08:34.859542588Z"
  }
}
```

### Precautions

- Once the transfer API is successfully called, it means that the data has been confirmed by all nodes, and the data is irreversible.
- One can't transfer money to himself.
- The encrypted PIN is one-time, and the PIN must be re-encrypted every time you transfer.
- It is strongly recommended that developers use `trace_id` to handle duplicate transfers, and always attach this parameter to transfers.
- All you need is to do it over again if you encounter 500 in a transfer.
- If you need to process a large number of concurrent transactions and process hundreds or thousands of transfers per second, it is recommended to use multiple accounts to transfer and send transactions.
- When a transfer error happens, pay attention to the "extra" field in the returned error message.
- If you see the error `20119` password is wrong when you are transferring, do not try again. It is recommended to call the [PIN Verification](../pin-verify) API to confirm.

