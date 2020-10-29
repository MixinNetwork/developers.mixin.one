# 批量发送消息

### `POST /messages`

请求 Body 数据为消息数组：

```
  [
    {
      "conversation_id": "UUID",      
      "recipient_id": "UUID",           // 收消息的人
      "message_id": "UUID",
      "category": "",                   // 消息类型
      "representative_id": "UUID",      // 机器人代替用户发言，需要 MESSAGES:REPRESENT 权限，可用于聊天机器人
      "quote_message_id": "UUID",       // 回复某条消息
      "data": "Base64 encoded data",
    },
    ...
  ]
```

每次最多批量发送 100 条消息，消息 Body 不能超过 128Kb，建议限制单条消息大小，例如：

```
curl -i -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzMxMTYzNjEsImlhdCI6MTUyNTM0MDM2MSwianRpIjoiNDRhOGRiZDAtODU3NC00Y2VhLTk3NWEtYzI5OWIwZWQyMTk4Iiwic2lkIjoiYTM0YzA3YTktNzU1ZC00YjU0LTk0YzUtZTQ1ZTlhMmRkNDNlIiwic2lnIjoiN2IzMzEwYTQ2NjY5YzNkNWJkMjFkNjRlNWRhNTJjMmQ4M2MzYWFjNTUzMmU3OTdkMjAzMzY0NzE3MDhiMDJjOCIsInVpZCI6IjA2YWVkMWUzLWJkNzctNGE1OS05OTFhLTViYjVhZTZmYmIwOSJ9.LSoJ0iWCo1g71SC_SYDsY6ZobUxh2Ue0e0D7VC1-cRfudJHCjR00OM2LhrTTub6BB--BnplPWNYOuz8zdxdZwNhY0OpwEpeVg2zxW202MDlp_PW3nQP1U_wv6SvdtqzdM6JswL-GGhl2CEDEGN8iivUGwv54ouOv4U2pqR5IrBc" "https://api.mixin.one/attachments" -XPOST
```

发送成功返回空 JSON。

**本接口仅限用于机器人批量发消息。**