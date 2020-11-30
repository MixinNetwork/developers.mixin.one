# 返回当前用户的多签 UTXO

### `GET /multisigs/outputs?state=&limit=&offset` 

| 参数 | 类型 | 介绍 |
| :----- | :----: | :---- |
| members | String | 可选，与 threshold 一同使用，参与多签成员的 hash |
| threshold | Integer | 可选，与 members 一同使用，多签的门限值 |
| state | String | 可选，UTXO 的状态，unspent 未签名, signed 已签名, spent 已花费 |
| limit | String | 可选，分页每页数据，默认 500，最大 500 |
| offset | String | 可选，分页起始时间，RFC3339Nano 格式，例如 `2020-12-12T12:12:12.999999999Z` |

如果一个账户参与了多个多签，可通过 `members` 和 `threshold` 参数筛选数据，生成多签成员 hash 的代码：

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

调用例子

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
    "threshold":"2",       // 需要 threshold 个成员签名交易才会生效
    "members": ["ab56be4c-5b20-41c6-a9c3-244f9a433f35", "ab56be4c-5b20-41c6-a9c3-244f9a433f35", "ab56be4c-5b20-41c6-a9c3-244f9a433f35"], // 参与多签的成员
    "memo":"hello",
    "state": "spent",
    "signed_tx": "298281....4952f95768b7d1a925c4189b912c343dbb000180e",
    "signed_by": "298281....4952f95768b7d1a925c4189b912c343dbb000180e",
    "created_at":"2018-05-03T10:08:34.859542588Z",
    "updated_at":"2018-05-03T10:08:34.859542588Z",
  }
}
```
`signed_tx` 和 `signed_by` 在 state 为 signed 时有值， signed_by 代表交易的 transaction hash，而 signed_tx 则是完整的交易内容，signed_by 可以帮助分类相应的等待完成交易列表。