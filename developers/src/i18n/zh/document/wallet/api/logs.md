# 密码错误日志

查询用户密码错误日志记录，据此可提醒用户 24 小时内错误次数。

### `GET /logs?category=&limit=&offset=` 

| 参数 | 说明 |
| :----- | :---- |
| limit | 分页每页数据，最大 500 |
| offset | 分页起始时间，例如 `2020-12-12T12:12:12.999999999Z` |
| category | 日志类型，固定写 `PIN_INCORRECT` |

curl 示例

```
$$XIN:curl$$ "https://api.mixin.one/logs?category=PIN_INCORRECT&limit=5"
```

```json
{
  "data": {
    "log_id": "06aed1e3-bd77-4a59-991a-5bb5ae6fbb09",
    "ip_address": "124.64.120.192",
    "created_at": "2018-05-03T06:03:56.867971412Z"
  }
}
```