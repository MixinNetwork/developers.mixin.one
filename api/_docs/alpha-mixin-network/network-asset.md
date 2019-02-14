---
title: Network Asset
category: Mixin Network
order: 31
---

Read public asset information by `asset_id` from Mixin Network.

###### GET /network/assets/:id

```
// cURL Example
curl -i --header "Authorization: Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzUyNjQ4MDUsImlhdCI6MTUyNzQ4ODgwNSwianRpIjoiZjhjMGY2OGItNzIwNC00ZmJmLTkzNWMtMTE5OGI4NTlmODhhIiwic2lkIjoiYWM2ZDFmODYtYTY0Yi00NWRkLTllZmEtN2JmMGVjZjI2MDU2Iiwic2lnIjoiYmJkYmMyMDM3MGM2YTI1NTJkZjVlOGRjMThhMGUwZjAxZDI5ZTBiNTZkZjAyYWFkNTkzZjc1ZGM4YTM0YTU1YyIsInVpZCI6IjMxYjFhMTdjLWFiMzgtNGFhNC05YmM5LWY0NjQyNzEyODExMyJ9.BQMByeL_RFdCD4HnmTsdu29IcIJcH6Vl2OynX99sfjQBkWNLSKTYeQy6jvpo5jkMMrm3pQS3QC_n4bOzU9BOT-GtATqf2bzrSeLqig3c83-SCwMjbNpi9pfrB60ZsEpXSyIp7Atvu1_aC-87bwCsa4apzT9avcWeyHvkwAiELF4" --header "Content-Type: application/json" --header "Content-length: 0" "https://api.mixin.one/network/assets/c94ac88f-4671-3976-b60a-09064f1811e8"
```

```
// Sample Response
{
  "data": {
    "amount": "296369.17400899",
    "asset_id": "c94ac88f-4671-3976-b60a-09064f1811e8",
    "chain_id": "43d61dcd-e413-450d-80b8-101d5e903357",
    "icon_url": "https://images.mixin.one/UasWtBZO0TZyLTLCFQjvE_UYekjC7eHCuT_9_52ZpzmCC-X-NPioVegng7Hfx0XmIUavZgz5UL-HIgPCBECc-Ws=s128",
    "name": "Mixin",
    "snapshots_count": 35224199,
    "symbol": "XIN",
    "type": "asset"
  }
}
```
