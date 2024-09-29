```json
{
  "id": "UUID",
  "action": "CREATE_MESSAGE",
  "params": {
    "conversation_id": "UUID",
    "category": "APP_CARD",
    "status": "SENT",
    "message_id": "UUID",
    "data": "Base64 encoded data"
  }
}
```

```json title="data"
{
  "app_id": "7404c815-0393-4ea3-b9f2-b08efe4c72da",
  "title": "Mixin", // less than 36 character
  "description": "Hello World.", // less than 1024 character
  "cover": {
    "mime_type": "image/png",
    "url": "https://example.com/cover.png",
    "width": 800,
    "height": 600,
    "thumbnail": "https://example.com/thumbnail.png"
  }, // Optional
  "actions": {
    "buttons": [
      {
        "label": "Open",
        "url": "https://mixin.one"
      }
    ]
  }, // Optional
  "shareable": true,
  "updated_at": "2024-09-28T15:49:14+10:00"
}
```
