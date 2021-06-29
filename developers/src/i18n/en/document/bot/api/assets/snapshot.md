# Getting Snapshot by ID

### `GET /snapshots/:id` 

Obtain a transfer record by ID, the `SNAPSHOTS:READ` permission is required.

```
$$XIN:curl$$ "https://api.mixin.one/snapshots/8f5b244e-cf86-4374-8eaa-c551fd70cd83"
```

```json
{  
  "data":{
    $$XIN:...snapshot$$
   // Options only for user (or App) who has access.
   // "trace_id":"7c67e8e8-b142-488b-80a3-61d4d29c90bf",
   // "opponent_id":"a465ffdb-4441-4cb9-8b45-00cf79dfbc46",
   // "data":"Transfer!"
   }
}
```

`type` parameter descriptions:

- **raw** Mainnet transfer.
- **deposit** As the name suggests.
- **transfer** As the name suggests.
- **withdrawal** As the name suggests.
- **fee** As the name suggests.
- **rebate** refund.

**If the transfer does not belong the current user, 403 will be returned, and 404 if the record is not found**

