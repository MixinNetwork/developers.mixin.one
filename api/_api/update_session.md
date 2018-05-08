---
title: Update Device Info
position: 140
type: post
description: PATH /session
parameters:
  - name: platform
    content: |
      String: iOS
  - name: platform_version
    content: |
      String: 11.0
  - name: app_version
    content: |
      String: 0.2.4
  - name: notification_token
    content: | 
      String: "APNS OR FCM token"
content_markdown: |-
  User Login

left_code_blocks:
  - code_block: |-
      curl -i -H "Mixin-Device-Id: 00a5a4ae-dcdc-48db-ab8e-a7eef69b441d" -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzMxMTA2OTQsImlhdCI6MTUyNTMzNDY5NCwianRpIjoiYTdmNzI1NDMtYWE3NC00MTFhLWJjNzctNGFkZGY3ODk5NjY2Iiwic2lkIjoiYTM0YzA3YTktNzU1ZC00YjU0LTk0YzUtZTQ1ZTlhMmRkNDNlIiwic2lnIjoiYmQwZTQ0ZDZmZmNjNzgyNjNlZmZlNDk5NDI2MzQzMGQ3YzZiNzBiNjEzMDVjNTUxZjkxNzM3MjU2OGIyZmFlZCIsInVpZCI6IjA2YWVkMWUzLWJkNzctNGE1OS05OTFhLTViYjVhZTZmYmIwOSJ9.ZtoJd5q3Lje6GJ3YBFqE308bViXAt5Gf5-WdITf53r180GQuamj1XXOu4FdOq87Kkh7G0J7crTsvvRMO4Q47_99HU-y46ApcQgzP-fqTncx9igdzCxekuAd_9eLN91fgOYJ4IaBa4C2353jJQ1TOJdf8YWdXxp9jZpHGVkZ9X_0" "https://api.mixin.one/session" -X POST --data '{"app_version":"0.2.6","notification_token":"","platform":"iOS","platform_version":"11.0"}'
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
