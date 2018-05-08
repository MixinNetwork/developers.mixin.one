---
title: Withdrawal
position: 161
type: post
description: PATH /withdrawals
parameters:
  - name: address_id
    content: |
      String: UUID
  - name: amount
    content: |
      String: "100000"
  - name: pin
    content: |
      String: "Encrypted Pin"
  - name: trace_id
    content: |
      String: UUID
  - name: memo
    content: |
      String: text
content_markdown: |-
  Withdrawal to a blockchain address

left_code_blocks:
  - code_block: |-
      curl -i -H "Mixin-Device-Id: 00a5a4ae-dcdc-48db-ab8e-a7eef69b441d" -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzMxMTg3MzQsImlhdCI6MTUyNTM0MjczNCwianRpIjoiN2I0MDk4NzctYmUwZS00OTIxLThmNDMtYjM1OTEwNGY2YjM5Iiwic2lkIjoiYTM0YzA3YTktNzU1ZC00YjU0LTk0YzUtZTQ1ZTlhMmRkNDNlIiwic2lnIjoiMTk0Y2U2ZTNkMTllODZiZDQ5NmQ0OTMwNGIxNzhkNzA5Y2JlNWFiOWFkYTE4ZjUxYmQ2YjJjMjdiNTk4NzQwYSIsInVpZCI6IjA2YWVkMWUzLWJkNzctNGE1OS05OTFhLTViYjVhZTZmYmIwOSJ9.Uzj-M3XeD-vWwIEb6NQ0MfVvp14mUTpKK5HLc3xtPU7W5pQws9zsR7uCJTOSHYO1_ZpbTB3Vky0L5IEXafJ7eWVBO7GFqeI-2Tiy0qEiYSkPLBbQiSZ3_WLrUKfb4-EaLeekM-FLxLQR_qnSQQsy88MVOVLqrgDhetffx0GoYhM" "https://api.mixin.one/withdrawals" -XPOST --data '{"amount":"100","asset_id":"43d61dcd-e413-450d-80b8-101d5e903357","memo":"hello","pin":"xDcSiAsvsekYpnxEShqLgecvQ4GhP7o660nOodK9BG7k+xsszxO56Yg6DQLWtOek","trace_id":"ca90fd5b-e047-4a66-affa-2b40f026b165"}'    
    title: Curl
    language: bash

right_code_blocks:
  - code_block: |-
      {  
        "data":{  
          "type":"withdrawal",
          "snapshot_id":"ab56be4c-5b20-41c6-a9c3-244f9a433f35",
          "transaction_hash":"axt..ze",
          "asset_id":"43d61dcd-e413-450d-80b8-101d5e903357",
          "amount":"-10",
          "trace_id":"7c67e8e8-b142-488b-80a3-61d4d29c90bf",
          "memo":"hello",
          "created_at":"2018-05-03T10:08:34.859542588Z"
        }
      }
    title: Response
    language: json
---
