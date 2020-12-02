# Read Multisigs Outputs

All mutlisig utxo outputs of the user. The outputs use to build a transaction.

`Members` refers to the members who own the output, and `threshold` refers to the number of member signatures required to spend this output.

### Restriction

Only the outputs with the same members and threshold can be used in the one transaction, meanwhile their state are unspent.

### `GET /multisigs/outputs?limit=&offset&state=` 

| Name | Type | Description |
| :----- | :----: | :---- |
| members | String | OPTION, SHA3-256 of members|
| threshold | Integer | OPTION |
| state | String | OPTION, unspent, signed, spent |
| offset | String | format RFC3339Nano, UTC: `2020-12-12T12:12:12.999999999Z` |
| limit | Integer | OPTION, default 500 |

```
// generate hash of the members
func hashMembers(ids []string) string {
	sort.Slice(ids, func(i, j int) bool { return ids[i] < ids[j] })
	var in string
	for _, id := range ids {
		in = in + id
	}
	return crypto.NewHash([]byte(in)).String()
}
```

```
$$XIN:curl$$ "https://api.mixin.one//multisigs/outputs?limit=500&offset=2006-01-02T15:04:05.999999999Z&state=spent"
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
