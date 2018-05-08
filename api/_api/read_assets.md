---
title: Read Assets
position: 180
type: get
description: PATH /assets
content_markdown: |-
  Get user's assets

left_code_blocks:
  - code_block: |-
      curl -i -H "Mixin-Device-Id: 00a5a4ae-dcdc-48db-ab8e-a7eef69b441d" -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzMxMTE5MDYsImlhdCI6MTUyNTMzNTkwNiwianRpIjoiZjdmMjRjMjQtYmQ0MC00ZDhlLTgyNzktOWRjNDgzYjNiYzEwIiwic2lkIjoiYTM0YzA3YTktNzU1ZC00YjU0LTk0YzUtZTQ1ZTlhMmRkNDNlIiwic2lnIjoiZWQ0MDU4OTk4YmU1ODA1ZGRkOGMzOWQ3ZmVkM2NiNDk5YjIzMzI1Y2QyMTk1OWNiZDExNzJkYzc3MmEzZDYxYyIsInVpZCI6IjA2YWVkMWUzLWJkNzctNGE1OS05OTFhLTViYjVhZTZmYmIwOSJ9.FRu1IBx-p2YfptDzPWwMh5rurSo6ieiPBL2y_CPYzOR8TSsh7iAQwjcZKlB0GUSKsde9r80UQQo8W1bwN8Od852AoKbUp3qg8l-fXeyIxM3C2l1dp0VK8CATGdXLRm7MKemq7AI-tuO6BL78eqQALAEEIy-YAp8XmMrqQ72JslU" "https://api.mixin.one/assets"
    title: Curl
    language: bash

right_code_blocks:
  - code_block: |-
      {  
        "data":[{  
          "type":"asset",
            "asset_id":"3596ab64-a575-39ad-964e-43b37f44e8cb",
            "chain_id":"43d61dcd-e413-450d-80b8-101d5e903357",
            "symbol":"eosDAC",
            "name":"eosDAC Community Owned EOS Block Producer ERC20 Tokens",
            "icon_url":"https://images.mixin.one/HovctUnrBkLPlDotWvWPsIuFb8qKrLddwF5-f2Fi9q9uO829YB2qGITgOd2YmTMKnGg_z9XrVYzEwFE_rD_REz9C=s128",
            "balance":"203.975",
            "public_key":"0x2CEab41716F4ce0Db36B6FdABEdc6a0BE5DC442B",
            "price_btc":"0",
            "price_usd":"0"
        },
        ...
        ]
      }
    title: Response
    language: json
---
