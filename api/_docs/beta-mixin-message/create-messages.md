---
title: Create Messages
category: Mixin Messenger
order: 9
---

Create plain messages through HTTP, can be used by bot only. the max messages body size is 100.

###### POST /attachments

```
// cURL Example
curl -i -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzMxMTYzNjEsImlhdCI6MTUyNTM0MDM2MSwianRpIjoiNDRhOGRiZDAtODU3NC00Y2VhLTk3NWEtYzI5OWIwZWQyMTk4Iiwic2lkIjoiYTM0YzA3YTktNzU1ZC00YjU0LTk0YzUtZTQ1ZTlhMmRkNDNlIiwic2lnIjoiN2IzMzEwYTQ2NjY5YzNkNWJkMjFkNjRlNWRhNTJjMmQ4M2MzYWFjNTUzMmU3OTdkMjAzMzY0NzE3MDhiMDJjOCIsInVpZCI6IjA2YWVkMWUzLWJkNzctNGE1OS05OTFhLTViYjVhZTZmYmIwOSJ9.LSoJ0iWCo1g71SC_SYDsY6ZobUxh2Ue0e0D7VC1-cRfudJHCjR00OM2LhrTTub6BB--BnplPWNYOuz8zdxdZwNhY0OpwEpeVg2zxW202MDlp_PW3nQP1U_wv6SvdtqzdM6JswL-GGhl2CEDEGN8iivUGwv54ouOv4U2pqR5IrBc" "https://api.mixin.one/messages" -XPOST --data '[{"conversation_id":"928c5c40-769c-3e97-8387-fb1ae0645311", "recipient_id":"e8e5b807-fa8b-455a-8dfa-b189d28310ff", "message_id":"e8e5b807-fa8b-455a-8dfa-b189d28310ff", "category":"PLAIN_TEXT", "data":"base64 of data", "representative_id": "e8e5b807-fa8b-455a-8dfa-b189d28310ff", "quote_message_id":"e8e5b807-fa8b-455a-8dfa-b189d28310ff"}]'
```

```
// Sample Response
{}
```
