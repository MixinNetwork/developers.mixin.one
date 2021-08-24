---
title: Read Users
sidebar_position: 2
---

import RespUser from '../../_particles/_resp.user.md'

## POST /users/fetch

HTTP body data, `["UUID","UUID","UUID"]` is a array of user IDs.

```bash
$$XIN:curl$$ "https://api.mixin.one/users/fetch" -X POST --data '["06aed1e3-bd77-4a59-991a-5bb5ae6fbb09"]'
```

<RespUser />

**Only return the list of existing users, and ignore those that do not exist**

