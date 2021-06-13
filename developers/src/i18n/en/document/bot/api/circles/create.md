# 创建圈子

帮授权用户创建圈子，需要 `CIRCLES:WRITE` 权限。

### `POST /circles`

请求 Body 数据

| 参数 | 类型 | 介绍 |
| :----- | :----: | :---- |
| name | String | 圈子名称 |

curl 示例

```
$$XIN:curl$$ "https://api.mixin.one/circles -XPOST --data '{"name": "Friends"}'
```

返回数据

```json
{
  "circle_id":"a465ffdb-4441-4cb9-8b45-00cf79dfbc46",
  "name":"Friends",
  "created_at":"2018-05-29T09:31:04.202186212Z"
}
```