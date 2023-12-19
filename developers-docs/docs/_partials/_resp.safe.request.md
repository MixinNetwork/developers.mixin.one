```json title="Response"
{
  "data": {
    "request_id": "UUID-REQUEST",
    "transaction_hash": "KERNEL-HASH",
    "asset": "KERNEL-ASSET-HASH",
    "amount": "NUMBER",
    "senders_hash": "SENDERS-HASH",
    "senders_threshold": 1,
    "senders": ["UUID-USER-1", "UUID-USER-2"],
    "signers": ["UUID-USER-1", "UUID-USER-2"],
    "extra": "",
    "state": "signed or spent",
    "raw_transaction": "",
    "created_at": "RFC3339NANO",
    "updated_at": "RFC3339NANO",
    "snapshot_hash": "SNAPSHOT-HASH",
    "snapshot_at": "RFC3339NANO",
    "receivers": [
        {
            "members": ["UUID-USER-1", "UUID-USER-2"],
            "members_hash": "MEMBERS-HASH",
            "threshold": 1
        },
    ],
    "views":[
        {
            "destination": "ADDRESS",
            "tag": "TAG",
            "withdrawal_hash": "WITHDRAWAL-HASH"
        }
    ] 
  }
}
```
