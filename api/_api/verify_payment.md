---
title: Verify Payment
position: 163
type: post
description: PATH /payments
parameters:
  - name: asset_id
    content: |
      String: UUID
  - name: counter_user_id
    content: |
      String: UUID
  - name: amount
    content: |
      String: e.g. "0.01"
  - name: trace_id
    content: |
      String: UUID
content_markdown: |-
  Verify a transfer is valid or not.

left_code_blocks:
  - code_block: |-
      curl -i -H "Mixin-Device-Id: 00a5a4ae-dcdc-48db-ab8e-a7eef69b441d" -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzMxMTgyMjAsImlhdCI6MTUyNTM0MjIyMCwianRpIjoiNDg2OTU2YzYtMGVjZi00N2RlLTkwODktM2Q2N2VjNzFjNzE0Iiwic2lkIjoiYTM0YzA3YTktNzU1ZC00YjU0LTk0YzUtZTQ1ZTlhMmRkNDNlIiwic2lnIjoiYTMxMTJmYjRjMGFjZTU3MTk1N2YwZWEwODRjZjdlNDIzMGQwYmQzNzA1NDM5MTY2ODlhNzYwYjZlZWNjOTM1ZCIsInVpZCI6IjA2YWVkMWUzLWJkNzctNGE1OS05OTFhLTViYjVhZTZmYmIwOSJ9.xoW_kN-eAJXAdTnbzArXFATGU38yxVyGZA7btDqsIhZut8HNZIBFyZMNBGzHMdy0GaHH-j9_N2ZUjOVKSzQiaiebyVBh5odmPF4OiNuhiAnXgK9OcZbOZyl9gnT7uRbXN_oR-_ti0R3vq3YeLHOWeenQLgroNwcICpdo1S09L-k" "https://api.mixin.one/payments" -XPOST --data '{"amount":"10","asset_id":"43d61dcd-e413-450d-80b8-101d5e903357","counter_user_id":"a465ffdb-4441-4cb9-8b45-00cf79dfbc46","trace_id":"99f1f10f-81a0-4887-907f-c5b37f2c1bc8"}'
    title: Curl
    language: bash

right_code_blocks:
  - code_block: |-
      {  
        "data":{  
          "recipient":{  
            "type":"user",
              "user_id":"a465ffdb-4441-4cb9-8b45-00cf79dfbc46",
              "identity_number":"20018",
              "full_name":"OS105",
              "avatar_url":"",
              "relationship":"",
              "mute_until":"0001-01-01T00:00:00Z",
              "created_at":"2018-04-25T05:37:10.06433488Z",
              "is_verified":false
          },
            "asset":{  
              "type":"asset",
              "asset_id":"43d61dcd-e413-450d-80b8-101d5e903357",
              "chain_id":"43d61dcd-e413-450d-80b8-101d5e903357",
              "symbol":"EOS",
              "name":"EOS",
              "icon_url":"https://images.mixin.one/zVDjOxNTQvVsA8h2B4ZVxuHoCF3DJszufYKWpd9duXUSbSapoZadC7_13cnWBqg0EmwmRcKGbJaUpA8wFfpgZA=s128",
              "balance":"0",
              "public_key":"",
              "price_btc":"0.0776679",
              "price_usd":"715.394"
            },
            "amount":"10",
            "status":"pending"
        }
      }
    title: Response
    language: json
---
