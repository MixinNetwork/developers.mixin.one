---
title: Delete Circles
sidebar_position: 4
---

## POST /circles/:id/delete

To delete circles, the `CIRCLES:WRITE` permission is required.

:::info
Note that deleting a circle will not delete the conversations and chat history under the circle.
::

```bash
$$XIN:curl$$ "https://api.mixin.one/circles/a465ffdb-4441-4cb9-8b45-00cf79dfbc46/delete"
```

An empty json will be returned on success.

