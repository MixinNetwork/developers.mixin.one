---
title: Create User
position: 100
type: post
description: PATH /users
parameters:
  - name: session_secret
    content: |
      String: Base64 of RSA PUBLIC KEY
  - name: full_name
    content: |
      String: Name of An New User
content_markdown: |-
  Create a new none-phone user.

left_code_blocks:
  - code_block: |-
      curl -i -H "Mixin-Device-Id: 00a5a4ae-dcdc-48db-ab8e-a7eef69b441d" -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzMxMjAyMzAsImlhdCI6MTUyNTM0NDIzMCwianRpIjoiNjEyZDRjYTQtOGUwNC00YTk3LTgwZTMtN2UwMjY0OGE5ZmQ0Iiwic2lkIjoiYTM0YzA3YTktNzU1ZC00YjU0LTk0YzUtZTQ1ZTlhMmRkNDNlIiwic2lnIjoiMTI3YWVhOWU3MmZhMDJiZWE0MDdhZGNiYTA0M2IzMmM0YTRhN2U2NGIzMDU0NzcyMGRlMjk3YjE2NGU5MWVhMiIsInVpZCI6IjA2YWVkMWUzLWJkNzctNGE1OS05OTFhLTViYjVhZTZmYmIwOSJ9.g_sED63nqS_cf68FKh8Ow1-0B4Ew_ojYS76P52hhqcF-gjImI93vM7Q4PI0t8i4ddiePD9vT470pD3obtzpo7eHD1ECfDuQkxqJqvN8elRYLWPYHjzElu0JqHDDIXh1TCtzGLReR4ZmC9g9DkhxDhocP9srWdVDAU_FbJOjznOE" "https://api.mixin.one/users" -X POST --data '{"full_name":"Bot User","session_secret":"MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDMTuli9K9k7F+L7Rq34se23nQeV2yvjVGCZyRTbp8qNASnRq6N679ZflgVxNUsr2qkHN4eqvafrQ9IIcRXfofMlWWIU6MrgVVD0UEVyH4jKA5gUr4smU/SDnVLqb3TojYMELIKHgqnrjqDJ0b+vMUG1Iix4fi+CvjSiJzsWPOavQIDAQAB"}'
    title: Curl
    language: bash

right_code_blocks:
  - code_block: |-
      {  
        "data":{  
          "type":"user",
          "user_id":"06aed1e3-bd77-4a59-991a-5bb5ae6fbb09",
          "identity_number":"7000",
          "full_name":"",
          "avatar_url":"",
          "relationship":"ME",
          "mute_until":"0001-01-01T00:00:00Z",
          "created_at":"2018-05-03T06:03:56.867971412Z",
          "is_verified":false,
          "session_id":"0bf54b1c-7d6f-4c6b-9e4d-6beaec131923",
          "phone":"+8613800013800",
          "pin_token":"m0/+Q1E6i4/S5mzMAQTxwIK8+hX6AuoiP+/yFnuiNJ3PQY5FiKQS0ELeHGJWgH6iKPUybH1pm3NqbcUZ53Y9gcGrEfHZVG/m/LbMISPXQYIBW3i/pukKdMMuw3siaQ01HMXuYmBr8uEyMY71VFJb28HWnNtJIVlzrY8rn08UeZo=",
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
