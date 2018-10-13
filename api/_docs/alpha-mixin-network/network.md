---
title: Top Assets
category: Mixin Network
order: 30
---

Read top valuable assets of Mixin Network.

###### GET /network

```
// cURL Example
curl -i --header "Authorization: Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzUyNjQ4MDUsImlhdCI6MTUyNzQ4ODgwNSwianRpIjoiZjhjMGY2OGItNzIwNC00ZmJmLTkzNWMtMTE5OGI4NTlmODhhIiwic2lkIjoiYWM2ZDFmODYtYTY0Yi00NWRkLTllZmEtN2JmMGVjZjI2MDU2Iiwic2lnIjoiYmJkYmMyMDM3MGM2YTI1NTJkZjVlOGRjMThhMGUwZjAxZDI5ZTBiNTZkZjAyYWFkNTkzZjc1ZGM4YTM0YTU1YyIsInVpZCI6IjMxYjFhMTdjLWFiMzgtNGFhNC05YmM5LWY0NjQyNzEyODExMyJ9.BQMByeL_RFdCD4HnmTsdu29IcIJcH6Vl2OynX99sfjQBkWNLSKTYeQy6jvpo5jkMMrm3pQS3QC_n4bOzU9BOT-GtATqf2bzrSeLqig3c83-SCwMjbNpi9pfrB60ZsEpXSyIp7Atvu1_aC-87bwCsa4apzT9avcWeyHvkwAiELF4" --header "Content-Type: application/json" --header "Content-length: 0" "https://api.mixin.one/network"
```

```
// Sample Response
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
```
