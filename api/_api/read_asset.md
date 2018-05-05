---
title: Read Asset
position: 181
type: get
description: PATH /assets/:id
content_markdown: |-
  Get user's asset

left_code_blocks:
  - code_block: |-
      curl -i -H "Mixin-Device-Id: 00a5a4ae-dcdc-48db-ab8e-a7eef69b441d" -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJhaWQiOiIzNDcwNzFjYS0zOThkLTQ4M2QtODc3MS1iNWVlNzZmNDRhZDMiLCJleHAiOjE1NTU3MzcxMDksImlhdCI6MTUyNDIwMTEwOSwiaXNzIjoiMWQxNWMzZDAtY2IxNy00NzJkLWJjNjItYjEwYjE1NTUzNzMyIn0.RdTBh-egdWGv0saL5yhuuA5YI1ch87bTJ0jKOwmKu0HT3VgbjeEsC8n9I7sXl8rn8IKYRQAFDvS90RUSN0aVV0J2t0L3HLEXN5gLW7eAOM4PsJP4HgkAUreHbRVg1uDSKGtrFfnZ7CoIg5HId-7quL480Q8de_M6pW5ASMNQVGg" "https://api.mixin.one/assets/3596ab64-a575-39ad-964e-43b37f44e8cb"
    title: Curl
    language: bash

right_code_blocks:
  - code_block: |-
      {  
        "data":{  
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
        }
      }
    title: Response
    language: json
---
