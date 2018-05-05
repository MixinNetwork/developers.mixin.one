---
title: Rotate User's QR
position: 152
type: get
description: PATH /me/code
content_markdown: |-
  Change user's QR Code

left_code_blocks:
  - code_block: |-
      curl -i -H "Mixin-Device-Id: 00a5a4ae-dcdc-48db-ab8e-a7eef69b441d" -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzMxMTEzMjEsImlhdCI6MTUyNTMzNTMyMSwianRpIjoiNDY0MTEwN2MtMDFiNS00MzcyLTgwYmUtYzJmOThhYTIxMWY2Iiwic2lkIjoiYTM0YzA3YTktNzU1ZC00YjU0LTk0YzUtZTQ1ZTlhMmRkNDNlIiwic2lnIjoiY2ZlZTI1NDZiNDAxMjMzOGQ5MTc0ODI2YmNkODk4MWY0NDdkNTM4OWVhMDE0MDU1OTM1NzY3OGRiNGUzNzA2NSIsInVpZCI6IjA2YWVkMWUzLWJkNzctNGE1OS05OTFhLTViYjVhZTZmYmIwOSJ9.fLpAT5_Xku0oEUmSfzxH7FJeWbktxIksxGs1VSYtAF0Dhj7L8XVCdPHGgXfYotceE-H3PrkxO_aIJKPxOPS2YJBLVXCGTGoi_DSDcNweXCAD5pol9NEGIDgB04fcQJNEWUsrtZM_mpFLjBhOos-S-2Qf0CrVVu36MOYpj1VEspQ" "https://api.mixin.one/me/code"
    title: Curl
    language: bash

right_code_blocks:
  - code_block: |-
      {
        "data":{
          "type":"user",
          "user_id":"06aed1e3-bd77-4a59-991a-5bb5ae6fbb09",
          "identity_number":"7000",
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
          "has_pin":true,
          "receive_message_source":"CONTACTS"
        }
      }
    title: Response
    language: json
---
