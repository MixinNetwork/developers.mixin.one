# Snapshots

To obtain the transfer records of a user, the `SNAPSHOTS:READ` permission is required.

- Get all transfer records.

  `GET /snapshots?limit=&offset=`

- Get all transfer records of an asset.

  `GET /snapshots?limit=&offset=&asset=`

- Get the transfer records of a certain user.

  `GET /snapshots?limit=&offset=&opponent=`

- Get all withdrawal records of an address.

  `GET /snapshots?limit=&offset=&destination=&tag=`

| Parameter | Description |
| :----- | :---- |
| limit | Pagination per page data limit, 500 at most. |
| offset | Pagination start time, for example, `2020-12-12T12:12:12.999999999Z`. |
| asset | Optional, get the transfer records of an asset. |
| opponent | Optional, get the transfer records of a user or bot. |
| destination | Optional, get the withdrawal records of a certain address. |
| tag | Optional |

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

