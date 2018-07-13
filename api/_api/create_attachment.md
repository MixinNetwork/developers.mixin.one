---
title: Create Attachment
position: 200
type: post
description: PATH /attachments
content_markdown: |-
  Create an attachment upload address. We use s3 as our storage, you can following s3 Browser-Based Upload using HTTP POST. [https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-post-example.html](https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-post-example.html)

  1. `upload_url` is used to upload an attachment to S3.
  2. `view_url` is used to read your uploaded attachment.

left_code_blocks:
  - code_block: |-
      curl -i -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzMxMTYzNjEsImlhdCI6MTUyNTM0MDM2MSwianRpIjoiNDRhOGRiZDAtODU3NC00Y2VhLTk3NWEtYzI5OWIwZWQyMTk4Iiwic2lkIjoiYTM0YzA3YTktNzU1ZC00YjU0LTk0YzUtZTQ1ZTlhMmRkNDNlIiwic2lnIjoiN2IzMzEwYTQ2NjY5YzNkNWJkMjFkNjRlNWRhNTJjMmQ4M2MzYWFjNTUzMmU3OTdkMjAzMzY0NzE3MDhiMDJjOCIsInVpZCI6IjA2YWVkMWUzLWJkNzctNGE1OS05OTFhLTViYjVhZTZmYmIwOSJ9.LSoJ0iWCo1g71SC_SYDsY6ZobUxh2Ue0e0D7VC1-cRfudJHCjR00OM2LhrTTub6BB--BnplPWNYOuz8zdxdZwNhY0OpwEpeVg2zxW202MDlp_PW3nQP1U_wv6SvdtqzdM6JswL-GGhl2CEDEGN8iivUGwv54ouOv4U2pqR5IrBc" "https://api.mixin.one/attachments" -XPOST
    title: Curl
    language: bash

right_code_blocks:
  - code_block: |-
      {  
        "data":{  
          "type":"attachment",
          "attachment_id":"7a54e394-1626-4cd4-b967-543932c2a032",
          "upload_url":"https://moments-shou-tv.s3.amazonaws.com/mixin/attachments/1526305123-de9892550143c713c45f6265c9e61959ebfac6cc8de4badf5c0489636796ad8a?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAJW6D5Q3Z5WYA2KRQ%2F20180514%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20180514T133843Z&X-Amz-Expires=21600&X-Amz-SignedHeaders=content-type%3Bhost%3Bx-amz-acl&X-Amz-Signature=591fb0a1057109d45e26a8e4e9e61599e302818ab2e7aa706826a2b838a089e3",
          "view_url":"https://moments.shou.tv/mixin/attachments/1526305123-de9892550143c713c45f6265c9e61959ebfac6cc8de4badf5c0489636796ad8a"
        }
      }
    title: Response
    language: json
---
