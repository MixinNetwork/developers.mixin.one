# 转账记录

获取授权用户转账记录，需要 `SNAPSHOTS:READ` 权限。

- 获取所有转账记录

  `GET /snapshots?limit=&offset=` 

- 获取某个资产的所有转账记录

  `GET /snapshots?limit=&offset=&asset=` 

- 获取某个用户的转账记录

  `GET /snapshots?limit=&offset=&opponent=` 

- 获取某个地址的所有提现记录

  `GET /snapshots?limit=&offset=&destination=&tag=` 

| 参数 | 说明 |
| :----- | :---- |
| limit | 分页每页数据，最大 500 |
| offset | 分页起始时间，例如 `2020-12-12T12:12:12.999999999Z` |
| asset | 可选，筛选某个资产的转账记录 |
| opponent | 可选，筛选某个用户或机器人的转账记录 |
| destination | 可选，筛选某个某个地址的提现记录 |
| tag | 可选，与 tag 一同使用 |

```
$$XIN:curl$$ "https://api.mixin.one/snapshots?limit=10&offset=2018-05-29T16:30:24.845515732%2B08:00"
```

```json
{
  "data":[
    {
      $$XIN:...snapshot$$
      // Options only for user (or App) who has access.
      // "trace_id":"7c67e8e8-b142-488b-80a3-61d4d29c90bf",
      // "opponent_id":"a465ffdb-4441-4cb9-8b45-00cf79dfbc46",
      // "data":"Transfer!"
    },
  ...
  ]
}
```
