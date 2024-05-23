```json title="Response"
{
  "data": [
    {
      "snapshot_id": "SNAPSHOT-UUID",
      "user_id": "USER-UUID",
      "opponent_id": "OPPONENT-UUID-OPTIONAL",
      "transaction_hash": "KERNEL-HASH",
      "asset_id": "ASSET-UUID",
      "kernel_asset_id": "ASSET-HASH",
      "amount": "NUMBER",
      "memo": "EXTRA-HEX-ENCODING",
      "request_id": "REQUEST-UUID",
      "created_at": "RFC3339NANO",

      "inscription_hash": "INSCRIPTION-HASH",
      "deposit": {
          "deposit_hash": "DEPOSIT-HASH",
          "deposit_index": 1,
          "sender": "SOME-STRING",
      },
      "withdrawal": {
          "withdrawal_hash": "WITHDRAWAL-HASH",
          "receiver": "SOME-STRING",
      },
    }
  ]
}
```
