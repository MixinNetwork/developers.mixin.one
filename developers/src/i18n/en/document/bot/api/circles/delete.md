# Deleting

To help users delete circles, the `CIRCLES:WRITE` permission is required.

### `POST /circles/:id/delete`

curl demo:

```
$$XIN:curl$$ "https://api.mixin.one/circles/a465ffdb-4441-4cb9-8b45-00cf79dfbc46/delete"
```

An empty json will be returned on success.

---
Note that deleting a circle will not delete the conversations and chat history under the circle.
