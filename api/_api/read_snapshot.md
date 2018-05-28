---
title: Read snapshot
position: 220
type: get
description: PATH /network/snapshots/:id
content_markdown: |-
  Read network snapshot information.

left_code_blocks:
  - code_block: |-
      curl -i --header "Authorization: Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1Mjc0OTA5MDgsImlhdCI6MTUyNzQ5MDg0OCwianRpIjoiNjNhOWY1NjUtZDA1Zi00NTJjLWFhY2QtY2IxOTUyMDk3YzY1Iiwic2lkIjoiYWM2ZDFmODYtYTY0Yi00NWRkLTllZmEtN2JmMGVjZjI2MDU2Iiwic2lnIjoiZjYyMDU4ZjY2MDRhZTllMjlmZDZiZDExNmM3OGQwZDBhNDVmYzYwZTMwOWY1MWZhYzk3NWY3YzQ4ZjMzNTAzNiIsInVpZCI6IjMxYjFhMTdjLWFiMzgtNGFhNC05YmM5LWY0NjQyNzEyODExMyJ9.ZGOEeOjZ_70YU-VDcZ6e3h_u8q4rBfeMYaTpXGh1VPO3hyfeVHsK4UZpbevta9Z8N9rp3BCL-Mwu1KswhzIM7Wc4gfN7p9sSn5Ik0lI-SsvOlsplgbVrgzk8AE14lXxtOZ_cvbLj6_stOUJq2OQ16wEI7TNBQu6AK0MqxHYSzSU" --header "Content-Type: application/json" --header "Content-length: 0" "https://api.mixin.one/network/snapshots/8f5b244e-cf86-4374-8eaa-c551fd70cd83"
    title: Curl
    language: bash

right_code_blocks:
  - code_block: |-
      {  
        "data":{  
          "assets":[  
          {  
            "amount":"134289.9334158",
              "asset_id":"c94ac88f-4671-3976-b60a-09064f1811e8",
              "icon_url":"https://images.mixin.one/E2y0BnTopFK9qey0YI-8xV3M82kudNnTaGw0U5SU065864SsewNUo6fe9kDF1HIzVYhXqzws4lBZnLj1lPsjk-0=s128",
              "symbol":"XIN",
              "type":"asset"
          },
            ....
          ]
        }
      }
    title: Response
    language: json
---
