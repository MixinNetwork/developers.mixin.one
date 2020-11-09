# Read Multisigs Outputs

Read user’s multisigs outputs. 

### `GET /multisigs/outputs?limit=&offset&state=` 

| Name | Type | Description |
| :----- | :----: | :---- |
| limit | Integer | OPTION, default 500 |
| offset | String | format RFC3339Nano, UTC: `2020-12-12T12:12:12.999999999Z` |
| state | String | OPTION, unspent, signed, spent |

```
curl -i -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzMxMTk4MzMsImlhdCI6MTUyNTM0MzgzMywianRpIjoiNTk0ZTBhNmQtMWI2OC00NzQ4LTg2ZWYtYjM5MzQyMTY5ZGQ3Iiwic2lkIjoiYTM0YzA3YTktNzU1ZC00YjU0LTk0YzUtZTQ1ZTlhMmRkNDNlIiwic2lnIjoiMDJhYTE2MTNjMjVlOTNiMGI2OTE1MmUyNTYxOGIyMDQwMGFhYTYyYWIzNGYxYWM2NWJjYzQ2NmY0YjI0ZTM2MCIsInVpZCI6IjA2YWVkMWUzLWJkNzctNGE1OS05OTFhLTViYjVhZTZmYmIwOSJ9.O73fS4WJJG8sFy3heqZoBGTvkQH8iIswsmm6ZK-yRZZXPRQ_miqjB12Wyc-IzFiUqT_63MeH4PspQZ3I9DEie252eiaRluoLzIWPDeq0Wjsp_MtkX4J0nIluAGtQFLNAf8r6pJaT_qqleUieM4DyndIxlkHtloico0Zqp7b3Q3c" "https://api.mixin.one//multisigs/outputs?limit=500&offset=2006-01-02T15:04:05.999999999Z&state=spent"
```

```json
{  
  "data":{  
    "type":"multisig_utxo",
    "user_id":"ab56be4c-5b20-41c6-a9c3-244f9a433f35",
    "utxo_id":"a465ffdb-4441-4cb9-8b45-00cf79dfbc46",
    "asset_id":"43d61dcd-e413-450d-80b8-101d5e903357",
    "transaction_hash":"29828149577920ccc9d90768012f95768b7d1a925c4189b912c343dbb000180e",
    "output_index":0,
    "amount":"10",
    "threshold":"2",
    "members": ["ab56be4c-5b20-41c6-a9c3-244f9a433f35", "ab56be4c-5b20-41c6-a9c3-244f9a433f35", "ab56be4c-5b20-41c6-a9c3-244f9a433f35"],
    "memo":"hello",
    "state": "spent",
    "signed_tx": "298281....4952f95768b7d1a925c4189b912c343dbb000180e",
    "signed_by": "298281....4952f95768b7d1a925c4189b912c343dbb000180e",
    "created_at":"2018-05-03T10:08:34.859542588Z",
    "updated_at":"2018-05-03T10:08:34.859542588Z",
  }
}
```