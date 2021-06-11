# Multisigs

Similar to uploading files, multisigs need to first generate a multi-signature request to obtain request_id, and then initiate the multi-signature operation.

### Generating Multisig Requests

```
POST /multisigs/requests
```

The HTTP request body:

| Parameter | Type | Description |
| :----- | :----: | :---- |
| action | String | Operations: sign, unlock. |
| raw | String | For transactions generated in accordance with the mainnet specifications, refer to the implementation in Go and JS provided by us[Code](https://github.com/MixinNetwork/multisig-bot/tree/master/src/utils) |

```
$$XIN:curl$$ "https://api.mixin.one/multisigs/requests --data '{"action": "sign", "raw": "298281....4952f95768b7d1a925c4189b912c343dbb000180e"}'
```

```json
{  
  "data":{  
    "type":"multisig_request",
    "request_id":"ab56be4c-5b20-41c6-a9c3-244f9a433f35",
    "user_id":"ab56be4c-5b20-41c6-a9c3-244f9a433f35",
    "asset_id":"43d61dcd-e413-450d-80b8-101d5e903357",
    "amount":"10",
    "threshold":"2",
    "senders": ["ab56be4c-5b20-41c6-a9c3-244f9a433f35", "ab56be4c-5b20-41c6-a9c3-244f9a433f35", "ab56be4c-5b20-41c6-a9c3-244f9a433f35"],
    "receivers": ["ab56be4c-5b20-41c6-a9c3-244f9a433f35", "ab56be4c-5b20-41c6-a9c3-244f9a433f35", "ab56be4c-5b20-41c6-a9c3-244f9a433f35"],
    "signers": ["ab56be4c-5b20-41c6-a9c3-244f9a433f35", "ab56be4c-5b20-41c6-a9c3-244f9a433f35", "ab56be4c-5b20-41c6-a9c3-244f9a433f35"],
    "memo":"hello",
    "action":"sign",
    "state": "spent",
    "transaction_hash": "298281....4952f95768b7d1a925c4189b912c343dbb000180e",
    "raw_transaction": "298281....4952f95768b7d1a925c4189b912c343dbb000180e",
    "created_at":"2018-05-03T10:08:34.859542588Z",
    "code_id":"ab56be4c-5b20-41c6-a9c3-244f9a433f35",
  }
}
```

### Initiating A Multi-signature

```
POST /multisigs/requests/:id/:action
```

The HTTP request body:

| Parameter | Type | Description |
| :----- | :----: | :---- |
| action | String | Operations: sign, cancel, and unlock. |
| pin | String | Encrypted PIN. |

```
$$XIN:curl$$ "https://api.mixin.one/multisigs/requests/:id/:action --data '{"pin": ""}'
```

```json
{  
  "data":{  
    "type":"multisig_request",
    "request_id":"ab56be4c-5b20-41c6-a9c3-244f9a433f35",
    "user_id":"ab56be4c-5b20-41c6-a9c3-244f9a433f35",
    "asset_id":"43d61dcd-e413-450d-80b8-101d5e903357",
    "amount":"10",
    "threshold":"2",
    "senders": ["ab56be4c-5b20-41c6-a9c3-244f9a433f35", "ab56be4c-5b20-41c6-a9c3-244f9a433f35", "ab56be4c-5b20-41c6-a9c3-244f9a433f35"],
    "receivers": ["ab56be4c-5b20-41c6-a9c3-244f9a433f35", "ab56be4c-5b20-41c6-a9c3-244f9a433f35", "ab56be4c-5b20-41c6-a9c3-244f9a433f35"],
    "signers": ["ab56be4c-5b20-41c6-a9c3-244f9a433f35", "ab56be4c-5b20-41c6-a9c3-244f9a433f35", "ab56be4c-5b20-41c6-a9c3-244f9a433f35"],
    "memo":"hello",
    "action":"sign",
    "state": "spent",
    "transaction_hash": "298281....4952f95768b7d1a925c4189b912c343dbb000180e",
    "raw_transaction": "298281....4952f95768b7d1a925c4189b912c343dbb000180e",
    "created_at":"2018-05-03T10:08:34.859542588Z",
    "code_id":"ab56be4c-5b20-41c6-a9c3-244f9a433f35",
  }
}
```

### Demo

- Initiate or participate in signing.

  ```json
  // Generate multisig request.
  POST /multisigs/requests
  {
    "action": "sign",
    "raw": "298281....000180e"
  }

  // Sign multisig request.
  POST /multisigs/requests/:id/sign
  ```

- Cancel my signature.

  ```json
  // Generate multisig request.
  POST /multisigs/requests
  {
    "action": "sign",
    "raw": "298281....000180e"
  }

  // Send multisig cancelling request.
  POST /multisigs/requests/:id/cancel
  ```

- Cancel multisigs.

  ```json
  // Generate multisig request.
  POST /multisigs/requests
  {
    "action": "unlock",
    "raw": "298281....000180e"
  }

  // Send multisig unlocking request.
  POST /multisigs/requests/:id/unlock
  ```
