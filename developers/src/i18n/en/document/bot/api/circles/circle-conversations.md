# 查询圈子会话

获取授权用户某个圈子下面所有的会话，需要 `CIRCLES:READ` 权限。

### `GET /circles/:id/conversations?limit=&offset=`

| 参数 | 说明 |
| :----- | :---- |
| limit | 可选，分页每页数据，默认 500，最大 500 |
| offset | 可选，分页起始时间，例如 `2020-12-12T12:12:12.999999999Z` |

curl 示例

```
$$XIN:curl$$ "https://api.mixin.one/circles/a465ffdb-4441-4cb9-8b45-00cf79dfbc46/conversations"
```

返回数据

```json
{
  "data":[
    {
      "circle_id":"a465ffdb-4441-4cb9-8b45-00cf79dfbc46",
      "conversation_id":"e1524f3c-2e4f-411f-8a06-b5e1b1601308",
      "created_at":"2018-05-29T09:31:04.202186212Z"
    },
    ...
  ]
}
```