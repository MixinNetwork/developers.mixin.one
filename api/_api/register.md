---
title: Register User
position: 11
type: post
description: PATH /verifications/:id
parameters:
  - name: code
    content: |
      String: "1234"
  - name: session_secret
    content: |
      String: base64 of isa public_key
  - name: platform
    content: |
      String: "iOS" or "Andoird"
  - name: platform_version
    content: | 
      String: "11.0"
  - name: app_version
    content: |
      String: "0.2.11"
  - name: notification_token
    content: |
      String: "APNS or FCM token"
  - name: purpose 
    content: |
      String: "SESSION"
  - name: registration_id
    content: |
      Integer: Clients should only do this once, at install time, e.g. 1356
content_markdown: |-
  User sign in or sign up

left_code_blocks:
  - code_block: |-
      curl -i -H "Mixin-Device-Id: 00a5a4ae-dcdc-48db-ab8e-a7eef69b441d" -H "Content-Type: application/json" "https://api.mixin.one/verifications/2f5ec512-2131-4535-abb5-0defba14480b" -XPOST --data '{"code": "9718", "session_secret": "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDMTuli9K9k7F+L7Rq34se23nQeV2yvjVGCZyRTbp8qNASnRq6N679ZflgVxNUsr2qkHN4eqvafrQ9IIcRXfofMlWWIU6MrgVVD0UEVyH4jKA5gUr4smU/SDnVLqb3TojYMELIKHgqnrjqDJ0b+vMUG1Iix4fi+CvjSiJzsWPOavQIDAQAB", "platform": "iOS", "platform_version": "11.0", "app_version": "0.2.6", "notification_token": "", "purpose": "SESSION", "registration_id": 3702}'
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
