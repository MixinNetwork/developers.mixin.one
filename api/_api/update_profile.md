---
title: Update Profile
position: 111
type: post
description: PATH /me
parameters:
  - name: full_name
    content: |
      String: "Mixin Develeper"
  - name: avatar_base64
    content: |
      String: Base64 of image
content_markdown: |-
  Update user informations

left_code_blocks:
  - code_block: |-
      curl -i -H "Mixin-Device-Id: 00a5a4ae-dcdc-48db-ab8e-a7eef69b441d" -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzMxMDUzODIsImlhdCI6MTUyNTMyOTM4MiwianRpIjoiZDcwMjdiOWUtNzcxYy00ZDA5LTlkMjQtNGVlYjc5YmJhNGM2Iiwic2lkIjoiYTM0YzA3YTktNzU1ZC00YjU0LTk0YzUtZTQ1ZTlhMmRkNDNlIiwic2lnIjoiNzEyNjY0ZmE4NDI4ZWM4Njg5MjA3YzdhOWE1MTNlMzlhNTk2MWMxODQwNmVkOTlkMzViNzNmMTIyYTdlOWIwMyIsInVpZCI6IjA2YWVkMWUzLWJkNzctNGE1OS05OTFhLTViYjVhZTZmYmIwOSJ9.FZryq34iN5TSxG4eMhYe4oe56IR5E_PaiKxIqwlIrAExg8ghJ5uXmOAg6_9V6lWXjl4ZIDuadQ5mGMNqxJfrj0kYS9Tb5dJUzA4xKKqbUXmPsk4VFLyFLg3CJUJmgQqpL62doHSW_0T9EA7W03tLTQZ-nbjhpca7eK3U-KRgK-E" "https://api.mixin.one/me" -XPOST --data '{"avatar_base64":"","full_name":"Around World"}'
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
          "has_pin":false,
          "receive_message_source":"EVERYBODY"
        }
      }
    title: Response
    language: json
---
