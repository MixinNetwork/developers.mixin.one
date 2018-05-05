---
title: Read Contacts
position: 191
type: get
description: PATH /contacts
content_markdown: |-
  Get user's contacts

left_code_blocks:
  - code_block: |-
      curl -i -H "Mixin-Device-Id: 00a5a4ae-dcdc-48db-ab8e-a7eef69b441d" -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzMxMTQyMjEsImlhdCI6MTUyNTMzODIyMSwianRpIjoiYTVhZGQ1ZmUtMzYxNC00OWQ0LWExZWQtMDE3YWMyYzllMGFlIiwic2lkIjoiYTM0YzA3YTktNzU1ZC00YjU0LTk0YzUtZTQ1ZTlhMmRkNDNlIiwic2lnIjoiMDQ1ZjZiYjVlMjI5ZDExZTA2ZmI4ZjlkNTYzODQ2N2Y0NzljZjhkY2U4MjhmZjAxZjJjODFiYjEzZjVjOWVkYSIsInVpZCI6IjA2YWVkMWUzLWJkNzctNGE1OS05OTFhLTViYjVhZTZmYmIwOSJ9.GnUBKqkqz6RTWnwtBjSdQnCVecTrYziTUPC0sVVd4_5OWcQ4JbGk01jQ8vFUD-6UW0F-Q6JxQ3L44sDa7smQMxzJaW1C3ihciMKiuqk1J2gXV4395t1Lb8jsKbs-ggBSoZsuJgtOm55_nKm0ZvpcXUJbicBjq6R8tbWbHVuU_Ec" "https://api.mixin.one/contacts"
    title: Curl
    language: bash

right_code_blocks:
  - code_block: |-
      {
        "data":[
        {  
          "type":"contact",
            "phone":"+8613800013800",
            "full_name":"Around World"
        },
        ...
        ]
      }
    title: Response
    language: json
---
