---
title: Create Contacts
position: 194
type: post
description: PATH /contacts
parameters:
  - name: phone
    content: |
      String: "+8613800013800"
  - name: full_name
    content: |
      String: "Jason"
content_markdown: |-
  Create user's contacts

left_code_blocks:
  - code_block: |-
      curl -i -H "Mixin-Device-Id: 00a5a4ae-dcdc-48db-ab8e-a7eef69b441d" -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzMxMTQyMjEsImlhdCI6MTUyNTMzODIyMSwianRpIjoiYTVhZGQ1ZmUtMzYxNC00OWQ0LWExZWQtMDE3YWMyYzllMGFlIiwic2lkIjoiYTM0YzA3YTktNzU1ZC00YjU0LTk0YzUtZTQ1ZTlhMmRkNDNlIiwic2lnIjoiMDQ1ZjZiYjVlMjI5ZDExZTA2ZmI4ZjlkNTYzODQ2N2Y0NzljZjhkY2U4MjhmZjAxZjJjODFiYjEzZjVjOWVkYSIsInVpZCI6IjA2YWVkMWUzLWJkNzctNGE1OS05OTFhLTViYjVhZTZmYmIwOSJ9.GnUBKqkqz6RTWnwtBjSdQnCVecTrYziTUPC0sVVd4_5OWcQ4JbGk01jQ8vFUD-6UW0F-Q6JxQ3L44sDa7smQMxzJaW1C3ihciMKiuqk1J2gXV4395t1Lb8jsKbs-ggBSoZsuJgtOm55_nKm0ZvpcXUJbicBjq6R8tbWbHVuU_Ec" "https://api.mixin.one/contacts" -X POST --data '[{"full_name":"Around World","phone":"+8613800013800"}]'
    title: Curl
    language: bash

right_code_blocks:
  - code_block: |-
      {}
    title: Response
    language: json
---
