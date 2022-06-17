```json title="body payload"

{
  "data": [
  {
    "type": "message",
    "message_id": "UUID",
    "recipient_id": "UUID",
    "state": "SUCCESS or FAILED", 
    "sessions": [
      {
        "session_id": "UUID",
        "public_key": "ed25519 public key",
      },
    ],
  },
    ...
  ]
}
```
