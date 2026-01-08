```json
{
  "id": "UUID",
  "action": "CREATE_MESSAGE",
  "params": {
    "conversation_id": "UUID",
    "category": "APP_BUTTON_GROUP",
    "status": "SENT",
    "message_id": "UUID",
    "data_base64": "Base64 encoded data"
  }
}
```

```json title="data"
[
  {
    "label": "Mixin Website", 1 <= label 长度 <= 36
    "color": "#ABABAB",
    "action": "https://mixin.one"
  }
  ... // 不能少于 1 个, 也不能大于 6 个
]
```
