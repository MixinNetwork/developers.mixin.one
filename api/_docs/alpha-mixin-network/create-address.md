---
title: Create Address
category: Mixin Network
order: 11
---

Create an address for withdrawal, you can only withdraw through an existent address. (`public_key`, `lable`) or (`account_name`, `account_tag`) must be choose one of them.

###### POST /addresses

| asset_id | String: UUID |
| label | String: "Mixin", can't be blank, max size 64 |
| public_key | String: BTC address or EOS account name like 'eoswithmixin'|
| tag | String: can be blank, EOS account tag or memo |
| pin | String: Encrypted PIN |

```
// cURL Example
curl -i -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzMxMTYzNjEsImlhdCI6MTUyNTM0MDM2MSwianRpIjoiNDRhOGRiZDAtODU3NC00Y2VhLTk3NWEtYzI5OWIwZWQyMTk4Iiwic2lkIjoiYTM0YzA3YTktNzU1ZC00YjU0LTk0YzUtZTQ1ZTlhMmRkNDNlIiwic2lnIjoiN2IzMzEwYTQ2NjY5YzNkNWJkMjFkNjRlNWRhNTJjMmQ4M2MzYWFjNTUzMmU3OTdkMjAzMzY0NzE3MDhiMDJjOCIsInVpZCI6IjA2YWVkMWUzLWJkNzctNGE1OS05OTFhLTViYjVhZTZmYmIwOSJ9.LSoJ0iWCo1g71SC_SYDsY6ZobUxh2Ue0e0D7VC1-cRfudJHCjR00OM2LhrTTub6BB--BnplPWNYOuz8zdxdZwNhY0OpwEpeVg2zxW202MDlp_PW3nQP1U_wv6SvdtqzdM6JswL-GGhl2CEDEGN8iivUGwv54ouOv4U2pqR5IrBc" "https://api.mixin.one/addresses" -XPOST --data '{"asset_id":"43d61dcd-e413-450d-80b8-101d5e903357","label":"Jason ETH Address","pin":"nRF5OyFmO4REG6lcPk1jwKDJrENim791uLe+HH0g7EwQHXK9FgCMJl5RDKbeCNDW","public_key":"0x86fa049857e0209aa7d9e616f7eb3b3b78ecfdb0"}'
```
```
{{ site.data.address.data }}
```
