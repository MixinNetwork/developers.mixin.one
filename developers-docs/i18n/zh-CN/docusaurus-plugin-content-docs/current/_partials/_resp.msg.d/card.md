```json
{
  "id": "UUID",
  "action": "CREATE_MESSAGE"
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
  "title": "Mixin", // 1 <= title 的长度 <= 36
  "description": "Hello World.", // 1 <= description 的长度 <= 36
  "action": "https://mixin.one", // 需要在开发者后台 Resource Patterns 配置 action 的链接, 地址 https://developers.mixin.one/apps/700000xxxx
  "shareable": true
}
```
