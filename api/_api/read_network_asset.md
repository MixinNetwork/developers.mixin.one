---
title: Read Network Asset
position: 221
type: get
description: PATH /network/assets/:id
content_markdown: |-
  Read mixin network asset info

left_code_blocks:
  - code_block: |-
      curl -i --header "Authorization: Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1Mjc0OTA0NzEsImlhdCI6MTUyNzQ5MDQxMSwianRpIjoiOWQzN2FhZGUtOGZlYy00NzkzLTk3MzctMmE4YjcwMTY2NGVkIiwic2lkIjoiYWM2ZDFmODYtYTY0Yi00NWRkLTllZmEtN2JmMGVjZjI2MDU2Iiwic2lnIjoiMzQzMGIxMTFjMGFmMzY0YzJjOWIwYmIzODZiNWZkZTk0MGM5MmE4NzA5YTVhMzZiNzk2ZWM4ZjU5OGJmMTQ0YyIsInVpZCI6IjMxYjFhMTdjLWFiMzgtNGFhNC05YmM5LWY0NjQyNzEyODExMyJ9.vy3AOZfyOZrXLCgOvbs1rJbfRltT52WI15LlRvjKVMri7Ru8M2DhPbiks_O9ded48choyQ-E-jTwbEuzmw5G05HG4Dg0jOfSfSE3-Iiqn3N_nwPWhPC4dN81ViCtmwUKjgRdOOFYXHdqcXrGeUGCJmOB-Qmqzfi5Fqx3LCikKVE" --header "Content-Type: application/json" --header "Content-length: 0" "https://api.mixin.one/network/assets/965e5c6e-434c-3fa9-b780-c50f43cd955c"
    title: Curl
    language: bash

right_code_blocks:
  - code_block: |-
      {  
         "data":{  
            "amount":"100000000000000",
            "asset_id":"965e5c6e-434c-3fa9-b780-c50f43cd955c",
            "chain_id":"43d61dcd-e413-450d-80b8-101d5e903357",
            "icon_url":"https://images.mixin.one/0sQY63dDMkWTURkJVjowWY6Le4ICjAFuu3ANVyZA4uI3UdkbuOT5fjJUT82ArNYmZvVcxDXyNjxoOv0TAYbQTNKS=s128",
            "name":"Chui Niu Bi",
            "snapshots_count":338821,
            "symbol":"CNB",
            "type":"asset"
         }
      }
    title: Response
    language: json
---
