# Getting Snapshot by Trace

### `GET /transfers/trace/:id` 

Obtaining a transfer record by `trace` requires the `ASSETS:READ` permissions. Note that this interface can only be used to query transfers, not deposits or withdrawals.

```
$$XIN:curl$$ "https://api.mixin.one/transfers/trace/7c67e8e8-b142-488b-80a3-61d4d29c90bf"
```

```json
{
  "data": $$XIN:transfer$$
}
```

**If the transfer does not belong the current user, 403 will be returned, and 404 if the record is not found**
