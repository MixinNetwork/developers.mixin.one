# Creating Addresses

### `POST /addresses` 

The HTTP request body:

| Name | Type | Description |
| :----- | :---- | :---- |
| asset_id | UUID String | Asset ID. |
| label | String | Label for the address. |
| destination | String | Withdrawal address. |
| tag | String | Withdrawal memo. |
| pin | String | Encrypted PIN. |

```
$$XIN:curl$$ "https://api.mixin.one/addresses" -XPOST --data '{"asset_id":"43d61dcd-e413-450d-80b8-101d5e903357","label":"Jason ETH Address","pin":"nRF5OyFmO4REG6lcPk1jwKDJrENim791uLe+HH0g7EwQHXK9FgCMJl5RDKbeCNDW","destination":"0x86fa049857e0209aa7d9e616f7eb3b3b78ecfdb0", "tag": "", "label": ""}'
```

```json
{
  "data":{
    "type":"address",
    "address_id":"e1524f3c-2e4f-411f-8a06-b5e1b1601308",
    "asset_id":"43d61dcd-e413-450d-80b8-101d5e903357",
    "destination":"0x86Fa049857E0209aa7D9e616F7eb3b3B78ECfdb0",
    "tag": "",
    "label":"Eth Address",
    "fee":"0.016",
    "reserve":"0",
    "dust":"0.0001",
    "updated_at":"2018-07-10T03:58:17.5559296Z"
  }
}
```