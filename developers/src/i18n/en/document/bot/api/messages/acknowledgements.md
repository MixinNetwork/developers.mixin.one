# Create Acknowledgements

Create plain ack messages through HTTP. the max array size is 100.

### `POST /acknowledgements`

`[{"message_id": "UUID", "status": "READ"},...]`

```
$$XIN:curl$$ "https://api.mixin.one/attachments" -XPOST --data '[{"message_id":"928c5c40-769c-3e97-8387-fb1ae0645311", "status":"READ"}]'
```

```
// Sample Response
{ }
```