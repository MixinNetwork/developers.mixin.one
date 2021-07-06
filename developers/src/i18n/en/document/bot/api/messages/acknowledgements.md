# Acknowledgements

After receiving the message via WebSocket, you need to tell Mixin's message server that it has been delivered, otherwise it will keep pushing the message.

### `POST /acknowledgements`

Request body data `[{"message_id": "UUID", "status": "READ"},...]`, submit up to 100 entries each time.

```
$$XIN:curl$$ "https://api.mixin.one/attachments" -XPOST --data '[{"message_id":"928c5c40-769c-3e97-8387-fb1ae0645311", "status":"READ"}]'
```

```
{   }
```
