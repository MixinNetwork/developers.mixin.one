---
title: Create Address
position: 170
type: post
description: PATH /addresses
parameters:
  - name: asset_id
    content: |
      String: UUID
  - name: public_key
    content: |
      String: 0x86fa049857e0209aa7d9e616f7eb3b3b78ecfdb0
  - name: label
    content: |
      String: "Jason's ETH Address"
  - name: pin
    content: |
      String: Encrypted PIN
content_markdown: |-
  Create an addresses, which is the target address when you make a withdrawal.

left_code_blocks:
  - code_block: |-
      curl -i -H "Mixin-Device-Id: 00a5a4ae-dcdc-48db-ab8e-a7eef69b441d" -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzMxMTYzNjEsImlhdCI6MTUyNTM0MDM2MSwianRpIjoiNDRhOGRiZDAtODU3NC00Y2VhLTk3NWEtYzI5OWIwZWQyMTk4Iiwic2lkIjoiYTM0YzA3YTktNzU1ZC00YjU0LTk0YzUtZTQ1ZTlhMmRkNDNlIiwic2lnIjoiN2IzMzEwYTQ2NjY5YzNkNWJkMjFkNjRlNWRhNTJjMmQ4M2MzYWFjNTUzMmU3OTdkMjAzMzY0NzE3MDhiMDJjOCIsInVpZCI6IjA2YWVkMWUzLWJkNzctNGE1OS05OTFhLTViYjVhZTZmYmIwOSJ9.LSoJ0iWCo1g71SC_SYDsY6ZobUxh2Ue0e0D7VC1-cRfudJHCjR00OM2LhrTTub6BB--BnplPWNYOuz8zdxdZwNhY0OpwEpeVg2zxW202MDlp_PW3nQP1U_wv6SvdtqzdM6JswL-GGhl2CEDEGN8iivUGwv54ouOv4U2pqR5IrBc" "https://api.mixin.one/addresses" -XPOST --data '{"asset_id":"43d61dcd-e413-450d-80b8-101d5e903357","label":"Jason ETH Address","pin":"nRF5OyFmO4REG6lcPk1jwKDJrENim791uLe+HH0g7EwQHXK9FgCMJl5RDKbeCNDW","public_key":"0x86fa049857e0209aa7d9e616f7eb3b3b78ecfdb0"}'
    title: Curl
    language: bash

right_code_blocks:
  - code_block: |-
      {  
        "data":{  
          "type":"address",
          "address_id":"ba3a2e33-efde-40b9-9cac-c293f0d1a3f2",
          "asset_id":"43d61dcd-e413-450d-80b8-101d5e903357",
          "public_key":"0x86Fa049857E0209aa7D9e616F7eb3b3B78ECfdb0",
          "label":"Jason ETH Address",
          "updated_at":"2018-05-03T09:39:45.889633526Z"
        }
      }
    title: Response
    language: json
---
