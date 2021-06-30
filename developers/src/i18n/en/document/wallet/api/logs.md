# PIN Error Logs

Query the user PIN error log records, based on which developers can remind the user of the number of errors within 24 hours.

### `GET /logs?category=&limit=&offset=` 

| Parameter | Introduction |
| :----- | :---- |
| limit | Pagination limit, maximamlly 100. |
| offset | Pagination start time, e.g. `2020-12-12T12:12:12.999999999Z`. |
| category | Log type, set to a fixed `PIN_INCORRECT`. |

With curl:

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
