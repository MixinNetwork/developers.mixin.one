# Users

### `POST /users/fetch` 

HTTP body data, `["UUID","UUID","UUID"]` is a array of user IDs.

```
$$XIN:curl$$ "https://api.mixin.one/users/fetch" -X POST --data '["06aed1e3-bd77-4a59-991a-5bb5ae6fbb09"]'
```

```json
{
  "data": [   
     $$XIN:user$$,
     ...
  ]
}
```

**Only return the list of existing users, and ignore those that do not exist**

