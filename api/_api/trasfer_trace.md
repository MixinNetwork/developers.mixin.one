---
title: Read Transfer
position: 164
type: get
description: PATH /transfers/trace/:id
content_markdown: |-
  Get transfer from trace_id

left_code_blocks:
  - code_block: |-
      curl -i -H "Mixin-Device-Id: 00a5a4ae-dcdc-48db-ab8e-a7eef69b441d" -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzMxMTk4MzMsImlhdCI6MTUyNTM0MzgzMywianRpIjoiNTk0ZTBhNmQtMWI2OC00NzQ4LTg2ZWYtYjM5MzQyMTY5ZGQ3Iiwic2lkIjoiYTM0YzA3YTktNzU1ZC00YjU0LTk0YzUtZTQ1ZTlhMmRkNDNlIiwic2lnIjoiMDJhYTE2MTNjMjVlOTNiMGI2OTE1MmUyNTYxOGIyMDQwMGFhYTYyYWIzNGYxYWM2NWJjYzQ2NmY0YjI0ZTM2MCIsInVpZCI6IjA2YWVkMWUzLWJkNzctNGE1OS05OTFhLTViYjVhZTZmYmIwOSJ9.O73fS4WJJG8sFy3heqZoBGTvkQH8iIswsmm6ZK-yRZZXPRQ_miqjB12Wyc-IzFiUqT_63MeH4PspQZ3I9DEie252eiaRluoLzIWPDeq0Wjsp_MtkX4J0nIluAGtQFLNAf8r6pJaT_qqleUieM4DyndIxlkHtloico0Zqp7b3Q3c" "https://api.mixin.one/transfers/trace/7c67e8e8-b142-488b-80a3-61d4d29c90bf"
    title: Curl
    language: bash

right_code_blocks:
  - code_block: |-
      {
        "data":{
          "type":"transfer",
          "snapshot_id":"ab56be4c-5b20-41c6-a9c3-244f9a433f35",
          "counter_user_id":"a465ffdb-4441-4cb9-8b45-00cf79dfbc46",
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
