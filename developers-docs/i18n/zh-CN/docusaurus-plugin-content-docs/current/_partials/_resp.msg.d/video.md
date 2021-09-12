```json
{
  "id": "UUID",
  "action": "CREATE_MESSAGE",
  "params": {
    "conversation_id": "UUID",
    "category": "PLAIN_VIDEO",
    "status": "SENT",
    "message_id": "UUID",
    "data": "Base64 encoded data"
  }
}
```

```json title="data"
{
  "attachment_id": "Read From POST /attachments",
  "mime_type": "video/mp4",
  "width": 1024,
  "height": 1024,
  "size": 1024,
  "duration": 60,
  "thumbnail": "base64 encoded"
}
```