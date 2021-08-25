```json
{
  "id": "UUID",
  "action": "CREATE_MESSAGE",
  "params": {
    "conversation_id": "UUID",
    "category": "PLAIN_IMAGE",
    "status": "SENT",
    "message_id": "UUID",
    "data": "Base64 encoded data"
  }
}
```

```json title="data"
{
  "attachment_id": "read From POST /attachments",
  "mime_type": "image/jpeg",
  "width": 1024,
  "height": 1024,
  "size": 1024,
  "thumbnail": "base64 encoded"
}
```