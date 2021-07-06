# Batch Messages

### `POST /messages`

Request body data is a message array:

```json
[
  $$XIN:message$$
]
```

A maximum of 100 messages can be sent in batch each time, and the message body cannot exceed 128Kb. It is recommended to limit the size of a single message, for example:

```
$$XIN:curl$$ "https://api.mixin.one/attachments" -X POST
```

Returns empty JSON on success.

**This interface is only used for batch messaging by bots.**
