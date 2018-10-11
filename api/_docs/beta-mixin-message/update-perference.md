---
title: Update Perference
category: Mixin Messenger
order: 3 
---

Update user's perference

###### POST /me/preferences

| receive_message_source | String: "EVERYBODY" or "CONTACTS" |
| accept_conversation_source | String: "EVERYBODY" or "CONTACTS" |

```
// cURL Example
curl -i -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzMxMDU4NjMsImlhdCI6MTUyNTMyOTg2MywianRpIjoiZTg1NWU3MTUtNTI3Ni00YjlkLTk2MDgtNDZmNDgzYzFhMGYwIiwic2lkIjoiYTM0YzA3YTktNzU1ZC00YjU0LTk0YzUtZTQ1ZTlhMmRkNDNlIiwic2lnIjoiMzE2Njc1ZDFmYmRhMmM2NzRjOGIxYmVkNTQzM2IyMzIwZTI3MTEyYmZjODczZTE5MjI2M2E0NTc4ZTk2MTNiMCIsInVpZCI6IjA2YWVkMWUzLWJkNzctNGE1OS05OTFhLTViYjVhZTZmYmIwOSJ9.FHGbzztFIcXKapQWjuhhhT-ITBe2TrwzxooDrjiLFzKTFvhXPZh6rl1s5Tsl0smwyhLgaIfv0NXMOWvSuNPsjoPIWP19b0FpYj4TLq2eVPrSvurO1kRi_MqDS3erMkMEyZwnLvQu_Kosn0VGWdONX16kurkyt0pX1PMKgxauX9U" "https://api.mixin.one/me/preferences" -XPOST --data '{"receive_message_source":"CONTACTS"}'
```

```
// Sample Response
{
  "data":{
    "type":"user",
      "user_id":"06aed1e3-bd77-4a59-991a-5bb5ae6fbb09",
      "identity_number":"20034",
      "full_name":"Around World",
      "avatar_url":"",
      "relationship":"ME",
      "mute_until":"0001-01-01T00:00:00Z",
      "created_at":"2018-05-03T06:03:56.867971412Z",
      "is_verified":false,
      "session_id":"a34c07a9-755d-4b54-94c5-e45e9a2dd43e",
      "phone":"+8618678006575",
      "pin_token":"",
      "invitation_code":"",
      "code_id":"dabcf1c2-6a5e-4ea3-ad51-6e6641a06c7c",
      "code_url":"https://mixin.one/codes/dabcf1c2-6a5e-4ea3-ad51-6e6641a06c7c",
      "has_pin":false,
      "receive_message_source":"CONTACTS",
      "accept_conversation_source":"EVERYBODY"
  }
}
```
