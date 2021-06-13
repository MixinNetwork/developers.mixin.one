# 查询圈子详情

获取授权某个圈子详情，需要 `CIRCLES:READ` 权限。

### `GET /circles/:id`

curl 示例

```
$$XIN:curl$$ "https://api.mixin.one/circles/a465ffdb-4441-4cb9-8b45-00cf79dfbc46"
```

返回数据

```json
{
  "circle_id":"a465ffdb-4441-4cb9-8b45-00cf79dfbc46",
  "name":"Friends",
  "created_at":"2018-05-29T09:31:04.202186212Z"
}
```