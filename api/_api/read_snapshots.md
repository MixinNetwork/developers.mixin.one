---
title: Read Network Snapshots
position: 230
type: get
description: PATH /network/snapshots?limit=10&offset=nanosecond
content_markdown: |-
  Read Mixin network snapshots

left_code_blocks:
  - code_block: |-
      curl -i --header "Authorization: Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzUyNjQ4MDUsImlhdCI6MTUyNzQ4ODgwNSwianRpIjoiZjhjMGY2OGItNzIwNC00ZmJmLTkzNWMtMTE5OGI4NTlmODhhIiwic2lkIjoiYWM2ZDFmODYtYTY0Yi00NWRkLTllZmEtN2JmMGVjZjI2MDU2Iiwic2lnIjoiYmJkYmMyMDM3MGM2YTI1NTJkZjVlOGRjMThhMGUwZjAxZDI5ZTBiNTZkZjAyYWFkNTkzZjc1ZGM4YTM0YTU1YyIsInVpZCI6IjMxYjFhMTdjLWFiMzgtNGFhNC05YmM5LWY0NjQyNzEyODExMyJ9.BQMByeL_RFdCD4HnmTsdu29IcIJcH6Vl2OynX99sfjQBkWNLSKTYeQy6jvpo5jkMMrm3pQS3QC_n4bOzU9BOT-GtATqf2bzrSeLqig3c83-SCwMjbNpi9pfrB60ZsEpXSyIp7Atvu1_aC-87bwCsa4apzT9avcWeyHvkwAiELF4" --header "Content-Type: application/json" --header "Content-length: 0" "https://api.mixin.one/network/snapshots?limit=2&offset=1000"
    title: Curl
    language: bash

right_code_blocks:
  - code_block: |-
      {  
        "data":[  
          {  
            "amount":"-2215",
              "asset":{  
                "asset_id":"965e5c6e-434c-3fa9-b780-c50f43cd955c",
                "chain_id":"43d61dcd-e413-450d-80b8-101d5e903357",
                "icon_url":"https://images.mixin.one/0sQY63dDMkWTURkJVjowWY6Le4ICjAFuu3ANVyZA4uI3UdkbuOT5fjJUT82ArNYmZvVcxDXyNjxoOv0TAYbQTNKS=s128",
                "name":"Chui Niu Bi",
                "symbol":"CNB",
                "type":"asset"
              },
              "created_at":"2018-05-28T06:48:53.420147447Z",
              "data":"",
              "snapshot_id":"d077da19-65b4-475e-a1f5-ed43035a7ccb",
              "source":"TRANSFER_INITIALIZED",
              "type":"snapshot"
          }
        ]
      }
    title: Response
    language: json
---
