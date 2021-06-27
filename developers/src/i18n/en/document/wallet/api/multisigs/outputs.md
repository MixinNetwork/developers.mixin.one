# Reading

### `GET /multisigs/outputs` 

| Parameter | Type | Description |
| :----- | :----: | :---- |
| members | String | Optional, used together with threshold to participate in the hash of multi-signature members. |
| threshold | Integer | Optional, used with members, multi-signature threshold, for example, 2/3, threshold = 2 |
| state | String | Optional, the states of UTXO, e.g. unspent, signed, and spent.|
| limit | String | Optional, pagination per page data limit, 500 by default, maximally 500. |
| offset | String | Optional, pagination start time, RFC3339Nano format, e.g. `2020-12-12T12:12:12.999999999Z`. |

If an account participates in multiple multi-signatures, the data can be filtered through the `members` and `threshold` parameters. Code for generating the multi-signature member hash:

```golang
func hashMembers(ids []string) string {
	sort.Slice(ids, func(i, j int) bool { return ids[i] < ids[j] })
	var in string
	for _, id := range ids {
		in = in + id
	}
	return crypto.NewHash([]byte(in)).String()
}
```

A example:

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
    "threshold":"2",       // The number of members must reach the threshold to make a transaction effective.
    "members": ["ab56be4c-5b20-41c6-a9c3-244f9a433f35", "ab56be4c-5b20-41c6-a9c3-244f9a433f35", "ab56be4c-5b20-41c6-a9c3-244f9a433f35"], // The members participating the multi-signature.
    "memo":"hello",
    "state": "spent",
    "signed_tx": "298281....4952f95768b7d1a925c4189b912c343dbb000180e",
    "signed_by": "298281....4952f95768b7d1a925c4189b912c343dbb000180e",
    "created_at":"2018-05-03T10:08:34.859542588Z",
    "updated_at":"2018-05-03T10:08:34.859542588Z",
  }
}
```

`signed_tx` and `signed_by` have values when the state is signed. signed_by represents the transaction hash, and signed_tx is the complete transaction content, signed_by can help sort the corresponding waiting list of transactions.
