# Chains

The API returns the list of all public chains supported by Mixin, no permission needed.

### `GET /network/chains` 

```
$$XIN:curl$$ "https://api.mixin.one/network/chains"
```

```json
{  
  "data":[
  {
    "type": "chain",
    "chain_id": "c6d0c728-2624-429b-8e0d-d9d19b6592fa",
    "name": "Bitcoin",
    "icon_url": "https://mixin-images.zeromesh.net/HvYGJsV5TGeZ-X9Ek3FEQohQZ3fE9LBEBGcOcn4c4BNHovP4fW4YB97Dg5LcXoQ1hUjMEgjbl1DPlKg1TW7kK6XP=s128",
    "managed_block_height": 663798,       // The public chain height synchronized by Minxin.
    "deposit_block_height": 663795,       // The public chain height where Mixin handles the deposit.
    "external_block_height": 663798,      // Third party API block height.
    "threshold": 3,                       // Deposit required comfirmations.
    "withdrawal_pending_count": 1,        // The amount being withdrawn.
    "withdrawal_timestamp": "2020-12-31T07:17:08.061836303Z",
    "withdrawal_fee": "6.75645",          // Withdrawal Fee.
    "is_synchronized": true               // Whether the node data synchronization of the current public chain normal.
  },
  ...
  ]
}
```