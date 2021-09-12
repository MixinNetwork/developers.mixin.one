```json
{
  "id": "UUID",
  "action": "CREATE_MESSAGE",
  "params": {
    "conversation_id": "UUID",
    "category": "PLAIN_DATA",
    "status": "SENT",
    "message_id": "UUID",
    "data": "Base64 encoded data"
  }
}
```

```json title="data"
{
  "attachment_id": "Read From POST /attachments",
  "mime_type": "application/pdf",
  "size": 1024,
  "name": "2020-12-12.pdf"
}
```