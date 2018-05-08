---
title: Read User
position: 120
type: get
description: PATH /users/:id
content_markdown: |-
  Read user informations

left_code_blocks:
  - code_block: |-
      // ACCESS_TOKEN is Signed Authorization Token
      curl -i -H "Mixin-Device-Id: 00a5a4ae-dcdc-48db-ab8e-a7eef69b441d" -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzMxMDg1NjMsImlhdCI6MTUyNTMzMjU2MywianRpIjoiODA2ZDJiM2QtZWE5OS00NWI5LTkzODQtY2Q5ZDY5NzVmOGFlIiwic2lkIjoiYTM0YzA3YTktNzU1ZC00YjU0LTk0YzUtZTQ1ZTlhMmRkNDNlIiwic2lnIjoiN2EwMzhjZGNmYjg1YTc4YWI2NGViODcwNWFjYmU5NmNlNzEwNmFjY2IzN2Q3ZmVmZjBlZDdlNDJhM2JmNTU2ZCIsInVpZCI6IjA2YWVkMWUzLWJkNzctNGE1OS05OTFhLTViYjVhZTZmYmIwOSJ9.TC5327AW_74W3ou0zXlBhzMuBPeE75iEK4ESKaCGlh-7vDixlJ8vKhIalUQ8qVHEHvCpSFCc-B4imQ0h4ICjrVuL1Is_JOaXx-nI_Pegb5tkWszCeFMYCXUBeBUFH6ACaZyP-VwUiT4_Ro5l1EjziCGix0GcKAjApqf1m25Pz10" "https://api.mixin.one/users/06aed1e3-bd77-4a59-991a-5bb5ae6fbb09"
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
            "is_verified":false
        }
      }
    title: Response
    language: json
---
