```json
{
  "id": "UUID",
  "action": "CREATE_MESSAGE",
  "params": {
    "conversation_id": "UUID",
    "category": "PLAIN_AUDIO",
    "status": "SENT",
    "message_id": "UUID",
    "data": "Base64 encoded data"
  }
}
```

```json title="data"
{
  "attachment_id": "Read From POST /attachments",
  "mime_type": "audio/ogg",
  "size": 1024,
  "duration": 60,
  "waveform": "QIQQSA...AAIAA"
}
```