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
  "icon_url": "https://mixin.one/assets/98b586edb270556d1972112bd7985e9e.png",
  "title": "Mixin",
  "description": "Hello World.",
  "action": "https://mixin.one",
  "shareable": true
}
```