# 批量发送已达状态

通过 WebSocket 接收消息后需要告诉 Mixin 的消息服务器已经收到了，否则会一直推送该消息。

### `POST /acknowledgements`

请求 Body 数据 `[{"message_id": "UUID", "status": "READ"},...]`，每次最多提交 100 条。

```
$$XIN:curl$$ "https://api.mixin.one/attachments" -XPOST --data '[{"message_id":"928c5c40-769c-3e97-8387-fb1ae0645311", "status":"READ"}]'
```

```
{   }
```
