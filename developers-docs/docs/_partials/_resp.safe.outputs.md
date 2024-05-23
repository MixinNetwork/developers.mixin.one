```json title="Response"
{
  "data": [
    {
        "output_id": "OUTPUT-UUID",
        "transaction_hash": "KERNEL-HASH",
        "output_index": "KERNEL-OUTPUT-INDEX",
        "amount": "NUMBER",
        "mask": "KERNEL-MASK-KEY",
        "keys": "KERNEL-PUBLIC-KEYS",
        "senders_hash": "SENDERS-HASH-OPTIONAL",
        "senders_threshold": "SENDERS-THRESHOLD-OPTIONAL",
        "senders": "SENDERS-UUID-LIST-OPTIONAL",
        "receivers_hash": "MEMBERS-HASH",
        "receivers_threshold": "MEMBERS-THRESHOLD",
        "receivers": "MEMBERS-UUID-LIST",
        "extra": "EXTRA-HEX-ENCODING",
        "state": "unspent|spent|signed",
        "sequence": 12345,
        "created_at": "RFC3339NANO",
        "updated_at": "RFC3339NANO",
        "inscription_hash": "INSCRIPTION-HASH",
        "signers": "SIGNERS-UUID-LIST-OPTIONAL",
        "request_id": "REQUEST-UUID",
        "kernel_asset_id": "KERNEL-ASSET-ID",
        "signed_by": "KERNEL-TRASACTION-HASH-OPTIONAL",
        "signed_at": "RFC3339NANO-OPTIONAL",
        "spent_at": "RFC3339NANO-OPTIONAL"
    }
  ]
}
```
