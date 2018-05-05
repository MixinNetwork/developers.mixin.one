---
title: Delete Address
position: 172
type: post
description: PATH /addresses/:id/delete
parameters:
  - name: pin
    content: |
      String: Encrypted PIN
content_markdown: |-
  Delete user's address

left_code_blocks:
  - code_block: |-
      curl -i -H "Mixin-Device-Id: 00a5a4ae-dcdc-48db-ab8e-a7eef69b441d" -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzMxMTY4NTEsImlhdCI6MTUyNTM0MDg1MSwianRpIjoiMmVkYWFjNzgtMzBjOS00MmI0LWJlMGEtMTVhMTJmZDdmZmM1Iiwic2lkIjoiYTM0YzA3YTktNzU1ZC00YjU0LTk0YzUtZTQ1ZTlhMmRkNDNlIiwic2lnIjoiYWY5YzMwOGEwYmU4YzI0OTNiYmIyYWY2YzQ5YzhjODVkZjZkZTZlYjFhZTAwZjcwZjBjZmM2YTE5YmUyNTRlMyIsInVpZCI6IjA2YWVkMWUzLWJkNzctNGE1OS05OTFhLTViYjVhZTZmYmIwOSJ9.JuGSnuK-zH-F9ifKB1eDj7sE1mtA20RH7pprVJjczL-QiuKgmDF6Mdyadp0QX9Pf8sUGNY2r-bdpRxji1JtG62lXhSi_62GGGKVB8VLO-9Kf25Y7vH89qh431BKN8C0NAS9AUYbL7UyiY-d2TiRKewa2gIWVr2pt5zeIP4vIJSg" "https://api.mixin.one/addresses/ba3a2e33-efde-40b9-9cac-c293f0d1a3f2/delete" -XPOST --data '{"pin":"d2EJy5kmt56d3U5PeKm+TJLBnXBuyxBTcWxytL8pk/LXwJEak9r8iVMcASjgvoO+"}'
    title: Curl
    language: bash

right_code_blocks:
  - code_block: |-
      {}
    title: Response
    language: json
---
