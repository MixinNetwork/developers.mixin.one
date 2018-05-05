---
title: Send SMS
position: 10
type: post
description: PATH /verifications
parameters:
  - name: phone
    content: |
      String: "+8613800013800"
  - name: purpose
    content: |
      String: "SESSION" or "PHONE"
content_markdown: |-
  Send Message to user's phone

left_code_blocks:
  - code_block: |-
      curl -i -H "Mixin-Device-Id: 00a5a4ae-dcdc-48db-ab8e-a7eef69b441d" -H "Content-Type: application/json" "https://api.mixin.one/verifications" -XPOST --data '{"phone": "+8613800013800", "purpose": "SESSION"}'
    title: Curl
    language: bash

right_code_blocks:
  - code_block: |-
      {
        "data":{
          "type":"phone_verification",
          "id":"1412379f-c0bd-456d-993e-dfd584cc54c1"
        }
      }
    title: Response
    language: json
---
