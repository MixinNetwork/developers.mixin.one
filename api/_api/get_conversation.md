---
title: Read Conversation
position: 211
type: get
description: PATH /conversations/:id
content_markdown: |-
  Read a conversation.

left_code_blocks:
  - code_block: |-
      curl -i -H "Mixin-Device-Id: 00a5a4ae-dcdc-48db-ab8e-a7eef69b441d" -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzQyNTEwMTcsImlhdCI6MTUyNjQ3NTAxNywianRpIjoiZWVhNjE4Y2UtNmE5Zi00MWU3LTkwODQtMzVlNDdhZGFlOWEyIiwic2lkIjoiMTM4NDMyNmQtMTQzNi00NWI2LWI3NGQtY2ZhNjNkNDM2ZmRmIiwic2lnIjoiZWRhZjA2ZDA2Nzg4OWUyMDQ4NTczMmU2Y2NkODZmNTJjODA4OGRhNzdkOTI1NDEwODNiYmY1YjU0NTQ0NDVhNyIsInVpZCI6IjhkY2Y4MjNkLTllYjMtNGRhMi04NzM0LWYwYWFkNTBjMGRhNiJ9.h0ohH6oRaksdXrw2CHTjDoUva5oUbc3d8RhvjI5qAqHIcpslLC2TC8hxbwTzuRQQ6hE2bdZLGcuEvoY0O0o2fFO4OHqiRdsMih-7mPR08VIWUGbS0qRhN8qebpYSpAOXqRAt4Ox4ad85FaPWFFbyXF2Tuw4XOTs4aF7a9vqejm0" "https://api.mixin.one/conversations/928c5c40-769c-3e97-8387-fb1ae0645311" -X GET
    title: Curl
    language: bash

right_code_blocks:
  - code_block: |-
      {  
        "data":{  
          "type":"conversation",
          "conversation_id":"928c5c40-769c-3e97-8387-fb1ae0645311",
          "creator_id":"8dcf823d-9eb3-4da2-8734-f0aad50c0da6",
          "category":"GROUP",
          "name":"",
          "icon_url":"",
          "announcement":"",
          "created_at":"2018-05-16T12:34:44.134238105Z",
          "code_id":"d8244b92-30e9-44b5-bfb0-ce597c788125",
          "code_url":"https://mixin.one/codes/d8244b92-30e9-44b5-bfb0-ce597c788125",
          "mute_until":"2018-05-16T12:34:44.143010035Z",
          "participants":[  
            {  
              "type":"participant",
              "user_id":"8dcf823d-9eb3-4da2-8734-f0aad50c0da6",
              "role":"OWNER",
              "created_at":"2018-05-16T12:34:44.134238105Z"
            },
            {  
              "type":"participant",
              "user_id":"e8e5b807-fa8b-455a-8dfa-b189d28310ff",
              "role":"",
              "created_at":"2018-05-16T12:34:44.149277666Z"
            }
          ]
        }
      }
    title: Response
    language: json
---
