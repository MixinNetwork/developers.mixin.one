---
title: Withdrawal
category: Transfer
order: 10
---

Get assets out of Mixin Network, neet to [create an address]({{site.baseurl}}/alpha-mixin-network/create-address/) for withdrawal.

###### POST /withdrawals 

| address_id | String: UUID |
| amount | String: e.g. "100000" |
| pin | String: Encrypted Pin |
| trace_id | String: UUID |
| memo | TEXT: less than 140 charactars |

```
// cURL Example
curl -i -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzMxMTg3MzQsImlhdCI6MTUyNTM0MjczNCwianRpIjoiN2I0MDk4NzctYmUwZS00OTIxLThmNDMtYjM1OTEwNGY2YjM5Iiwic2lkIjoiYTM0YzA3YTktNzU1ZC00YjU0LTk0YzUtZTQ1ZTlhMmRkNDNlIiwic2lnIjoiMTk0Y2U2ZTNkMTllODZiZDQ5NmQ0OTMwNGIxNzhkNzA5Y2JlNWFiOWFkYTE4ZjUxYmQ2YjJjMjdiNTk4NzQwYSIsInVpZCI6IjA2YWVkMWUzLWJkNzctNGE1OS05OTFhLTViYjVhZTZmYmIwOSJ9.Uzj-M3XeD-vWwIEb6NQ0MfVvp14mUTpKK5HLc3xtPU7W5pQws9zsR7uCJTOSHYO1_ZpbTB3Vky0L5IEXafJ7eWVBO7GFqeI-2Tiy0qEiYSkPLBbQiSZ3_WLrUKfb4-EaLeekM-FLxLQR_qnSQQsy88MVOVLqrgDhetffx0GoYhM" "https://api.mixin.one/withdrawals" -XPOST --data '{"amount":"100","address_id":"43d61dcd-e413-450d-80b8-101d5e903357","memo":"hello","pin":"xDcSiAsvsekYpnxEShqLgecvQ4GhP7o660nOodK9BG7k+xsszxO56Yg6DQLWtOek","trace_id":"ca90fd5b-e047-4a66-affa-2b40f026b165"}'
```
```
// Sample Response
{  
  "data":{  
    "type":"withdrawal",
    "snapshot_id":"ab56be4c-5b20-41c6-a9c3-244f9a433f35",
    "transaction_hash":"axt..ze",
    "asset_id":"43d61dcd-e413-450d-80b8-101d5e903357",
    "amount":"-10",
    "trace_id":"7c67e8e8-b142-488b-80a3-61d4d29c90bf",
    "memo":"hello",
    "created_at":"2018-05-03T10:08:34.859542588Z"
  }
}
```
