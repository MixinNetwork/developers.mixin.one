---
title: Verify Pin
position: 131
type: post
description: PATH /pin/verify
parameters:
  - name: pin
    content: |
      String: Encrypted PIN
content_markdown: |-
  Verify user's Pin.

left_code_blocks:
  - code_block: |-
      curl -i -H "Mixin-Device-Id: 00a5a4ae-dcdc-48db-ab8e-a7eef69b441d" -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzMxMDkzMDIsImlhdCI6MTUyNTMzMzMwMiwianRpIjoiZGNjNjM3ZGQtY2UxMi00MTQwLWI2YzItYjU1OGM1MTYxYzQxIiwic2lkIjoiYTM0YzA3YTktNzU1ZC00YjU0LTk0YzUtZTQ1ZTlhMmRkNDNlIiwic2lnIjoiZTdkMThmMDJmZjBhMTBjNzQ1MzI4OGIyYzkyNTMyZGQ5OWZlMWYyYjc1MzQzYWY0NWI4YjMyYjk2MTE1ZWRkOSIsInVpZCI6IjA2YWVkMWUzLWJkNzctNGE1OS05OTFhLTViYjVhZTZmYmIwOSJ9.R7p5uWHQJDldW-W2CK9sdn4rVKgUbV8ITD9oZZRgb_7j7YVTGF4ulJzt9M_GprKkXmNG2Ox9IO6uIQE-RvqHziSemGAoW1__fYnWrZ8ZyOo7EZeAkbGQ1W-gjjZKz9BqxBvakew_xdgQdnGv0aJq8WffnQkyNxy1DkmITR4kehg" "https://api.mixin.one/pin/update" -X POST --data '{"pin":"rIqULBd+xaiLuKImKAI7r72azK0zMPy7dIw1fQfhYskWKxkObZvOv5E6A8bACaws"}'
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
