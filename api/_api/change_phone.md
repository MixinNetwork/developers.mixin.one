---
title: Change Phone Number
position: 12
type: post
description: PATH /verifications/:id
parameters:
  - name: code
    content: |
      String: "123456"
  - name: pin
    content: |
      String: Encrypted user pin
  - name: purpose 
    content: |
      String: "PHONE"
content_markdown: |-
  Update user Phone Number

left_code_blocks:
  - code_block: |-
      curl -i -H "Mixin-Device-Id: 00a5a4ae-dcdc-48db-ab8e-a7eef69b441d" -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzMxMTE5MDYsImlhdCI6MTUyNTMzNTkwNiwianRpIjoiZjdmMjRjMjQtYmQ0MC00ZDhlLTgyNzktOWRjNDgzYjNiYzEwIiwic2lkIjoiYTM0YzA3YTktNzU1ZC00YjU0LTk0YzUtZTQ1ZTlhMmRkNDNlIiwic2lnIjoiZWQ0MDU4OTk4YmU1ODA1ZGRkOGMzOWQ3ZmVkM2NiNDk5YjIzMzI1Y2QyMTk1OWNiZDExNzJkYzc3MmEzZDYxYyIsInVpZCI6IjA2YWVkMWUzLWJkNzctNGE1OS05OTFhLTViYjVhZTZmYmIwOSJ9.FRu1IBx-p2YfptDzPWwMh5rurSo6ieiPBL2y_CPYzOR8TSsh7iAQwjcZKlB0GUSKsde9r80UQQo8W1bwN8Od852AoKbUp3qg8l-fXeyIxM3C2l1dp0VK8CATGdXLRm7MKemq7AI-tuO6BL78eqQALAEEIy-YAp8XmMrqQ72JslU" "https://api.mixin.one/verifications/af185af2-fbbc-4df0-9d40-f089ba24fbb1" -X POST --data '{"code":"6633","pin":"VXVmvykpf5Jo+LnPL0HAyn/m3I+gQTAW0j+Mp3R4FZnCy+28QwV2CV9Ic+DwmQW1","purpose":"PHONE"}'
    title: Curl
    language: bash

right_code_blocks:
  - code_block: |-
      {}
    title: Response
    language: json
---
