---
title: Read Users
position: 121
type: get
description: PATH /users/fetch
parameters:
  - name: Params
  - content: |
      ["UUID", "UUID", "UUID" ...]
content_markdown: |-
  Read users' informations

left_code_blocks:
  - code_block: |-
      curl -i -H "Mixin-Device-Id: 00a5a4ae-dcdc-48db-ab8e-a7eef69b441d" -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzMxMDg3OTYsImlhdCI6MTUyNTMzMjc5NiwianRpIjoiYzJiYzFiY2MtZTA4ZC00M2JlLWJhN2EtZGJlMWFlN2UxMzU3Iiwic2lkIjoiYTM0YzA3YTktNzU1ZC00YjU0LTk0YzUtZTQ1ZTlhMmRkNDNlIiwic2lnIjoiYzlkNDU1M2Q3ZmI3YjM4NDkxZjAxMmYyODQ0MTNhZmM0ODYzZTdhYWM4Nzg2NTVkNWU3NWFmM2VjYjQ0NjE5MyIsInVpZCI6IjA2YWVkMWUzLWJkNzctNGE1OS05OTFhLTViYjVhZTZmYmIwOSJ9.vBp791ho-lgGgGnRWw3CAtRXgK7TvQxXwYOikB-XVbBGRYeMEmkGdja8r461w-5t5JzEt9Y-yNYGWRE0oZ8DEuxgdcBe13FIP4UBgFw7dTG1SyvcQEO0BQtfiBL_8de8VuKntezfONkseOXUkG6IQ2qCBzZgijLwIbh3h-wPs6Q" "https://api.mixin.one/users/fetch" -X POST --data '["06aed1e3-bd77-4a59-991a-5bb5ae6fbb09"]'
    title: Curl
    language: bash

right_code_blocks:
  - code_block: |-
      {
        "data":[
        {  
          "type":"user",
            "user_id":"06aed1e3-bd77-4a59-991a-5bb5ae6fbb09",
            "identity_number":"7000",
            "full_name":"Around World",
            "avatar_url":"",
            "relationship":"ME",
            "mute_until":"0001-01-01T00:00:00Z",
            "created_at":"2018-05-03T06:03:56.867971412Z",
            "is_verified":false
        },
        ...
        ]
      }
    title: Response
    language: json
---
