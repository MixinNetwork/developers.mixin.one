---
title: Read Addresses
position: 171
type: get
description: PATH /assets/:id/addresses
content_markdown: |-
  Get user's addresses

left_code_blocks:
  - code_block: |-
      curl -i -H "Mixin-Device-Id: 00a5a4ae-dcdc-48db-ab8e-a7eef69b441d" -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzMxMTY2MTUsImlhdCI6MTUyNTM0MDYxNSwianRpIjoiYjI2YTdlZTMtMzNlZi00OGVjLTljMjgtZjQ1YTg0MTc0MWYyIiwic2lkIjoiYTM0YzA3YTktNzU1ZC00YjU0LTk0YzUtZTQ1ZTlhMmRkNDNlIiwic2lnIjoiNzllZWZmZmI2M2IzOTU0NDhjOWMzZjEzMWNhMjM4ZWEzYzFhOTQ4OTk2NzBhYWU3MDcxODQ0Zjg4OTE3MDJhZSIsInVpZCI6IjA2YWVkMWUzLWJkNzctNGE1OS05OTFhLTViYjVhZTZmYmIwOSJ9.hmMaj8JQrZAjBqQRyHh1qSUE7KLm8qwl2HMGsN59FNSdpfzXeX0pZt6aWg79R-jhmyLbfrGABEtu7ptUb3HN3fwbSe1k5_FnxP9pgpxJv3uJu6NJG5iS4d0X6IM58dfwNTmQjR2w9y88inmGhc7gsQ_mR1tC68ND433bPY6wg2U" "https://api.mixin.one/assets/43d61dcd-e413-450d-80b8-101d5e903357/addresses"
    title: Curl
    language: bash

right_code_blocks:
  - code_block: |-
      {  
        "data":[  
        {  
          "type":"address",
            "address_id":"ba3a2e33-efde-40b9-9cac-c293f0d1a3f2",
            "asset_id":"43d61dcd-e413-450d-80b8-101d5e903357",
            "public_key":"0x86Fa049857E0209aa7D9e616F7eb3b3B78ECfdb0",
            "label":"Jason ETH Address",
            "updated_at":"0001-01-01T00:00:00Z"
        }
        ]
      }
    title: Response
    language: json
---
