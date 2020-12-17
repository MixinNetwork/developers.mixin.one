# 设置群组所属圈子

设置某个群组所属的圈子，可以把群组加入某个圈子或者从某个圈子中移除，需要 `CIRCLES:WRITE` 权限。

### `POST /conversations/:id/circles`

请求 Body 数据

| 参数 | 类型 | 介绍 |
| :----- | :----: | :---- |
| circle_id | String | 圈子 Id |
| action | String | 更新操作，`ADD` 或 `REMOVE` |

curl 示例

```
$$XIN:curl$$ "https://api.mixin.one/conversations/928c5c40-769c-3e97-8387-fb1ae0645311/circles -XPOST --data '{"circle_id": "a465ffdb-4441-4cb9-8b45-00cf79dfbc46", "action": "ADD"}'
```

返回群组所属的圈子列表

```json
{
  "data":[
    {
      "circle_id":"a465ffdb-4441-4cb9-8b45-00cf79dfbc46",
      "user_id":"06aed1e3-bd77-4a59-991a-5bb5ae6fbb09",
      "name":"Friends",
      "created_at":"2018-05-29T09:31:04.202186212Z"
    },
    ...
  ]
}
```

注意同一个群组最多只能加 5 个圈子，超过会报 20133 的错误。