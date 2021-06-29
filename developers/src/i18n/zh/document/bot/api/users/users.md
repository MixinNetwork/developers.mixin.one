# 批量获取用户

### `POST /users/fetch` 

请求 Body 数据 `["UUID","UUID","UUID"]` 为用户 ID 数组

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

**只返回存在的用户列表，有不存的会忽略**
