---
title: Update Perference
category: Mixin Messenger
order: 3 
---

Update user's preferences.

###### POST /me/preferences

| receive_message_source | String: "EVERYBODY" or "CONTACTS" |
| accept_conversation_source | String: "EVERYBODY" or "CONTACTS" |

```
// cURL Example
curl -i -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzMxMDU4NjMsImlhdCI6MTUyNTMyOTg2MywianRpIjoiZTg1NWU3MTUtNTI3Ni00YjlkLTk2MDgtNDZmNDgzYzFhMGYwIiwic2lkIjoiYTM0YzA3YTktNzU1ZC00YjU0LTk0YzUtZTQ1ZTlhMmRkNDNlIiwic2lnIjoiMzE2Njc1ZDFmYmRhMmM2NzRjOGIxYmVkNTQzM2IyMzIwZTI3MTEyYmZjODczZTE5MjI2M2E0NTc4ZTk2MTNiMCIsInVpZCI6IjA2YWVkMWUzLWJkNzctNGE1OS05OTFhLTViYjVhZTZmYmIwOSJ9.FHGbzztFIcXKapQWjuhhhT-ITBe2TrwzxooDrjiLFzKTFvhXPZh6rl1s5Tsl0smwyhLgaIfv0NXMOWvSuNPsjoPIWP19b0FpYj4TLq2eVPrSvurO1kRi_MqDS3erMkMEyZwnLvQu_Kosn0VGWdONX16kurkyt0pX1PMKgxauX9U" "https://api.mixin.one/me/preferences" -XPOST --data '{"receive_message_source":"CONTACTS"}'
```

```
{{ site.data.user.data }}
```
