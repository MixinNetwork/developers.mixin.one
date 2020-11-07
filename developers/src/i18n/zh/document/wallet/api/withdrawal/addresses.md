### 获取某个资产的所有提现地址

### `GET /assets/:id/addresses` 

```
curl -i -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzMxMTY2MTUsImlhdCI6MTUyNTM0MDYxNSwianRpIjoiYjI2YTdlZTMtMzNlZi00OGVjLTljMjgtZjQ1YTg0MTc0MWYyIiwic2lkIjoiYTM0YzA3YTktNzU1ZC00YjU0LTk0YzUtZTQ1ZTlhMmRkNDNlIiwic2lnIjoiNzllZWZmZmI2M2IzOTU0NDhjOWMzZjEzMWNhMjM4ZWEzYzFhOTQ4OTk2NzBhYWU3MDcxODQ0Zjg4OTE3MDJhZSIsInVpZCI6IjA2YWVkMWUzLWJkNzctNGE1OS05OTFhLTViYjVhZTZmYmIwOSJ9.hmMaj8JQrZAjBqQRyHh1qSUE7KLm8qwl2HMGsN59FNSdpfzXeX0pZt6aWg79R-jhmyLbfrGABEtu7ptUb3HN3fwbSe1k5_FnxP9pgpxJv3uJu6NJG5iS4d0X6IM58dfwNTmQjR2w9y88inmGhc7gsQ_mR1tC68ND433bPY6wg2U" "https://api.mixin.one/assets/43d61dcd-e413-450d-80b8-101d5e903357/addresses"
```

```json
{
  "data":[
    {
      "type":"address",
      "address_id":"e1524f3c-2e4f-411f-8a06-b5e1b1601308",
      "asset_id":"43d61dcd-e413-450d-80b8-101d5e903357",
      "destination":"0x86Fa049857E0209aa7D9e616F7eb3b3B78ECfdb0",
      "tag": "",
      "label":"Eth Address",
      "fee":"0.016",
      "reserve":"0",
      "dust": "0.0001",
      "updated_at":"0001-01-01T00:00:00Z"
    },
    ...
  ]
}
```