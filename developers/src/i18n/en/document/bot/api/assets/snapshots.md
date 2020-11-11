# Snapshots

- Get all transfer

  `GET /snapshots?limit=&offset=` 

- Get transfers by asset

  `GET /snapshots?limit=&offset=&asset=` 

- Get transfers by opponent

  `GET /snapshots?limit=&offset=&opponent=` 

- Get transfers by destination

  `GET /snapshots?limit=&offset=&destination=&tag=` 

| Name | Description |
| :----- | :---- |
| limit | Max 500 |
| offset | format RFC3339Nano, UTC: `2020-12-12T12:12:12.999999999Z` |
| asset | OPTION, return all network snapshots or specific asset snapshots. |
| opponent | OPTION |
| destination | OPTION |
| tag | OPTION |

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
